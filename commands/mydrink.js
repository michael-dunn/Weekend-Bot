const getDateString = require("../utilities/date");
const util = require('util');
const dataUtility = require('../utilities/data');

module.exports.run = async (bot, message, args, logger) => {
    var drink = 'undefined';
    if (args && args.length > 0)
        drink = args[0];
    dataUtility.setPlayerDrink(message.guildId, getDateString(), { playerId: message.author.id, playerName: message.author.username });
    message.channel.send(`Set drink to ${drink} for ${message.author.username}`);
}


module.exports.help = {
    name: 'mydrink',
    aliases: [],
    helpText: `-mydrink [drinkName]
        set your [drinkName] (default 'alcohol')`
}