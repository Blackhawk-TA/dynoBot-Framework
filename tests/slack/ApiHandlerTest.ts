const {ApiHandler} = require("../../src/wrappers/slack/ApiHandler");
const assert = require("assert");

describe("The function callMethod", function() {
	it("Calls an invalid method", function () {
		//Arrange
		let methodName: string = "invalid.method";

		//Act
		return ApiHandler.callMethod(methodName, {}).then(result => {
			//Assert
			assert.strictEqual(result.ok, false,  "The result is not ok.");
			assert.strictEqual(result.error, "unknown_method", "An unknown method has been called.");
			assert.strictEqual(result.req_method, methodName, "The invalid method name was returned correctly");
		})
	});
});