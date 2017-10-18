exports.run = (client, message) => {
    message.channel.send('https://mercsclan.com');

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'web',
    description: 'Creates a link to the Mercs website',
    usage: 'web'
};
