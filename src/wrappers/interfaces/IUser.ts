import {IServer} from "./IServer";
import {IChannel} from "./IChannel";

export interface IUser {
	/**
	 * Gets the id of the user.
	 * @return The user id
	 */
	getId(): string;

	/**
	 * Gets the name of the user.
	 * @return The username
	 */
	getName(): string;

	/**
	 * Gets the tag of the user which makes it identifiable on a server
	 * @supported Discord only
	 * @return The user tag
	 */
	getTag(): string;

	/**
	 * Gets the server the user is acting on.
	 * @supported Discord only
	 * @return The server object, null when the user is not acting on a server
	 */
	getServer(): IServer;

	/**
	 * Creates a private message channel.
	 * @return The channel for private messages
	 */
	createDM(): Promise<IChannel>;

	/**
	 * Deletes a private message channel.
	 * @return The channel which has been deleted
	 */
	deleteDM(): Promise<IChannel>;
}
