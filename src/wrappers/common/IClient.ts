export interface IClient {
	/**
	 * Registers a new event which can be accessed later
	 * @param {string} name - The name of the event
	 */
	registerEvent(name: string): void;
}