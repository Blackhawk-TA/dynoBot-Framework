import {SlackApiHandler} from "../../src/wrappers/slack/utils/SlackApiHandler";
import {ErrorHandler} from "../../src/utils/ErrorHandler";

require("dotenv").config();
const token = process.env.DISCORD_TOKEN;
const assert = require("assert");
const sinon = require("sinon");

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
			let throwErrorStub = sinon.stub(ErrorHandler, "throwErrorMessage");

			//Act
			return this.ApiHandler.callMethod(methodName).catch(() => {
				assert.strictEqual(throwErrorStub.callCount, true, "An error was thrown");
			});
		});

		it("Calls a method with invalid parameters", function() {
			//Arrange
			let methodName: string = "rtm.connect";

			//Act
			return this.ApiHandler.callMethod(methodName).then(result => {
				//Assert
				assert.strictEqual(result.ok, false, "The result is not ok.");
				assert.ok(result.error, "The api returned an error message.");
			});
		});
	});
});