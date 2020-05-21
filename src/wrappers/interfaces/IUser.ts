import {IServer} from "./IServer";
import {IVoiceChannel} from "./IVoiceChannel";

export interface IUser {
	/**
	 * Gets the id of the user.
	 * @supported Discord, Slack
	 * @return The user id
	 */
	getId(): string;

	/**
	 * Gets the name of the user.
	 * @supported Discord, Slack
	 * @return The username
	 */
	getName(): string;

	/**
	 * Gets the tag of the user which makes it identifiable on a server.
	 * @supported Discord
	 * @return The user tag
	 */
	getTag(): string;

	/**
	 * Gets the server the user is acting on.
	 * @supported Discord
	 * @return The server object, null when the user is not acting on a server
	 */
	getServer(): IServer;

	/**
	 * Gets the voice channel the user is active on.
	 * @return The voice channel on which the user is active on
	 */
	getVoiceChannel(): IVoiceChannel;

	/**
	 * Creates a private message channel.
	 * @supported Discord, Slack
	 * @return The channel for private messages
	 */
	createDM(): Promise<ITextChannel>;

	/**
	 * Deletes a private message channel.
	 * @supported Discord, Slack
	 * @return The channel which has been deleted
	 */
	deleteDM(): Promise<ITextChannel>;
}
