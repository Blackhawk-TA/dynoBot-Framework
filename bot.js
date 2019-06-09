const DiscordBot = require("./build/DiscordBot");
const security = require("./cfg/security");
const bot = new DiscordBot(security.token);

bot.client.registerEvent("message");
bot.client.events.on("message", (msg) => {
	if (msg.isMentioned(bot.client.user)) {
		msg.channel.send("OK");
	}
});
