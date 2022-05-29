const getDateString = require("../utilities/date");
const dataUtility = require('../utilities/data');

module.exports.run = async (bot, message, args, logger) => {
	console.log(`clear from ${message.author.username}`);
	dataUtility.removeAllDrinksFromDay(message.guildId, getDateString());
	message.channel.send("removed drinking history for today");
}

module.exports.help = {
	name: "clear",
	aliases: ["empty", "restart"],
	helpText: `-clear
		aliases:  -empty -restart
		restart all player's drink counts to 0 for the day`
}