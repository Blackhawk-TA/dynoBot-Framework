import {IServer} from "./IServer";
import {IUser} from "./IUser";
import {IVoiceConnection} from "./IVoiceConnection";

export interface IVoiceChannel {
	/**
	 * Whether the channel is deletable
	 * @return True if the channel is deletable, else false
	 */
	isDeletable(): boolean;

	/**
	 * Whether the channel has been deleted
	 * @return True if the channel was deleted, else false
	 */
	wasDeleted(): boolean;

	/**
	 * Whether the channel is full
	 * @return True if the channel is full, else false
	 */
	isFull(): boolean;

	/**
	 * Get the server the channel is located on
	 * @return The server the channel is on
	 */
	getServer(): IServer;

	/**
	 * The id of the channel
	 * @return The id of the channel
	 */
	getId(): number;

	/**
	 * Whether the client can join the channel
	 * @return True if the client can join the channel, else false
	 */
	canJoin(): boolean;

	/**
	 * Get the members in the voice channel
	 * @return The members in the voice channel
	 */
	getMembers(): IUser[];

	/**
	 * Get the name of the voice channel
	 */
	getName(): boolean;

	/**
	 * The maximum amount of users allowed in this channel - 0 means unlimited.
	 * @return The max. amount of users allowed
	 */
	getUserLimit(): number;

	/**
	 * Joins the voice channel
	 */
	join(): Promise<IVoiceConnection>;

	/**
	 * Leaves the voice channel
	 */
	leave(): void;
}
