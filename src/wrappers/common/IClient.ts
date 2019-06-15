import {IServer} from "./IServer";

export interface IClient {
	/**
	 * Get the servers the client is on
	 * @return {IServer[]} - The servers of the client
	 */
	getServers(): IServer[]

	/**
	 * Registers a new event which can be accessed later
	 * @param {string} name - The name of the event
	 */
	registerEvent(name: string): void;
}