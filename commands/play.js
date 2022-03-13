const db = require("quick.db");

function getDate() {
    var date = new Date();
    date.setHours(date.getHours() - (date.getTimezoneOffset() / 60));
    return `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`;
}

function getDate(year, month, day) {
    var date = new Date(year, month, day);
    date.setHours(date.getHours() - (date.getTimezoneOffset() / 60));
    return `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`;
}

module.exports.run = async (bot, message, args, utils) => {
    const day = db.fetch(`${getDate()}`);
    var players = {};
    if (day != null) {
        players = day.players;
    }
    switch(args[0]){
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