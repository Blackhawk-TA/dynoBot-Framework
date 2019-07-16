import {EventEmitter} from "events";
import {EventWrapper} from "../../src/utils/EventWrapper";

const assert = require("assert");

describe("The class EventWrapper", function() {
	describe("The method registerEvents", function() {
		beforeEach(function() {
			this.originalEmitter = new EventEmitter();
			this.eventsToRegister = {
				ready: {
					name: "ready",
					returnClass: null,
					isWrapped: false,
					isInitEvent: true
				},
				serverMemberAdd: {
					name: "guildMemberAdd",
					returnClass: null,
					isWrapped: false,
					isInitEvent: false
				}
			};
			this.wrappedEmitter = new EventEmitter();
			this.EventWrapper = new EventWrapper(this.originalEmitter, this.wrappedEmitter);
		});

		afterEach(function() {
			this.originalEmitter = null;
			this.wrappedEmitter = null;
			this.EventEmitter = null;
		});

		/*it("Registers all events including init events", function() {
			//Act
			this.EventWrapper.registerEvents(this.eventsToRegister);

			this.originalEmitter.emit("ready");
			this.originalEmitter.emit("guildMemberAdd");

			//Assert
			return new Promise(resolve => {
				this.wrappedEmitter.on("serverMemberAdd", () => {
					assert.strictEqual(this.wrappedEmitter, 2, "The correct amount of events was wrapped.");
					resolve();
				});
			});
		});*/
	});
});