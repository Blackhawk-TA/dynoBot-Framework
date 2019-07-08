import {DiscordClient} from "../../src/wrappers/discord/DiscordClient";
import {EventEmitter} from "events";
import {DiscordUser} from "../../src/wrappers/discord/DiscordUser";

const assert = require("assert");
const sinon = require("sinon");

describe("The class DiscordClient", function () {
	beforeEach(function () {
		let _client = {
			on: function() {},
			_user: {}
		};
		this.clientOnCallStub = sinon.stub(_client, "on"); //TODO fix stub
		this.Client = new DiscordClient(_client);
	});

	afterEach(function () {
		this.clientOnCallStub.restore();
		this.Client = null;
	});

	describe("The constructor event registration", function() {
		//TODO implement
	});

	describe("The method onEvent", function () {
		it("Throws an error if the event is not supported", function () {
			try {
				//Act
				this.Client.onEvent("test", () => {});
			} catch (e) {
				//Assert
				assert.throws(e.toString, "The event 'test' is not supported.", "The correct error was thrown.");
			}
		});

		it("Use the original event emitter", function () {
			//Arrange
			let listener = function() {};
			let onEventEmitterStub = sinon.stub(EventEmitter.prototype, "on");

			//Act
			this.Client.onEvent("ready", listener);

			//Assert
			assert.strictEqual(onEventEmitterStub.getCall(0).args[0], "ready", "The correct event name was handed over.");
			assert.strictEqual(onEventEmitterStub.getCall(0).args[1], listener, "The correct listener was handed over.");

			//Cleanup
			onEventEmitterStub.restore();
		});
	});

	describe("The method getUser", function () {
		it("Returns the wrapped user object", function () {
			//Act
			let User = this.Client.getUser();

			//Assert
			assert.strictEqual(User instanceof DiscordUser, true, "The user object was wrapped correctly.");
		});
	});

	describe("The method getServers", function() {
		//TODO implement
	});
});