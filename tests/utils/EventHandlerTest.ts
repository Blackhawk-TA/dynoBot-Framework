import {DiscordMessage} from "../../src/wrappers/discord/DiscordMessage";
import {EventHandler} from "../../src/utils/EventHandler";

const assert = require("assert");

describe("The class EventHandler", function() {
	beforeEach(function() {
		this._apiEvents = {
			error: {
				name: "error",
				returnClass: Error,
				isWrapped: false
			},
			serverMemberAdd: {
				name: "guildMemberAdd"
			},
			message: {
				name: "message",
				returnClass: DiscordMessage,
				isWrapped: true,
				isInitEvent: false
			},
			ready: {
				name: "ready",
				returnClass: null,
				isWrapped: false,
				isInitEvent: true
			}
		};
	});

	afterEach(function() {
		this._apiEvents = null;
	});

	describe("The method isInitEvent", function() {
		it("Returns false because the event is not an init event", function() {
			//Arrange
			let Event: EventHandler = new EventHandler("message", this._apiEvents);

			//Act
			let isInitEvent: boolean = Event.isInitEvent();

			//Assert
			assert.strictEqual(isInitEvent, false, "The event is not an init event.");
		});

		it("Returns true because the event is an init event", function() {
			//Arrange
			let Event: EventHandler = new EventHandler("ready", this._apiEvents);

			//Act
			let isInitEvent: boolean = Event.isInitEvent();

			//Assert
			assert.strictEqual(isInitEvent, true, "The event is an init event.");
		});
	});

	describe("The method getApiEventName", function() {
		it("Returns the original unwrapped api event name", function() {
			//Arrange
			let Event: EventHandler = new EventHandler("serverMemberAdd", this._apiEvents);

			//Act
			let apiEventName: string = Event.getApiEventName();

			//Assert
			assert.strictEqual(apiEventName, "guildMemberAdd", "The correct name of the original api event was returned.");
		});
	});

	describe("The method getWrappedObject", function() {
		it("Returns the wrapped object of the event", function() {
			//Arrange
			let Event: EventHandler = new EventHandler("message", this._apiEvents);
			let apiObject: object = {};

			//Act
			let WrappedObject: any = Event.getWrappedObject(apiObject);

			//Assert
			assert.strictEqual(WrappedObject instanceof DiscordMessage, true, "The api object was wrapped correctly.");
		});

		it("Returns the api object because it should not be wrapped", function() {
			//Arrange
			let Event: EventHandler = new EventHandler("error", this._apiEvents);
			let apiObject: Error = new Error("test error");

			//Act
			let WrappedObject: any = Event.getWrappedObject(apiObject);

			//Assert
			assert.strictEqual(WrappedObject, apiObject, "The api object was returned because it should not be wrapped.");
		});

		it("Returns null if the event has no return value and shall not be wrapped", function() {
			//Arrange
			let Event: EventHandler = new EventHandler("ready", this._apiEvents);

			//Act
			let WrappedObject: any = Event.getWrappedObject(undefined);

			//Assert
			assert.strictEqual(WrappedObject, null, "Null was returned because the wrapped event has no return value.");
		});
	});
});