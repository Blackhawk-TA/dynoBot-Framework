import {IUser} from "./IUser";
import {ITextChannel} from "./ITextChannel";
import {IRole} from "./IRole";
import {IVoiceChannel} from "./IVoiceChannel";

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
	 * Get the text channels of the server.
	 * @return The text channels of the server
	 */
	getTextChannels(): ITextChannel[];

	/**
	 * Gets the text channel by its id
	 * @param channelId - The channel id which shall be returned
	 * @return The text channel with the given id
	 */
	getTextChannel(channelId: string): ITextChannel;

	/**
	 * Checks if the given channel exists on the server
	 * @param channelId - The channel id which shall be looked for
	 * @return True if the text channel exists, else false
	 */
	hasTextChannel(channelId: string): boolean;

	/**
	 * Get the voice channels of the server.
	 * @supported Discord
	 * @return The voice channels of the server
	 */
	getVoiceChannels(): IVoiceChannel[];

	/**
	 * Gets the voice channel by its id
	 * @supported Discord
	 * @param channelId - The channel id which shall be returned
	 * @return The voice channel
	 */
	getVoiceChannel(channelId: string): IVoiceChannel;

	/**
	 * Checks if the given channel exists on the server
	 * @supported Discord
	 * @param channelId - The channel id which shall be looked for
	 * @return True if the voice channel exists, else false
	 */
	hasVoiceChannel(channelId: string): boolean;

	/**
	 * Gets the roles of the server.
	 * @supported Discord
	 * @return The roles of the server
	 */
	getRoles(): IRole[];
}
