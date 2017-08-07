const Discord = require('discord.js');
const mongoose = require('mongoose');
const Role = require('../models/role');


module.exports.addRole = (client, role) => {
    Role.create({
        id: role.id,
        name: role.name,
        commands: [
            {name: 'info', active: true}
        ],
        commandingOfficer: role.commandingOfficer,
        handlers: []
    }).then((createdRole) => {
        console.log(`Role: #${role.id} was created.`);
    }).catch((err) => {
        throw new Error(err);
    })
};

module.exports.removeRole = (client, role) => {
    Role.findOneAndRemove({id: role.id})
        .then((removedRole) => {
            console.log(`Role: #${role.id} was removed.`);
        })
        .catch((err) => {
            console.log(err);
        })
};
