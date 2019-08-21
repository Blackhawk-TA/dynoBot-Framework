import {SlackApiHandler} from "../../src/wrappers/slack/SlackApiHandler";

require("dotenv").config();
const token = process.env.DISCORD_TOKEN;
const assert = require("assert");

describe("The class SlackApiHandler", function() {
	beforeEach(function() {
		this.ApiHandler = new SlackApiHandler(token);
	});

	afterEach(function() {
		this.ApiHandler = null;
	});

	describe("The method callMethod", function() {
		it("Calls an invalid method", function() {
			//Arrange
			let methodName: string = "invalid.method";

			//Act
			return this.ApiHandler.callMethod(methodName, {}).then(result => {
				//Assert
				assert.strictEqual(result.ok, false, "The result is not ok.");
				assert.strictEqual(result.error, "unknown_method", "An unknown method has been called.");
				assert.strictEqual(result.req_method, methodName, "The invalid method name was returned correctly");
			});
		});

		it("Calls a method with invalid parameters", function() {
			//Arrange
			let methodName: string = "rtm.connect";

			//Act
			return this.ApiHandler.callMethod(methodName, {}).then(result => {
				//Assert
				assert.strictEqual(result.ok, false, "The result is not ok.");
				assert.ok(result.error, "The api returned an error message.");
			});
		});
	});
});