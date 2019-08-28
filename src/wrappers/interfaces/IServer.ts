import {IUser} from "./IUser";
import {IChannel} from "./IChannel";
import {IRole} from "./IRole";

export interface IServer {
	/**
	 * Gets the id of the server.
	 * @supported Discord, Slack
	 * @return The server id
	 */
	getId(): string;

	/**
	 * Gets the name of the server.
	 * @supported Discord, Slack
	 * @return The server name
	 */
	getName(): string;

	/**
	 * Gets the members of the server.
	 * @supported Discord
	 * @return The members of the server
	 */
	getMembers(): IUser[];

	/**
	 * Gets the channels of the server.
	 * @supported Discord
	 * @return The channels of the server
	 */
	getChannels(): IChannel[];

	/**
	 * Checks if the given channel exists on the server
	 * @supported Discord
	 * @param channelId - The channel id which shall be looked for
	 * @return The channel if it exists, else false
	 */
	hasChannel(channelId: string): IChannel|boolean;

	/**
	 * Gets the roles of the server.
	 * @supported Discord
	 * @return The roles of the server
	 */
	getRoles(): IRole[];
}