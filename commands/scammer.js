const SteamRepAPI = require('steamrep');
const axios = require('axios');
const config = require('../settings.json');
const SteamID = require('steamid');

exports.run = (client, message, args) => {
    let steamID64;

    let steamIDString = args.splice(0, args.length).join(' ');
    if(steamIDString === ''){
        return message.channel.send("You need a Steam ID or URL.");
    }

    if(/(?:https?:\/\/)?steamcommunity\.com\/(?:profiles|id)\/[a-zA-Z0-9]+/.test(steamIDString) === true) {
        const regexp = /(?:https?:\/\/)?(?:steamcommunity\.com\/)(?:profiles|id)\/([a-zA-Z0-9]+)/g;
        const match = regexp.exec(steamIDString);
        steamIDString = match[1];
    }
    const STEAMAPIKEY = config.STEAMAPIKEY;

    axios({
        method: "get",
        url: "http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=" + STEAMAPIKEY + "&vanityurl=" + steamIDString
    })
        .then(function(response) {
            console.log(response.data);
            if (response.statusCode === 403) {
                console.error("ERROR: SteamAPI key might be missing, wrong or forbidden.");
                console.error("Please check your config.json if the steamAPIKey parameter is correct.");
                message.channel.send("Couldn't process your request.");
                return;
            }

            // throw error when discord mention is used
            if (steamIDString.startsWith('<@') === true){
                console.error("ERROR: Tried getting SteamID from Discord user name. This is not possible without an userbot.");
                message.channel.send("Can't fetch steamID from discord profile.");
                return;
            }

            // check if steamID is only digits and exactly 17 chars long
            if(/^\d+$/.test(steamIDString) && steamIDString.length === 17){
                steamID64 = steamIDString;
                console.log("SUCCESS: Got SteamID " + steamID64);
            }
            // else check if ResolveVanityURL worked
            else if(response.data.response.success === 1){
                steamID64 = response.data.response.steamid;
                console.log("SUCCESS: Got SteamID " + steamID64);
            }
            // else check if ID is SteamID2 or SteamID3, convert it to SteamID64
            else if((matches = steamIDString.match(/^STEAM_([0-5]):([0-1]):([0-9]+)$/)) || (matches = steamIDString.match(/^\[([a-zA-Z]):([0-5]):([0-9]+)(:[0-9]+)?\]$/))){ // eslint-disable-line no-undef
                const SteamID3 = new SteamID(steamIDString);
                steamID64 = SteamID3.getSteamID64();
                console.log("SUCCESS: Got SteamID " + steamID64);
            }
            else {
                message.channel.send("Couldn't find a account with the SteamID **" + steamIDString + "**. \nDid you check if the SteamID is correct?");
                console.error("ERROR: Could not get SteamID from string:");
                console.error(steamIDString);
            }
            return steamID64;
        })
        .then(function(steamID64){

            if(steamID64 !== null){
                SteamRepAPI.timeout = 5000;
                SteamRepAPI.isScammer(steamID64, function(error, result){
                    if(error){
                        console.log(error);
                    }
                    if(result){
                        message.channel.send("This user is a SCAMMER!");
                    }
                    else{
                        message.channel.send("This user is not a scammer.");
                    }
                });


            }
        });

};