const bus = require('../bus/bus');
const gifGetter = require('../bus/drink-gif');
const { MessageActionRow, MessageButton, MessageEmbed, Util } = require('discord.js');
const fs = require('fs');
const util = require('util');
const getEpisode = require('./../utilities/iasip/episode-selector');
const getEpisodeDetail = require('./../utilities/iasip/episode-detail');
const googleSearchUrl = 'https://www.google.com/search?q=watch+it%27s+always+sunny+online+season+%s+episode+%s+movies123';

const defaultFields = [{ name: 'Color', value: '-', inline: true },
{ name: 'Higher or Lower', value: '-', inline: true },
{ name: 'Between or Outside', value: '-', inline: true },
{ name: 'Suit', value: '-', inline: true }];

var embed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Ride the Bus')
    .setDescription('Get ready to get jacked up')
    .setThumbnail('https://i.pinimg.com/originals/37/00/00/370000d02f9d2e8c8ff8ab93a555d442.png');

var messageHandler = {};

module.exports.run = async (bot, message, args, logger) => {
    console.log(`play from ${message.author.username} args: ${JSON.stringify(args)}`);
    switch (args[0]) {
        case 'iasip':
            fs.readFile('./constants/iasip-drinking.txt', 'utf8', (err, data) => {
                if (err) {
                    console.error(err)
                    return
                }
                message.channel.send(data);
                bot.commands.get('play').run(bot, message, ['episode'],logger);
            });
            break;
        case 'episode':
            getEpisodeDetail(getEpisode()).then(res => {
                var episodeEmbed = new MessageEmbed()
                    .setColor('#174d25')
                    .setTitle('It\'s Always Sunny Episode')
                    .setDescription(res.name)
                    .setThumbnail(res.image);
                episodeEmbed.fields = [{ name: 'Season', value: `${res.season}`, inline: true },
                { name: 'Episode', value: `${res.episode}`, inline: true },
                { name: 'Air Date', value: `${res.airDate}`, inline: true },
                { name: 'Description', value: res.description, inline: false },
                { name: 'Google Search', value: util.format(googleSearchUrl,res.season,res.episode), inline: false }];

                message.channel.send({ embeds: [episodeEmbed]});
            });
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
            embed.fields = defaultFields.map(f => { f.value = '-'; return f; });
            embed.setFooter({ text: initialGame.footer });
            bot.on('interactionCreate', interaction => {
                if (!interaction.isButton()) return;
                const game = bus.next(interaction.customId);
                if (game == null) { //game over
                    embed.setFooter({ text: 'Thanks for playing!' });
                    messageHandler.edit({ embeds: [embed] });
                }
                if (game.drink) {
                    embed.description = `Drink count: ${game.count}`;
                    embed.setImage(gifGetter());
                    embed.fields.find(f=>f.value=='-').value = game.lastCard.code;
                    row.components.forEach(c=>c.setDisabled(true));
                    messageHandler.edit({ embeds: [embed], components: [row] });
                    setTimeout(() => {
                        embed.image = null;
                        setEmbed(row,game,embed,messageHandler,interaction);
                    }, 6000);
                }
                else {
                    setEmbed(row,game,embed,messageHandler,interaction);
                }
                interaction.deferUpdate();
            });

            messageHandler = await message.channel.send({ embeds: [embed], components: [row] });
            break;
        default:
            logger.log("no game type found");
            break;
    }
};

function setEmbed(row,game,embed,messageHandler){
    row.components = [];
    game.buttons.forEach(button => {
        row.components.push(
            new MessageButton()
                .setCustomId(button.val)
                .setStyle("PRIMARY")
                .setLabel(button.label)
                .setDisabled(false)
        );
    });
    if (game.cards.length == 0) {
        embed.fields.forEach(f => f.value = '-');
    }
    else {
        embed.fields[game.cards.length - 1].value = game.cards[game.cards.length - 1].code;
    }
    messageHandler.edit({ embeds: [embed], components: [row] });
}

module.exports.help = {
    name: "play",
    aliases: [],
    helpText: `-play [game]
        [game] can be 'bus', 'iasip' and 'episode'`
}