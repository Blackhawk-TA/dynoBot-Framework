"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHandler {
    /**
     * Constructor for the ErrorHandler
     * @param errorMessage The message describing the error
     */
    constructor(errorMessage) {
        this._error = new Error(errorMessage);
    }
    /**
     * Prints the error into the console without quitting the program
     */
    log() {
        console.error(this._error);
    }
    /**
     * Throws the error and quits the program
     */
    throw() {
        throw this._error;
    }
}
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=ErrorHandler.js.map