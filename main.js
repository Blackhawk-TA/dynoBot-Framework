// const DiscordWrapper = require("./build/bot-api-wrappers/DiscordWrapper");
const BotFramework = require("./build/BotFramework");

// const wrapper = new DiscordWrapper();
const bot = new BotFramework("Discord");

bot.sendMessage("Test");