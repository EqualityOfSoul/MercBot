const {RichEmbed} = require('discord.js');


exports.run = async (client, message, args) => {
    const announcementChannel = client.channels.find('name', 'announcements');
    if (!announcementChannel) return message.reply('I cannot find an announcements channel');
    const announcement = args.splice(0, args.length).join(' ');
    const embed = new RichEmbed()
        .setColor(0x00FF00)
        .setTimestamp()
        .setDescription(`${announcement}`)
        .setFooter(`Announced by ${message.author.tag}`);
    return client.channels.get(announcementChannel.id).send({embed});
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 3
};

exports.help = {
    name: 'announce',
    category: "admins",
    description: 'Adds an announcement to the Announcements log.',
    usage: 'announce [announcement]'
};
