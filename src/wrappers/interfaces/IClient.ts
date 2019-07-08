import {IServer} from "./IServer";
import {IUser} from "./IUser";

export interface IClient {
	/**
	 * Executes a given listener function when the referred event was triggered
	 * @param name - The name of the event
	 * @param listener - The event listener, a function which shall be executed once the event was triggered
	 */
	onEvent(name: string, listener: (...args: any[]) => void): void;

	/**
	 * Gets the wrapped user object from the client.
	 * @return The user object of the client
	 */
	getUser(): IUser

	/**
	 * Gets the servers the client is on.
	 * @return The servers of the client
	 */
	getServers(): IServer[]
}