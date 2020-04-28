import {DiscordTextChannel} from "../discord/DiscordTextChannel";
import {IServer} from "./IServer";
import {IVoiceChannel} from "./IVoiceChannel";

export interface IUser {
	/**
	 * Get the id of the user.
	 * @return The user id
	 */
	getId(): number;

	/**
	 * Get the name of the user.
	 * @return The username
	 */
	getName(): string;

	/**
	 * Gets the tag of the user which makes it identifiable on a server.
	 * @return The user tag
	 */
	getTag(): string;

	/**
	 * Gets the server the user is acting on.
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
	 * @return The channel for private messages
	 */
	createDM(): Promise<DiscordTextChannel>;

	/**
	 * Deletes a private message channel.
	 * @return The channel which has been deleted
	 */
	deleteDM(): Promise<DiscordTextChannel>;
}
