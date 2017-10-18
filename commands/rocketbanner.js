const axios = require('axios');
const config = require('../settings.json');

exports.run = (client, message, args) => {
    const steamid = args.splice(0, args.length).join(' ');
    if(steamid === null){
        return message.channel.send("You need a Steam ID.");
    }
    console.log(steamid);
    message.channel.send(`Searching...`)
        .then(message => {
            axios({
                method: "get",
                url: "https://api.rocketleaguestats.com/v1/player?unique_id="+steamid+"&platform_id=1",
                headers: {Authorization: config.ROCKETAPIKEY}
            })
                .then(function(response) {
                    const bannerUrl = response.data.signatureUrl;

                    return message.edit({file: bannerUrl});
                })
                .catch(() =>{
                    return message.edit("Failed to find Rocket League Banner");
                });})
                .catch(() => {
                    message.edit(`Failed to find Rocket League Banner`);
                });

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
