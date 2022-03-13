const Discord = require("discord.js");
const db = require("quick.db");

function getDate() {
  var date = new Date();
  date.setHours(date.getHours() - (date.getTimezoneOffset() / 60));
  return `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`;
}

function getDate(year,month,day) {
  var date = new Date(year,month,day);
  date.setHours(date.getHours() - (date.getTimezoneOffset() / 60));
  return `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`;
}

module.exports.run = async (bot, message, args, utils) => {
  db.delete(`${getDate()}`);
  message.channel.send("removed drinking history for today");
};

module.exports.help = {
  name: "clear",
  aliases: []
}