const BotFramework = require("./build/BotFramework");
const Discord = require("./build/messengers/Discord");

const bot = new BotFramework(new Discord());

bot.message.send("OK");
console.log(bot.server.getId());
