exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
    message.channel.send(`= STATISTICS =
• Commander :: Scott
• Commander :: Akilestar
• Div Commander :: UNWeaponsInspector
• Div Commander :: Jimbo
• Lieutenant   :: SeppukuNinja`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: "staff",
    description: "Gives a list of staff members",
    usage: "staff"
};