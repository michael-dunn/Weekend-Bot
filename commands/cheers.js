const getDateString = require('../utilities/date');
const util = require('util');
const dataUtility = require('../utilities/data');
const data = require('../utilities/data');

module.exports.run = async (bot, message, args, logger) => {
	var drinksToAdd = 1;
	if (args && args.length > 0) {
		if (!isNaN(parseFloat(args[0]))) {
			drinksToAdd = parseFloat(args.shift());
		}
		if (args.length > 0) {
			dataUtility.setPlayerDrink(message.guildId, getDateString(), { playerId: message.author.id, playerName: message.author.username }, args.join(' '));
		}
	}

	for (var i = 0; i < drinksToAdd; i++) {
		dataUtility.addDrinkToPlayer(message.guildId, getDateString(), { playerId: message.author.id, playerName: message.author.username });
	}

	var playerDrinkCount = dataUtility.getPlayerDrinkCount(message.guildId, getDateString(), { playerId: message.author.id, playerName: message.author.username }).reduce((a, b) => a + b.count, 0);
	
	if (data.getPlayerDrinkCountSince(new Date(new Date().getTime() - 60*60000),message.guildId, getDateString(), { playerId: message.author.id, playerName: message.author.username }) > 3){
		message.reply(`${message.author.username} has had ${playerDrinkCount} drinks. Maybe it's time for a water?`);
	}
	else if (playerDrinkCount == drinksToAdd){
		message.reply(`${message.author.username} is starting the party!`);
	}
	else{
		message.reply(`${message.author.username} has had ${playerDrinkCount} drinks`);
	}
};

module.exports.help = {
	name: 'cheers',
	aliases: ['c', 'drink'],
	helpText: `-cheers [num] [drinkName]
		aliases: -c -drink
		increase your drink count by [num] (default 1)
		and set your [drinkName]`
}