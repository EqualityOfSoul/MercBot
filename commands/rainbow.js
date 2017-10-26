const axios = require('axios');
const Discord = require('discord.js');
const rainbow = require('rainbowsix-api-node');
const config = require("../settings.json");

exports.run = (client, message, args) => {
    const r6api = new rainbow();
    const platform = "uplay";
    const uplayid = args.splice(0, args.length).join(' ');
    const suicideEmoji = client.emojis.find("name", "troll");
    if(uplayid === null){
        return message.channel.send("You need a uPlay name.");
    }
    message.channel.send("Searching...")
        .then(message=>{
            r6api.stats(uplayid, platform)
                .then(stats => {
                    const totalKills = (parseInt(stats.player.stats.ranked.kills) + parseInt(stats.player.stats.casual.kills)).toString();
                    const embed = new Discord.RichEmbed()
                        .setColor(0x6cdb3e)
                        .setTitle("Rainbow Six Stats For: " + stats.player.username)
                        .addField("Ranked W/L:", stats.player.stats.ranked.wlr, true)
                        .addField("Ranked K/D:", stats.player.stats.ranked.kd, true)
                        .addField("Casual W/L:", stats.player.stats.casual.wlr, true)
                        .addField("Casual K/D:", stats.player.stats.casual.kd, true)
                        .addField("Total Kills:", totalKills, true)
                        .addField("Suicides: " + suicideEmoji , stats.player.stats.overall.suicides, true)
                        .setFooter("Level: " + stats.player.stats.progression.level);
                    return message.edit({embed});
                })
                .catch(()=>{
                    return message.edit("Something went wrong.");
                })
        })
        .catch(()=>{
            return message.edit("Something went wrong.");
        })

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'rainbow',
    description: 'Get rainbow six stats',
    usage: 'rainbow <uplayid>'
};
