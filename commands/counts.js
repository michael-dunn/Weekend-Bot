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
    if (day != null) {
        var drinkString = "Current drinks are:";
        if (day.players.length > 0){
            for (player of day.players){
                drinkString += `\n${player.name} - ${player.drinks}`;
            }
        }
        else{
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
    aliases: []
}