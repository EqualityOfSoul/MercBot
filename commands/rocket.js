const axios = require('axios');
const Discord = require('discord.js');
const config = require("../settings.json");

exports.run = (client, message, args) => {
    const steamid = args.splice(0, args.length).join(' ');
    if(steamid === ''){
        return message.channel.send("You need a Steam ID.");
    }
    message.channel.send("Searching...")
        .then(message=>{
            axios({
                method: "get",
                url: "https://api.rocketleaguestats.com/v1/player?unique_id="+steamid+"&platform_id=1",
                headers: {Authorization: config.ROCKETAPIKEY}
            })
                .then(function(response) {
                    const embed = new Discord.RichEmbed()
                        .setColor(0x00A2FF)
                        .setTitle("Rocket League Stats For: " + response.data.displayName)
                        .addField("Wins:", response.data.stats.wins, true)
                        .addField("Goals:", response.data.stats.goals, true)
                        .addField("MVPS:", response.data.stats.mvps, true)
                        .addField("Saves:", response.data.stats.saves, true)
                        .addField("Shots:", response.data.stats.shots, true)
                        .addField("Assists:", response.data.stats.assists, true)
                        .setThumbnail(response.data.avatar);

                    return message.edit({embed});
                })
                .catch(function(error){
                    return message.edit(error);
                });
        })
        .catch( () =>{
            message.edit("Could not find Rocket League Stats.");
        });


};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'rocket',
    description: 'Get rocket stats by steamid',
    usage: 'rocket <steamid>'
};
