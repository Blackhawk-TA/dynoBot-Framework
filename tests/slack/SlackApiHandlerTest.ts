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

			//Act
			return this.ApiHandler.callMethod(methodName).catch(() => {
				let throwErrorStub = sinon.stub(ErrorHandler, "throwErrorMessage");

				//Assert
				assert.strictEqual(throwErrorStub.callCount, true, "An error was thrown");

				//Cleanup
				throwErrorStub.restore();
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

	describe("The method preCallMethod", function() {
		beforeEach(function() {
			this.callMethodStub = sinon.stub(this.ApiHandler, "callMethod");
		});

		afterEach(function() {
			this.callMethodStub.restore();
		});

		it("Calls the method", function() {
			//Arrange
			let methodName: string = "someMethod",
				response = {
					value: true
				},
				expectedBufferedMethods: object = {
					returnValue: response
				};

			this.callMethodStub.returns(
				new Promise(resolve => {
					resolve(response);
				})
			);

			this.ApiHandler._bufferedMethods[methodName] = {
				returnValue: response
			};

			//Act
			this.ApiHandler.preCallMethod(methodName);

			//Assert
			assert.deepStrictEqual(this.ApiHandler._bufferedMethods[methodName], expectedBufferedMethods, "The return value was written to the buffered methods.");
		});
	});

	describe("The method getPreCalledMethod", function() {
		it("Returns the result of the buffered method", function() {
			//Arrange
			let methodName: string = "someMethod",
				expectedReturnValue: object = {
					value: true
				};

			this.ApiHandler._bufferedMethods = {
				someMethod: {
					returnValue: expectedReturnValue
				}
			};

			//Act
			let result = this.ApiHandler.getPreCalledMethod(methodName);

			//Assert
			assert.strictEqual(result, expectedReturnValue, "The correct value was returned.");
		});

		it("Throws an error because the buffered method does not exist", function() {
			//Arrange
			let throwErrorStub = sinon.stub(ErrorHandler, "throwErrorMessage");

			try {
				//Act
				this.ApiHandler.getPreCalledMethod("invalidMethod");
			} catch (e) {
				//Assert
				assert.strictEqual(throwErrorStub.callCount, 1, "The method throwErrorMessage was called.");
			}

			//Cleanup
			throwErrorStub.restore();
		});
	});
});