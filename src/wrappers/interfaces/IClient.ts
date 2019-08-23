import {IServer} from "./IServer";
import {IUser} from "./IUser";

export interface IClient {
	/**
	 * Gets the wrapped user object from the client.
	 * @supported Discord, Slack
	 * @return The user object of the client
	 */
	getUser(): IUser

	/**
	 * Gets the servers the client is on.
	 * @supported Discord, Slack
	 * @return The servers of the client
	 */
	getServers(): IServer[]
}