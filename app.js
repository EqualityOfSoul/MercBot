const Discord = require('discord.js');
const dbConfig = require('./config/dbConfig');
const botConfig = require('./config/botConfig.json');

const client = new Discord.Client();

//TODO:  Initiate client with Mongoose DB info