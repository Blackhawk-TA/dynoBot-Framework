import {IEvent} from "../../src/wrappers/interfaces/IEvent";
import {DiscordEvent} from "../../src/wrappers/discord/DiscordEvent";
import {DiscordMessage} from "../../src/wrappers/discord/DiscordMessage";

const assert = require("assert");

describe("The method getApiEventName", function() {
	it("Returns the original unwrapped api event name", function() {
		//Arrange
		let Event: IEvent = new DiscordEvent("serverMemberAdd");

		//Act
		let apiEventName: string = Event.getApiEventName();

		//Assert
		assert.strictEqual(apiEventName, "guildMemberAdd", "The correct name of the original api event was returned.");
	});
});

describe("The method getWrappedObject", function() {
	it("Returns the wrapped object of the event", function() {
		//Arrange
		let Event: IEvent = new DiscordEvent("message");
		let apiObject: object = {};

		//Act
		let WrappedObject: any = Event.getWrappedObject(apiObject);

		//Assert
		assert.strictEqual(WrappedObject instanceof DiscordMessage, true, "The api object was wrapped correctly.");
	});

	it("Returns the api object because it should not be wrapped", function() {
		//Arrange
		let Event: IEvent = new DiscordEvent("error");
		let apiObject: Error = new Error("test error");

		//Act
		let WrappedObject: any = Event.getWrappedObject(apiObject);

		//Assert
		assert.strictEqual(WrappedObject, apiObject, "The api object was returned because it should not be wrapped.");
	});

	it("Returns null if the event has no return value and shall not be wrapped", function() {
		//Arrange
		let Event: IEvent = new DiscordEvent("ready");

		//Act
		let WrappedObject: any = Event.getWrappedObject(undefined);

		//Assert
		assert.strictEqual(WrappedObject, null, "Null was returned because the wrapped event has no return value.");
	});
});