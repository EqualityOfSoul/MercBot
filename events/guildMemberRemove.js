module.exports = member => {
  const guild = member.guild;
  guild.defaultChannel.send(`Please say goodbye to ${member.user.username}. Adam scared them away.`);
};
