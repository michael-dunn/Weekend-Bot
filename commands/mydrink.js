const getDateString = require("../utilities/date");
const util = require('util');
const dataUtility = require('../utilities/data');

module.exports.run = async (bot, message, args, logger) => {
    console.log(`mydrink from ${message.author.username} args: ${JSON.stringify(args)}`);
    var drink = 'drink';
    if (args && args.length > 0)
        drink = args.join(' ');
    dataUtility.setPlayerDrink(message.guildId, getDateString(), { playerId: message.author.id, playerName: message.author.username },drink);
    message.channel.send(`Set drink to ${drink} for ${message.author.username}`);
}


module.exports.help = {
    name: 'mydrink',
    aliases: [],
    helpText: `-mydrink [drinkName]
        set your [drinkName] (default 'drink')`
}