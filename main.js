const { Client, Intents, Collection } = require('discord.js');
const botconfig = require("./botconfig.json");
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const fs = require('fs');
const logger = require('./utilities/logger');
const config = require('./config.json');

bot.commands = new Collection();
bot.aliases = new Collection();
bot.helpText = '';

fs.readdir("./commands/", (err, files) => {

	if (err) console.log(err);
	let jsfile = files.filter(f => f.split(".").pop() === "js");
	if (jsfile.length <= 0) {
		console.log("Couldn't find commands.");
		return;
	}

	jsfile.forEach((f, i) => {
		let props = require(`./commands/${f}`);
		bot.commands.set(props.help.name, props);
		props.help.aliases.forEach(alias => {
			bot.aliases.set(alias, props.help.name);
		});
		if (props.help.helpText)
			bot.helpText += '\n' + props.help.helpText;
	});
});
bot.on("ready", async () => {
	bot.user.setActivity(`The weekend already?`);
	bot.user.setStatus('online');

	bot.on("messageCreate", async message => {
		if (message.author.bot) return;
		if (message.channel.type === "dm") return;
		if (message.channel.name != 'weekend') return;
		let prefix = botconfig.prefix;
		let args = message.content.slice(prefix.length).trim().split(/ +/g);
		let cmd = args.shift().toLowerCase();
		let commandfile;

		if (bot.commands.has(cmd)) {
			commandfile = bot.commands.get(cmd);
		} else if (bot.aliases.has(cmd)) {
			commandfile = bot.commands.get(bot.aliases.get(cmd));
		}

		if (!message.content.startsWith(prefix)) return;

		try {
			commandfile.run(bot, message, args, logger);
		} catch (e) {
			console.log(e);
		}
		logger.reset();
	}
	)
})
bot.login(config.token);