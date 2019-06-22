import {EventEmitter} from "events";
import {IServer} from "./IServer";
import {IUser} from "./IUser";

export interface IClient {
	/**
	 * Get the event emitter of the client to allow reacting on events
	 * @return The event emitter
	 */
	getEvents(): EventEmitter;

	/**
	 * Get the wrapped user object from the client.
	 * @return The user object of the client
	 */
	getUser(): IUser

	/**
	 * Get the servers the client is on.
	 * @return The servers of the client
	 */
	getServers(): IServer[]

	/**
	 * Registers a new event which can be accessed later.
	 * @param name - The name of the event
	 */
	registerEvent(name: string): void;
}