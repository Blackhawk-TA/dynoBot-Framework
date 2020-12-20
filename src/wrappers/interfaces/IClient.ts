import {IServer} from "./IServer";
import {IUser} from "./IUser";

export interface IClient {
	/**
	 * Get the wrapped user object from the client.
	 * @return The user object of the client
	 */
	getUser(): IUser;

	/**
	 * Get the servers the client is on.
	 * @return The servers of the client
	 */
	getServers(): IServer[];

	/**
	 * Sets the presence text of the client
	 * @return A promise with an error if it fails
	 */
	setPresence(text: string): Promise<void|Error>;
}
