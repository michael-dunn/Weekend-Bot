const db = require('quick.db');
const getDateString = require('../utilities/date');
const bus = require('../bus/bus');
const gifGetter = require('../bus/drink-gif');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

const defaultFields = [{ name: 'Color', value: '-', inline: true },
{ name: 'Higher or Lower', value: '-', inline: true },
{ name: 'Between or Outside', value: '-', inline: true },
{ name: 'Suit', value: '-', inline: true }]

var embed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Ride the Bus')
    .setDescription('Get ready to get fucked up')
    .setThumbnail('https://i.pinimg.com/originals/37/00/00/370000d02f9d2e8c8ff8ab93a555d442.png');

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
            var initialGame = bus.newGame();

            initialGame.buttons.forEach(button => {
                row.components.push(
                    new MessageButton()
                        .setCustomId(button.val)
                        .setStyle("PRIMARY")
                        .setLabel(button.label)
                );
            });
            embed.fields = defaultFields;
            embed.setFooter({ text: initialGame.footer });
            bot.on('interactionCreate', interaction => {
                if (!interaction.isButton()) return;
                const game = bus.next(interaction.customId);
                if (game == null){
                    embed.setFooter({ text: 'Thanks for playing!' });
                    messageHandler.edit({embeds: [embed]});
                }
                row.components = [];
                game.buttons.forEach(button => {
                    row.components.push(
                        new MessageButton()
                            .setCustomId(button.val)
                            .setStyle("PRIMARY")
                            .setLabel(button.label)
                    );
                });
                if (game.cards.length == 0) {
                    embed.fields.forEach(f=> f.value = '-');
                }
                else {
                    embed.fields[game.cards.length - 1].value = game.cards[game.cards.length - 1].code;
                }
                embed.setFooter({ text: game.footer });
                if (game.drink){
                    embed.description = `Drink count: ${game.count}`;
                    embed.setImage(gifGetter());
                    setTimeout(() => {
                        embed.image = null;
                        messageHandler.edit({ embeds: [embed], components: [row] });
                    }, 6000);
                }
                messageHandler.edit({ embeds: [embed], components: [row] });
                interaction.deferUpdate();
            });

            messageHandler = await message.channel.send({ embeds: [embed], components: [row] });
            break;
        default:
            logger.log("no game type found");
            break;
    }
};

module.exports.help = {
    name: "play",
    aliases: []
}