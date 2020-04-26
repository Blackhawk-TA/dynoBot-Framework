import {IServer} from "./IServer";
import {IUser} from "./IUser";

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
	 * Whether the channel is editable
	 * @return True if the channel is editable, else false
	 */
	isEditable(): boolean;

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
	isJoinable(): boolean;

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
	 * Creates an invite for the voice channel
	 * @param options Options for the invite
	 * @param options.temporary Whether members that joined via the invite should be automatically kicked after 24 hours if they have not yet received a role
	 * @param options.maxAge How long the invite should last (in seconds, 0 for forever)
	 * @param options.maxUses Maximum number of uses
	 * @param options.unique Create a unique invite, or use an existing one with similar settings
	 * @param options.reason Reason for creating this
	 */
	createInvite(options: {
		temporary?: boolean,
		maxAge?: number,
		maxUses?: number,
		unique?: boolean,
		reason?: string
	});

	/**
	 * Joins the voice channel
	 */
	join(): void;

	/**
	 * Leaves the voice channel
	 */
	leave(): void;

	/**
	 * Starts playing audio on the voice channel
	 */
	playAudio(): void;

	/**
	 * Stops playing audio on the voice channel
	 */
	stopAudio(): void;

	/**
	 * Pauses the audio
	 * @param silence Whether to play silence while paused to prevent audio glitches, default is false
	 */
	pauseAudio(silence?: boolean): void;

	/**
	 * Resumes the audio
	 */
	resumeAudio(): void;
}
