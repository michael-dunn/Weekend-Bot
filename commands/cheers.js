const db = require("quick.db");
const getDateString = require("../utilities/date");
const util = require('util');

module.exports.run = async (bot, message, args, logger) => {
  var dataId = `${getDateString()}-${message.guild.toString()}`;
  logger.log(util.format("getting data for [%s]", dataId));
  const data = db.fetch(`${dataId}`);
  logger.log(util.format('data found: %j', data));
  if (data != null) {
    const player = data.players.findIndex(p => p.name == message.author.username);
    if (player != -1) {
      var drinksToAdd = 1;
      if (args && args.length > 0) {
        if (isNaN(parseInt(args[0])))
          logger.log(util.format('\'%s\' is not a number', args[0]));
        else
          drinksToAdd = parseInt(args[0]);
      }
      logger.log(util.format('%s\'s current drink is %s', data.players[player].name, data.players[player].currentDrink));
      logger.log(util.format('adding %d %s to %s', drinksToAdd, data.players[player].currentDrink+'s', data.players[player].name));
      if (data.players[player].drinks && data.players[player].drinks.findIndex(d => d.drinkName == data.players[player].currentDrink) != -1)
        data.players[player].drinks.find(d => d.drinkName == data.players[player].currentDrink).count += drinksToAdd;
      else
        data.players[player].drinks.push({drinkName: data.players[player].currentDrink, count: drinksToAdd});
      db.set(`${dataId}`, data);
      message.reply(`${message.author.username} has had ${data.players[player].drinks.reduce((a,b)=>a+b.count,0)} drinks`);
    }
    else {
      db.push(`${dataId}.players`, { name: message.author.username, drinks: [{ drinkName: 'alcohol', count: 1 }], currentDrink: 'alcohol' });
      message.reply(`${message.author.username} had their first drink of the day!`);
    }
  }
  else {
    logger.log(`Nothing found for [${dataId}]`);
    db.set(dataId, { players: [{ name: message.author.username, drinks: [{ drinkName: 'alcohol', count: 1 }], currentDrink: 'alcohol' }] });
    message.reply(`${message.author.username} getting the party started!`);
  }
};

module.exports.help = {
  name: "cheers",
  aliases: ["c", "drink"]
}