import {DiscordClient} from "../../src/wrappers/discord/DiscordClient";
import {IBot} from "../../src/interfaces/IBot";
import {EventEmitter} from "events";

const {DiscordBot} = require("../../src/DiscordBot");
const assert = require("assert");
const sinon = require("sinon");

require("dotenv").config();
const token = process.env.DISCORD_TOKEN;

describe("The class DiscordBot", function() {
	describe("The method onEvent", function() {
		it("Throws an error if the event is not supported", function() {
			//Arrange
			let Bot: IBot = new DiscordBot(token);

			try {
				//Act
				Bot.onEvent("test", () => {});
			} catch (e) {
				//Assert
				assert.strictEqual(e.toString(), "Error: The event 'test' is not supported.", "The correct error was thrown.");
			}
		});

		it("Use the original event emitter", function() { //TODO adjust
			//Arrange
			let listener = function() {};
			let onEventEmitterStub = sinon.stub(EventEmitter.prototype, "on");
			let Bot: IBot = new DiscordBot(token);

			//Act
			Bot.onEvent("ready", () => {
				Bot.onEvent("message", listener);

				//Assert
				assert.strictEqual(onEventEmitterStub.getCall(0).args[0], "message", "The correct event name was handed over.");
				assert.strictEqual(onEventEmitterStub.getCall(0).args[1], listener, "The correct listener was handed over.");
			});

			//Cleanup
			onEventEmitterStub.restore();
		});
	});

	describe("The getter", function() {
		it("Has a getter which returns the wrapped client object when it was initialized", function() {
			//Act
			let Bot: IBot = new DiscordBot(token);

			//Assert
			Bot.onEvent("ready", () => {
				assert.strictEqual(Bot.getClient() instanceof DiscordClient, true, "The wrapped client object was returned.");
			});
		});

		it("Returns an error because the bot has not been initialized yet", function() {
			//Act
			let Bot: IBot = new DiscordBot(token);

			//Assert
			try {
				assert.ifError(Bot.getClient());
			} catch (e) {
				assert.strictEqual(e.toString(), "Error: The bot has not been initialized yet.");
			}
		});
	});
});
