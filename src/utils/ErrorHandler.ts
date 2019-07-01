export class ErrorHandler {
	/**
	 * Prints the error into the console without quitting the program
	 */
	static log(errorMessage: string): void {
		console.error(errorMessage);
	}

	/**
	 * Throws the error and quits the program
	 */
	static throw(errorMessage: string): void {
		let error = new Error(errorMessage);
		throw error;
	}
}