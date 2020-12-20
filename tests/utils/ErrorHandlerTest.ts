import {ErrorHandler} from "../../src/utils/ErrorHandler";

const assert = require("assert");

describe("The class ErrorHandler", function() {
	describe("The method throwErrorMessage", function() {
		it("Converts the error message to an error object and throws it", function() {
			//Assert
			let errorMessage: string = "my error message";

			try {
				//Act
				ErrorHandler.throwErrorMessage(errorMessage);
			} catch (e) {
				//Assert
				assert.strictEqual(e.toString(), "Error: my error message", "The correct error was thrown.");
			}
		});
	});

	describe("The method throwError", function() {
		it("Throws the error object", function() {
			//Assert
			let error: Error = new Error("my error message");

			try {
				//Act
				ErrorHandler.throwError(error);
			} catch (e) {
				//Assert
				assert.strictEqual(e, error, "The correct error was thrown.");
			}
		});
	});
});