exports.run = (client, message) => {
    message.channel.send('░░░░░░░░░░ ░▄▀▀▌░░░░ \n' +
        '░░░░░░░▄▀█░░█▄▀░░░░░ \n' +
        '░░░▄▄▀▐▌░▐▌░█░░░▄▄▀▀▌ \n' +
        '░▀▀█░░█▄▄▀░░▄▄▀▀▌▄█▌▌ \n' +
        '░░░█░░░░░▄▀▀▄▄▐▒▌███▐ \n' +
        '░░░▀░░░▐▀▄█▀▀▒▒▒▌███▐ \n' +
        '░░▄▀▀▌░▐▐██▌▒▄▐▒▌███▐▀▐ \n' +
        '▐▀▄█▌▌░▐▐█████▐▒▌███▄█▐ \n' +
        '▐▐██▌▌░▐▐███▀▒▒▒▌████▀▐ \n' +
        '▐▐██▌▌░▐▐███▒▄▐▒▌█▀▄▄▀▀ \n' +
        '▐▐██▌▌▀▐▐█████▐▒▄▄▀░ \n' +
        '▐▐██▌▄█▐▐█▀▀▄▄▀▀░░░░ \n' +
        '▐▐████▀▐▄▄▀▀░░░░░░░░ \n' +
        '▐▐█▀▀▄▀▀░░░░░░░░░░░░ \n' +
        '▐▄▄▀░░░░░░░░░░░░░░░░',{
        file: ""
    });

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'lol',
    description: 'Ping/Pong command. I wonder what this does? /sarcasm',
    usage: 'lol'
};
