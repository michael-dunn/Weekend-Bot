const db = require('quick.db');
const getDateString = require('../utilities/date');
const util = require('util');
const bus = require('../bus/bus');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

var embed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Ride the Bus')
    .setDescription('Get ready to get fucked up')
    .setThumbnail('https://i.pinimg.com/originals/37/00/00/370000d02f9d2e8c8ff8ab93a555d442.png')
    .addFields(
        { name: 'Color', value: '-', inline: true },
        { name: 'Higher or Lower', value: '-', inline: true },
        { name: 'Between or Outside', value: '-', inline: true },
        { name: 'Suit', value: '-', inline: true },
    );

var messageHandler = {};

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
        case 'bus':
            const row = new MessageActionRow();
            bus.newGame().forEach(button => {
                console.log(button);
                row.components.push(
                    new MessageButton()
                        .setCustomId(button.val)
                        .setStyle("PRIMARY")
                        .setLabel(button.label)
                    );
            });

            bot.on('interactionCreate', interaction => {
                if (!interaction.isButton()) return;
                const buttons = bus.next(interaction.customId);
                row.components = [];
                buttons.forEach(button => {
                    row.components.push(
                        new MessageButton()
                            .setCustomId(button.val)
                            .setStyle("PRIMARY")
                            .setLabel(button.label)
                        );
                });
                messageHandler.edit({ embeds: [embed], components: [row] });
                interaction.deferUpdate();
            });

            messageHandler = await message.channel.send({ embeds: [embed], components: [row] });
            break;
        default:
            logger.log("no game found");
            break;
    }
};

module.exports.help = {
    name: "play",
    aliases: []
}