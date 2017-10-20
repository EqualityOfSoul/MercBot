const steamapi = require('steamapi');
const config = require('../settings.json');

exports.run = (client, message, args) => {
    const steam = new steamapi(config.STEAMAPIKEY);
    const steamid = args.splice(0, args.length).join(' ');
    if (steamid === null) {
        return message.channel.send("You need a Steam ID or URL.");
    }
    steam.resolve(steamid)
        .then(id =>{
            message.channel.send("Their ID is: " + id);
        })
        .catch(()=>{
            message.channel.send("Couldnt find that profile.");
        });
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
