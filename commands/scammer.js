const SteamRepAPI = require('steamrep');
const config = require('../settings.json');
const steamapi = require('steamapi');

exports.run = (client, message, args) => {
    const steam = new steamapi(config.STEAMAPIKEY);
    const steamIDString = args.splice(0, args.length).join(' ');
    if(steamIDString === ''){
        return message.channel.send("You need a Steam ID or URL.");
    }
    steam.resolve(steamIDString)
        .then(function(steamID64){
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
        })
        .catch(()=>{
            message.channel.send("Something went wrong.");
        });

};



exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'scammer',
    description: 'Check SteamRep.com by steamid',
    usage: 'scammer <steamid>'
};

