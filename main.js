const DiscordBot = require("./build/DiscordBot");

const bot = new DiscordBot();

bot.client.login("NTg2OTgwMjg0NjE3MTk1NTIx.XPv6GQ.okpOpqwdr0tSu1O8O3Pi_lCj8js");
bot.client.on("message").then(msg => {
	console.log(msg)
});
bot.message.send("OK");