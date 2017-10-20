const axios = require('axios');
const steamapi = require('steamapi');
const Discord = require('discord.js');
const config = require("../settings.json");

exports.run = (client, message, args) => {
    const steam = new steamapi(config.STEAMAPIKEY);
    const steamid = args.splice(0, args.length).join(' ');
    if(steamid === null){
        return message.channel.send("You need a Steam ID or URL.");
    }
    steam.resolve(steamid)
        .then(id=>{
            message.channel.send("Searching...")
                .then(message=>{
                    axios({
                        method: "get",
                        url: "https://api.rocketleaguestats.com/v1/player?unique_id="+id+"&platform_id=1",
                        headers: {Authorization: config.ROCKETAPIKEY}
                    })
                        .then(response => {
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
                        .catch(()=>{
                            return message.edit("Something went wrong.");
                        });
                })
                .catch( () =>{
                    message.edit("Could not find Rocket League Stats.");
                });
        })
        .catch(()=>{
            return message.channel.send("Could not find that profile.");
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
