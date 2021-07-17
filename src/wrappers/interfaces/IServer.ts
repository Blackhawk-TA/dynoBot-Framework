import {IUser} from "./IUser";
import {ITextChannel} from "./ITextChannel";
import {IRole} from "./IRole";
import {IVoiceChannel} from "./IVoiceChannel";

export interface IServer {
	/**
	 * Get the id of the server.
	 * @return The server id
	 */
	getId(): number;

	/**
	 * Get the name of the server.
	 * @return The server name
	 */
	getName(): string;

	/**
	 * Get the members of the server which are online.
	 * @deprecated Will be removed in v1.5.0.
	 * @return The members of the server
	 */
	getMembers(): IUser[];

	/**
	 * Get a member by its ID
	 * @param id
	 */
	getMemberById(id: string): Promise<IUser>;

	/**
	 * Get the members of the server which are online.
	 * @return The members of the server
	 */
	getOnlineMembers(): IUser[];

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
	 * @return The voice channels of the server
	 */
	getVoiceChannels(): IVoiceChannel[];

	/**
	 * Gets the voice channel by its id
	 * @param channelId - The channel id which shall be returned
	 * @return The voice channel
	 */
	getVoiceChannel(channelId: string): IVoiceChannel;

	/**
	 * Checks if the given channel exists on the server
	 * @param channelId - The channel id which shall be looked for
	 * @return True if the voice channel exists, else false
	 */
	hasVoiceChannel(channelId: string): boolean;

	/**
	 * Get the roles of the server.
	 * @return The roles of the server
	 */
	getRoles(): IRole[];
}
