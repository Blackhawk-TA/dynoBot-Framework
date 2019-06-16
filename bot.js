const DiscordBot = require("./build/src/DiscordBot");
const security = require("./test-resources/bot-config");
const bot = new DiscordBot(security.token);

bot.client.registerEvent("ready");
bot.client.registerEvent("message");

bot.client.events.on("ready", () => {
	console.log("Bot started");

	bot.client.events.on("message", (msg) => {
		if (msg.isMentioned(bot.client.user)) {
			msg.channel.send("OK");
		}
	});
});
