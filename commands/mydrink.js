const db = require("quick.db");
const getDateString = require("../utilities/date");
const util = require('util');

module.exports.run = async (bot, message, args, logger) => {
    var dataId = `${getDateString()}-${message.guild.name}`;
    var drink = 'alcohol';
    if (args && args.length > 0)
        drink = args[0];
    logger.log(util.format("Setting a drink to '%s'", drink));
    var data = db.fetch(`${dataId}`);
    if (data != null) {
        if (data.players != null && data.players.length > 0 && data.players.findIndex(x => x.name == message.author.username) != -1) {
            var player = data.players.find(x => x.name == message.author.username);
            logger.log(util.format('%s\'s drink set from %s to %s', player.name, player.currentDrink, drink));
            player.currentDrink = drink;
            db.set(`${dataId}`, data);
        }
        else {
            logger.log(util.format('%s was not in database. Adding now with drink set to %s', message.author.username, drink));
            db.push(`${dataId}.players`, { name: message.author.username, drinks: [], currentDrink: drink });
        }
    }
    else {
        message.channel.send(`Set drink to ${drink} for ${message.author.username}`);
        db.push(`${dataId}.players`, { name: message.author.username, drinks: [], currentDrink: drink });
    }
    logger.log(util.format('Drink set. db: %j', db.fetch(`${dataId}`)));
}


module.exports.help = {
    name: 'mydrink',
    aliases: [],
    helpText: `-mydrink [drinkName]
        set your [drinkName] (default 'alcohol')`
}