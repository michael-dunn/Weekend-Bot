module.exports.run = async (bot, message, args, logger) => {
    var helpText = 'Weekend Bot Help';
    helpText += '\n**Key**: **required** [optional]'
    helpText += bot.helpText;
    message.channel.send(helpText);
}


module.exports.help = {
    name: "help",
    aliases: []
}