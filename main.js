var apiWrapper = require("./src/apiWrapper");

var bot = apiWrapper.selectAPI(0);
bot.sendMessage("Test");