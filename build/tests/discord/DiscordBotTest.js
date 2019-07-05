"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DiscordClient_1 = require("../../src/wrappers/discord/DiscordClient");
const { DiscordBot } = require("../../src/DiscordBot");
const assert = require("assert");
require("dotenv").config();
const token = process.env.DISCORD_TOKEN;
describe("The bot initialisation", function () {
    it("Has a user which is not yet defined", function () {
        //Act
        let Bot = new DiscordBot(token);
        //Assert
        try {
            assert.ifError(Bot.getClient().getUser().getId());
        }
        catch (e) {
            assert.strictEqual(e.toString(), "TypeError: Cannot read property 'user' of null");
        }
    });
});
describe("The getter", function () {
    it("Has a getter which returns the wrapped client object", function () {
        //Act
        let Bot = new DiscordBot(token);
        //Assert
        assert.strictEqual(Bot.getClient() instanceof DiscordClient_1.DiscordClient, true, "The wrapped client object was returned.");
    });
});
//# sourceMappingURL=DiscordBotTest.js.map