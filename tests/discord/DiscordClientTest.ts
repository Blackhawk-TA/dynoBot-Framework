import {DiscordClient} from "../../src/wrappers/discord/DiscordClient";
import {EventEmitter} from "events";
import {DiscordUser} from "../../src/wrappers/discord/DiscordUser";
import {DiscordServer} from "../../src/wrappers/discord/DiscordServer";
import {IServer} from "../../src/wrappers/interfaces/IServer";

const assert = require("assert");
const sinon = require("sinon");

//TODO adjust tests according to PreInitClient
describe("The class DiscordClient", function() {
	beforeEach(function() {
		let client: object = {
			on: function() {
			},
			_user: {}
		};
		this.clientOnCallStub = sinon.stub(client, "on");
		this.Client = new DiscordClient(client);
	});

	afterEach(function() {
		this.clientOnCallStub.restore();
		this.Client = null;
	});

	describe("The constructor event registration", function() {
		it("Calls the 'on' method for each event", function() {
			//Assert
			assert.strictEqual(this.clientOnCallStub.callCount, 5, "The correct amount of events were registered.");
			assert.strictEqual(this.clientOnCallStub.getCall(0).args[0], "error", "The 'on' method was called for the 'error' event.");
			assert.strictEqual(this.clientOnCallStub.getCall(1).args[0], "guildMemberAdd", "The 'on' method was called for the 'guildMemberAdd' event.");
			assert.strictEqual(this.clientOnCallStub.getCall(2).args[0], "guildMemberRemove", "The 'on' method was called for the 'guildMemberRemove' event.");
			assert.strictEqual(this.clientOnCallStub.getCall(3).args[0], "message", "The 'on' method was called for the 'message' event.");
			assert.strictEqual(this.clientOnCallStub.getCall(4).args[0], "ready", "The 'on' method was called for the 'ready' event.");
		});
	});

	describe("The method onEvent", function() {
		it("Throws an error if the event is not supported", function() {
			try {
				//Act
				this.Client.onEvent("test", () => {
				});
			} catch (e) {
				//Assert
				assert.strictEqual(e.toString(), "Error: The event 'test' is not supported.", "The correct error was thrown.");
			}
		});

		it("Use the original event emitter", function() {
			//Arrange
			let listener = function() {
			};
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

	describe("The method getUser", function() {
		it("Returns the wrapped user object", function() {
			//Act
			let User = this.Client.getUser();

			//Assert
			assert.strictEqual(User instanceof DiscordUser, true, "The user object was wrapped correctly.");
		});
	});

	describe("The method getServers", function() {
		it("Returns an empty array", function() {
			//Arrange
			let client: object = {
				on: function() {},
				guilds: {
					array: function() {
						return [];
					}
				}
			};
			let Client: DiscordClient = new DiscordClient(client);

			//Act
			let Servers: IServer[] = Client.getServers();

			//Assert
			assert.deepStrictEqual(Servers, [], "An empty array was returned.");
		});

		it("Returns an array containing one server", function() {
			//Arrange
			let client: object = {
				on: function() {},
				guilds: {
					array: function() {
						return [{}];
					}
				}
			};
			let Client: DiscordClient = new DiscordClient(client);

			//Act
			let Servers: IServer[] = Client.getServers();

			//Assert
			assert.strictEqual(Servers.length, 1, "The length of the returned array is correct.");
			assert.strictEqual(Servers[0] instanceof DiscordServer, true, "The server object was wrapped correctly.");
		});

		it("Returns an array containing two servers", function() {
			//Arrange
			let client: object = {
				on: function() {},
				guilds: {
					array: function() {
						return [{}, {}];
					}
				}
			};
			let Client: DiscordClient = new DiscordClient(client);

			//Act
			let Servers: IServer[] = Client.getServers();

			//Assert
			assert.strictEqual(Servers.length, 2, "The length of the returned array is correct.");
			assert.strictEqual(Servers[0] instanceof DiscordServer, true, "The server object was wrapped correctly.");
			assert.strictEqual(Servers[1] instanceof DiscordServer, true, "The server object was wrapped correctly.");
		});
	});
});