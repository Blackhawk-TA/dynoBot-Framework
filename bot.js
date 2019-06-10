const DiscordBot = require("./build/DiscordBot");
const security = require("./cfg/security");
const bot = new DiscordBot(security.token);

bot.client.registerEvent("ready");
bot.client.registerEvent("message");

bot.client.events.on("ready", () => {
	console.log("Bot started");

	bot.client.events.on("message", (msg) => {
		if (msg.isMentioned(bot.client.user)) { //TODO user outdated
			msg.channel.send("OK");
		}
	});
});
