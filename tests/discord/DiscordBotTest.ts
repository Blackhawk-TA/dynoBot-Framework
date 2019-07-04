import {DiscordClient} from "../../src/wrappers/discord/DiscordClient";

const {DiscordBot} = require("../../src/DiscordBot");
const Discord = require("discord.js");
const assert = require("assert");

let token = "";
if (process.env.TRAVIS) {
	token = process.env.DISCORD_TOKEN;
} else {
	const botConfig = require("../../../tests/bot-config");
	token = botConfig.token.discord;
}

beforeEach(function() {
	this.client = new Discord.Client();
});

afterEach(function() {
	this.client = null;
});

describe("The bot initialisation", function() {
	it("Has a user which is not yet defined", function() {
		//Act
		new DiscordBot(token);

		//Assert
		assert.strictEqual(this.client.user, null, "The user is not yet defined.");
	});
});

describe("The getter", function() {
	it("Has a getter which returns the wrapped client object", function() {
		//Act
		let Bot = new DiscordBot(token);

		//Assert
		assert.strictEqual(Bot.getClient() instanceof DiscordClient, true, "The wrapped client object was returned.");
	});
});
