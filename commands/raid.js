const {RichEmbed} = require('discord.js');
const {raidNum} = require('../util/raidNum');
const {DateTime} = require('luxon');
const Pacific = "America/Los_Angeles";
const Central = "America/Chicago";
const Eastern = "America/New_York";


exports.run = async (client, message, args) => {
    const raidLog = client.channels.find('name', 'mod-log');

    if (!raidLog) return message.reply('I cannot find raid-log channel');
    const raidNumber = await raidNum(client, raidLog);

    const timeZone = args[4].toUpperCase();
    let filteredZone;
    if(timeZone === "PST"){
        filteredZone = Pacific;
    }
    else if(timeZone === "CST"){
        filteredZone = Central;
    }
    else{
        filteredZone = Eastern;
    }

    const dateObject = {
        year: 2017,
        month: parseInt(args[0]),
        day: parseInt(args[1]),
        hour: parseInt(args[2]),
        minute: parseInt(args[3]),
        zone: filteredZone
    };

    const time = DateTime.fromObject(dateObject);


    sendResponse(time, client, raidLog, raidNumber);
};


function sendResponse(time, client, raidLog, raidNumber) {
    const embed = new RichEmbed()
        .setTitle("Destiny Raids")
        .setDescription("New Destiny Raid Added!  Time is as follows:")
        .setThumbnail("http://bountyboosting.com/wp-content/uploads/2017/09/logo-1.png")
        .addField("Pacific Time", "**" + time.setZone("America/Los_Angeles").toLocaleString(DateTime.DATE_SHORT) + " - " +  time.setZone("America/Los_Angeles").toLocaleString(DateTime.TIME_SIMPLE) + "**", true)
        .addField("Central Time", "**" + time.setZone("America/Chicago").toLocaleString(DateTime.DATE_SHORT) + " - " +  time.setZone("America/Chicago").toLocaleString(DateTime.TIME_SIMPLE) + "**", true)
        .addField("Eastern Time", "**" + time.setZone("America/New_York").toLocaleString(DateTime.DATE_SHORT) + " - " +  time.setZone("America/New_York").toLocaleString(DateTime.TIME_SIMPLE) + "**", true)
        .addField("U.K. Time", "**" + time.setZone("Europe/London").toLocaleString(DateTime.DATE_SHORT) + " - " +  time.setZone("Europe/London").toLocaleString(DateTime.TIME_SIMPLE) + "**", true)
        .setColor("0x00ff00")
        .setFooter("RaidID " + raidNumber);
    return client.channels.get(raidLog.id).send({embed: embed});
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 2
};

exports.help = {
    name: 'raid',
    description: 'Raids',
    usage: 'raid [month] [day] [hour (24 hour time)] [minute] [timezone (PST, CST, EST)]'
};
