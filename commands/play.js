const db = require("quick.db");
const getDateString = require("../utilities/date");

module.exports.run = async (bot, message, args, logger) => {
    const data = db.fetch(`${getDateString()}`);
    var players = {};
    if (data != null) {
        players = data.players;
    }
    switch (args[0]) {
        case 'roulette':
            message.channel.send('time to play some roulette');
            break;
        case 'roll':
            message.channel.send('time to roll the dice');
            break;
        case 'hol':
            message.channel.send('time to play higher or lower');
            break;
    }
};

module.exports.help = {
    name: "play",
    aliases: []
}