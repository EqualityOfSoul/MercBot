const Discord = require('discord.js');

module.exports.info = (client, message, args) => {
    message.author.sendEmbed(new Discord.RichEmbed()
        .setTitle(`I am MercBot`)
        .setColor(0x44B6EC)
        .setThumbnail(`https://pbs.twimg.com/profile_images/576946466456928256/C1J_Ki_E_400x400.png`)
        .setTimestamp()
        .addField(`Information`, `Ryan is worthless.\n`)
    ).catch((err) => {
        message.reply(`Failed to send Info');
});
};