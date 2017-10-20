const axios = require('axios');
const config = require('../settings.json');
const steamapi = require('steamapi');

exports.run = (client, message, args) => {
    const steam = new steamapi(config.STEAMAPIKEY);
    const steamid = args.splice(0, args.length).join(' ');
    if (steamid === null) {
        return message.channel.send("You need a Steam ID or URL.");
    }
    steam.resolve(steamid)
        .then(id => {
            message.channel.send(`Searching...`)
                .then(message =>{
                    axios({
                        method: "get",
                        url: "https://api.rocketleaguestats.com/v1/player?unique_id=" + id + "&platform_id=1",
                        headers: {Authorization: config.ROCKETAPIKEY}
                    })
                        .then(response => {
                            const bannerUrl = response.data.signatureUrl;
                            return message.edit({file: bannerUrl});
                        })
                        .catch(() => {
                            return message.edit("Failed to find Rocket League Banner");
                        });
                })
                .catch(()=>{
                    return message.edit("Something went wrong");
                });
        })
        .catch(() => {
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
    name: 'rocketbanner',
    description: 'Get rocket banner by steamid',
    usage: 'rocketbanner <steamid>'
};
