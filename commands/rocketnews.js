const Discord = require('discord.js');
const steamapi = require('steamapi');
const config = require('../settings.json');

exports.run = (client, message, args) => { // eslint-disable-line no-unused-vars
    const steam = new steamapi(config.STEAMAPIKEY);
    steam.getGameNews('252950')
        .then(games => {
            const embed = new Discord.RichEmbed();
            embed.setTitle(games[0].title);
            embed.setURL(games[0].url);
            message.channel.send({embed});
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
    name: 'rocketnews',
    description: 'get rocket league news',
    usage: 'rocketnews'
};
