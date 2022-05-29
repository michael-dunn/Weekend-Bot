const getDateString = require("../utilities/date");
const util = require('util');
const dataUtility = require('../utilities/data');

module.exports.run = async (bot, message, args, logger) => {
    console.log(`counts from ${message.author.username} args: ${JSON.stringify(args)}`);
    var drinkCounts = dataUtility.getAllPlayerDrinkCounts(message.guildId, getDateString());

    drinkString = 'Drink counts:';
    if (drinkCounts.length > 0){
        for (const drinkCount of drinkCounts) {
            if (args && args.length > 0 && args == 'verbose') {
                drinkString += `\n${drinkCount.playerName} - ${drinkCount.drinkCounts.map(d => `${d.count} ${d.drinkName}s`).join(', ')}`
            }
            else {
                drinkString += `\n${drinkCount.playerName} - ${drinkCount.drinkCounts.reduce((a, b) => a + b.count, 0)}`
            }
        }
    }
    else {
        drinkString += " no one has had a drink today";
    }

    message.channel.send(drinkString);
};

module.exports.help = {
    name: 'counts',
    aliases: ['count', 'status'],
    helpText: `-counts
        aliases: -count -status
        get all players drink counts`
}