const axios = require('axios');
const Discord = require('discord.js');
const config = require('../settings.json');

exports.run = (client, message, args) => {
    const steamid = args.splice(0, args.length).join(' ');
    if(steamid === null){
        return message.channel.send("You need a Steam ID.")
    }
    console.log(steamid);
    axios({
        method: "get",
        url: "https://api.rocketleaguestats.com/v1/player?unique_id="+steamid+"&platform_id=1",
        headers: {Authorization: config.ROCKETAPIKEY}
    })
        .then(function(response) {
            let bannerUrl = response.data.signatureUrl;

            return message.channel.send({file: bannerUrl});
        })
        .catch(function(error){
            return message.channel.send(error);
        })

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'rocketbanner',
    description: 'Get rocket banner by steamid',
    usage: 'rocketbanner <steamid>'
};
