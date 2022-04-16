const db = require("quick.db");
const getDateString = require("../utilities/date");
const util = require('util');

module.exports.run = async (bot, message, args, logger) => {
  var dataId = `${getDateString()}-${message.guild.toString()}`;
  logger.log(util.format("Getting data for [%s]", dataId));
  const day = db.fetch(`${dataId}`);
  logger.log(util.format('data found: %j',day));
  if (day != null) {
    const player = day.players.findIndex(p => p.name == message.author.username);
    if (player != -1) {
      day.players[player].drinks += 1;
      db.set(`${dataId}`, day);
      message.reply(`${message.author.username} has had ${day.players[player].drinks} drinks`);
    }
    else {
      db.push(`${dataId}.players`, { name: message.author.username, drinks: 1 });
      message.reply(`${message.author.username} had their first drink of the day!`);
    }
  }
  else {
    logger.log(`Nothing found for [${dataId}]`);
    db.set(dataId, { players: [{ name: message.author.username, drinks: 1 }] });
    message.reply(`${message.author.username} getting the party started!`);
  }
};

module.exports.help = {
  name: "cheers",
  aliases: ["c", "drink"]
}