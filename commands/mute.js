const Discord = require('discord.js');
exports.run = (client, message, args) => {
  const reason = args.slice(1).join(' ');
  const user = message.mentions.users.first();
  const modlog = client.channels.find('name', 'mod-log');
  if (!modlog) return message.reply('I cannot find a mod-log channel').catch(console.error);
  if (reason.length < 1) return message.reply('You must supply a reason for the mute.').catch(console.error);
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to mute them.').catch(console.error);
  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setDescription(`**Action:** Un/mute\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`);

  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('I do not have the correct permissions.').catch(console.error);

  if (message.guild.member(user).muted) {
    message.guild.member(user).setMute(false, reason).then(() => {
      client.channels.get(modlog.id).send({embed}).catch(console.error);
    });
  } else {
    message.guild.member(user).setMute(true, reason).then(() => {
      client.channels.get(modlog.id).send({embed}).catch(console.error);
    });
  }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['unmute'],
  permLevel: 2
};

exports.help = {
  name: 'mute',
  description: 'mutes or unmutes a mentioned user',
  usage: 'un/mute [mention] [reason]'
};
