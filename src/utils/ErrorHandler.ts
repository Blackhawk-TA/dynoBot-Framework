export class ErrorHandler {
	private readonly _error: Error;

	/**
	 * Constructor for the ErrorHandler
	 * @param errorMessage The message describing the error
	 */
	constructor(errorMessage: string) {
		this._error = new Error(errorMessage);
	}

	/**
	 * Prints the error into the console without quitting the program
	 */
	log(): void {
		console.error(this._error);
	}

	/**
	 * Throws the error and quits the program
	 */
	throw(): void {
		throw this._error;
	}
}