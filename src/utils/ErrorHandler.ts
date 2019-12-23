export class ErrorHandler {
	/**
	 * Prints the given error into the console without quitting the program
	 * @param error - The error which shall be logged in the console
	 */
	static log(error: string|Error): void {
		console.error(error);
	}

	/**
	 * Converts the given error message to an error, throws it and quits the program
	 * @param errorMessage - The message which shall be converted to an error object
	 */
	static throwErrorMessage(errorMessage: string): void {
		let error: Error = new Error(errorMessage);
		throw error;
	}

	/**
	 * Throws the given error and quits the program
	 * @param error - The error which shall be thrown
	 */
	static throwError(error: Error): void {
		throw error;
	}

	/**
	 * Throws an error with a default error message and the error that the api handed over
	 * @param apiName - The name of the api to be displayed in the error message
	 * @param apiErrorMessage - The error handed over by the API
	 */
	static apiError(apiName: string, apiErrorMessage: any): void {
		let error: Error = new Error("A problem occurred while using the " + apiName + " API: " + apiErrorMessage);
		throw error;
	}
}