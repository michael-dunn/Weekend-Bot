const getDateString = require("../utilities/date");
const util = require('util');
const dataUtility = require('../utilities/data');

module.exports.run = async (bot, message, args, logger) => {
	var drinksToAdd = 1;
	if (args && args.length > 0) {
		if (!isNaN(parseInt(args[0]))) {
			drinksToAdd = parseFloat(args.shift());
		} else {
			dataUtility.setPlayerDrink(message.guildId, getDateString(), { playerId: message.author.id, playerName: message.author.username }, args.join(' '));
		}
	}

	for (var i = 0; i < drinksToAdd; i++) {
		dataUtility.addDrinkToPlayer(message.guildId, getDateString(), { playerId: message.author.id, playerName: message.author.username });
	}

	var playerDrinkCount = dataUtility.getPlayerDrinkCount(message.guildId, getDateString(), { playerId: message.author.id, playerName: message.author.username }).reduce((a, b) => a + b.count, 0);
	if (playerDrinkCount == drinksToAdd)
		message.reply(`${message.author.username} is joining the party!`);
	else
		message.reply(`${message.author.username} has had ${playerDrinkCount} drinks`);
};

module.exports.help = {
	name: 'cheers',
	aliases: ["c", "drink"],
	helpText: `-cheers [num] [drinkName]
		aliases: -c -drink
		increase your drink count by [num] (default 1)
		and set your [drinkName]`
}