const config = require('../config/botConfig.json');
const mongoose = require('mongoose');
const Role = require('../models/role');

const { info } = require('./info');

module.exports.execute = (client, message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.commandPrefix)) return;

    let command = message.content.split(" ")[0];
    command = command.slice(config.commandPrefix.length);

    let args = message.content.split(" ").slice(1);

    // This prevents a crash with the bot. In case the message was sent in a private message.
    if (!message.role) {
        switch(command) {
            case 'info':
                return info(client, message, args);
        }
        return message.reply("This command requires a differenet role");
    }

    Role.findOne({id: message.role.id})
        .then((role) => {
            let index = role.commands.map(x => x.name).indexOf(command);

            // Check if the command is active and execute it.
            if (index != -1 && role.commands[index].active) {
                switch(command) {
                    // General Commands
                    case 'info':
                        info(client, message, args);
                        break;

                }
            }
        });
};