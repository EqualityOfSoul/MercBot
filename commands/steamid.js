const axios = require('axios');
const Discord = require('discord.js');
const steamID = require('steamid');
const moment = require('moment');
const config = require('../settings.json');

exports.run = (client, message, args) => {

    function sendResponse(steamData){
        const embed = new Discord.RichEmbed()
            .setThumbnail(steamData.avatar)
            .addField("Username", "**" + steamData.username + "**", true );
        switch (steamData.status) {

            case 0: //offline
                embed.addField("Status", "Offline", true );
                embed.setColor(0x747F8D);
                break;

            case 1: //online
                embed.addField("Status", "Online", true );
                embed.setColor(0x2C82EC);
                break;

            case 2: //busy
                embed.addField("Status", "Busy", true );
                embed.setColor(0xF04747);
                break;

            case 3: //away
                embed.addField("Status", "Away", true );
                embed.setColor(0xFAA61A);
                break;

            case 4: //Snooze
                embed.addField("Status", "Snooze", true );
                embed.setColor(0xFAA61A);
                break;

            case 5: //looking to Trade
                embed.addField("Status", "Looking to Trade", true );
                embed.setColor(0x2C82EC);
                break;

            case 6: //looking to Play
                embed.addField("Status", "Looking to Play", true );
                embed.setColor(0x2C82EC);
                break;
        }
        if(steamData.gameinfo !== undefined){
            embed.addField("In-Game", "*" + steamData.gameinfo + "*");
            embed.setColor(0x43B581);
        }
        embed.setFooter("Last Logoff: " + moment(new Date(steamData.lastlogoff*1000)).format('MMMM Do YYYY, h:mm a'));
        return message.channel.send({embed: embed})

    }

    let steamIDString = args.splice(0, args.length).join(' ');
    if(steamIDString === ''){
        return message.channel.send("You need a Steam ID or URL.")
    }

    if(/(?:https?:\/\/)?steamcommunity\.com\/(?:profiles|id)\/[a-zA-Z0-9]+/.test(steamIDString) === true) {
        let regexp = /(?:https?:\/\/)?(?:steamcommunity\.com\/)(?:profiles|id)\/([a-zA-Z0-9]+)/g;
        let match = regexp.exec(steamIDString);
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
            else if((matches = steamIDString.match(/^STEAM_([0-5]):([0-1]):([0-9]+)$/)) || (matches = steamIDString.match(/^\[([a-zA-Z]):([0-5]):([0-9]+)(:[0-9]+)?\]$/))){
                let SteamID3 = new SteamID(steamIDString);
                steamID64 = SteamID3.getSteamID64();
                console.log("SUCCESS: Got SteamID " + steamID64);
            }
            else {
                message.channel.send("Couldn't find a account with the SteamID **" + steamIDString + "**. \nDid you check if the SteamID is correct?");
                console.error("ERROR: Could not get SteamID from string:");
                console.error(steamIDString);
                steamID64 = null;
            }
            return steamID64;
        })
        .then(function(steamID64){

            if(steamID64 !== null){

                        message.channel.send(steamID64);

            }
        })

};


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'steamid',
    description: 'get steam id',
    usage: 'steamid <steamid>'
};
