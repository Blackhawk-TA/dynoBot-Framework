import {DiscordClient} from "../../src/wrappers/discord/DiscordClient";
import {IBot} from "../../src/interfaces/IBot";

const {DiscordBot} = require("../../src/DiscordBot");
const assert = require("assert");

require("dotenv").config();
const token = process.env.DISCORD_TOKEN;

describe("The bot initialisation", function() {
	it("Has a user which is not yet defined", function() {
		//Act
		let Bot: IBot = new DiscordBot(token);

		//Assert
		try {
			assert.ifError(Bot.getClient().getUser().getId());
		} catch (e) {
			assert.strictEqual(e.toString(), "TypeError: Cannot read property 'id' of null");
		}
	});
});

describe("The getter", function() {
	it("Has a getter which returns the wrapped client object", function() {
		//Act
		let Bot: IBot = new DiscordBot(token);

		//Assert
		assert.strictEqual(Bot.getClient() instanceof DiscordClient, true, "The wrapped client object was returned.");
	});
});
