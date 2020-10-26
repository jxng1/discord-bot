'use strict'

const Discord = require('discord.js'); // makes sure that it requires discord.js
const client = new Discord.Client(); // creating the Discord bot as a client
require('dotenv-flow').config();

const config = {
  token: process.env.TOKEN,
  owner: process.env.OWNER,
  prefix: process.env.PREFIX
};

const fs = require('fs');

client.commands = new Discord.Collection(); // collection of Discord commands

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // go into commands folder
for (const file of commandFiles) {
  const command = require(`./commands/${file}`); // template literal for each command file

  client.commands.set(command.name, command);
}

client.once('ready', () => {
  console.log("discord-bot is online!");
});

client.on('message', message => {
// if the message doesn't start with a prefix or isn't the bot itself, just break off
  if (!message.content.startsWith(config.prefix) || message.author.bot) { return; }

// splicing commands e.g. -play xyz will mean that it gets split into ''-play', 'xyz'
  const args = message.content.slice(config.prefix.length).split(/ +/);
  const command = args.shift().toLowerCase(); // ensures commands are in lowercase

// COMMANDS block: better implementation
  if (command === 'ping') {
    client.commands.get('ping').execute(message, args);
  } else if (command === 'github') {
    client.commands.get('github').execute(message, args);
  }

});

client.login(config.token);
