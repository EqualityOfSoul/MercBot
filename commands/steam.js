const Discord = require('discord.js');
const steamapi = require('steamapi');
const moment = require('moment');
const config = require('../settings.json');

exports.run = (client, message, args) => {
    const steam = new steamapi(config.STEAMAPIKEY);
    const steamIDString = args.splice(0, args.length).join(' ');
    if(steamIDString === ''){
        return message.channel.send("You need a Steam ID or URL.");
    }
    steam.resolve(steamIDString)
        .then(id => {
            steam.getUserSummary(id)
                .then(info =>{
                    const steamData = {
                        status: info.personaState,
                        steamID: info.steamID,
                        url: info.profileURL,
                        avatar: info.avatar.medium,
                        name: info.nickname,
                        lastlogoff: info.lastLogOff
                    };
                    sendResponse(steamData, message);
                })
                .catch(()=>{
                    return message.channel.send("Something went wrong retrieving your profile.");
                });
        })
        .catch(()=>{
            return message.channel.send("Could not find that user.");
        });

};

function sendResponse(steamData, message){
    const embed = new Discord.RichEmbed()
        .setThumbnail(steamData.avatar)
        .addField("Username", "**" + steamData.name + "**", true )
        .addField("Steam ID", "**" + steamData.steamID + "**", true )
        .addField("Profile", "**" + steamData.url + "**", false );
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
    embed.setFooter("Last Logoff: " + moment(new Date(steamData.lastlogoff*1000)).format('MMMM Do YYYY, h:mm a'));
    return message.channel.send({embed: embed});

}


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'steam',
    description: 'get steam info',
    usage: 'steam <steamid>'
};
