const db = require("quick.db");
const getDateString = require("../utilities/date");
const util = require('util');

module.exports.run = async (bot, message, args, logger) => {
    var dataId = `${getDateString()}-${message.guild.name}`;
    logger.log(util.format("Getting data for [%s]\n", dataId));
    const day = db.fetch(`${dataId}`);
    if (day != null) {
        var drinkString = "Current drinks are:";
        if (day.players.length > 0) {
            for (player of day.players) {
                drinkString += `\n${player.name} - ${player.drinks}`;
            }
        }
        else {
            drinkString += " no one has had a drink today";
        }
        message.reply(drinkString);
    }
    else {
        message.reply(`No one has started the party`);
    }
};

module.exports.help = {
    name: "counts",
    aliases: ["count", "status"]
}