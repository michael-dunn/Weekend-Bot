const db = require("quick.db");
const getDateString = require("../utilities/date");
const util = require('util');

module.exports.run = async (bot, message, args, logger) => {
	var dataId = `${getDateString()}-${message.guild.name}`;
	logger.log(util.format("Deleting data for [%s]", dataId));
	var data = db.fetch(`${dataId}`);
	if (data != null && data.players != null && data.players.length != 0) {
		for (var i = 0; i < data.players.length; i++) {
			logger.log(util.format('setting %s\'s drinks to 0', data.players[i].name));
			data.players[i].drinks = [];
			data.players[i].currentDrink = 'alcohol';
		};
		db.set(`${dataId}`, data);
		message.channel.send("removed drinking history for today");
	}
	else {
		message.channel.send("no drinking history to remove");
	}
}


module.exports.help = {
	name: "clear",
	aliases: ["empty", "restart"],
	helpText: `-clear
		aliases:  -empty -restart
		restart all player's drink counts to 0 for the day`
}