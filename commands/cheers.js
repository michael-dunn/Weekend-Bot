const db = require("quick.db");

function getDate() {
  var date = new Date();
  date.setHours(date.getHours() - (date.getTimezoneOffset() / 60));
  return `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`;
}

function getDate(year,month,day) {
  var date = new Date(year,month,day);
  date.setHours(date.getHours() - (date.getTimezoneOffset() / 60));
  return `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`;
}

module.exports.run = async (bot, message, args, utils) => {
  const day = db.fetch(`${getDate()}`);
  if (day != null){
    const player = day.players.findIndex(p=>p.name == message.author.username);
    if (player != -1){
      day.players[player].drinks += 1;
      db.set(`${getDate()}`, day);
      message.reply(`${message.author.username} has had ${day.players[player].drinks} drinks`);
    }
    else {
      db.push(`${getDate()}.players`,{name: message.author.username, drinks: 1});
      message.reply(`${message.author.username} had their first drink of the day!`);
    }
  }
  else {
    db.set(getDate(),{players: [{name: message.author.username, drinks: 1}]});
    message.reply(`${message.author.username} getting the party started!`);
  }
};

module.exports.help = {
  name: "cheers",
  aliases: []
}