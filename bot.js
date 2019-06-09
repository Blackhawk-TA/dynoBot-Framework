const DiscordBot = require("./build/DiscordBot");
const security = require("./cfg/security");
const bot = new DiscordBot();

bot.client.login(security.token);
bot.client.on("message").then(msg => { //TODO can only be called one?
	msg.channel.send("OK");
});