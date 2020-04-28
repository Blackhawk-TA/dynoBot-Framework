import {IVoiceChannel} from "./IVoiceChannel";

export interface IVoiceConnection {
	/**
	 * Gets the voice channel the connection is active on
	 * @return The voice channel
	 */
	getVoiceChannel(): IVoiceChannel;

	/**
	 * Checks whether the client is currently speaking
	 * @return true if the client is speaking, else false
	 */
	isSpeaking(): boolean;

	/**
	 * Disconnects the voice connection
	 */
	disconnect(): void;

	/**
	 * Play the given resource
	 * @param resource The streaming resource, e.g. a link
	 */
	play(resource: string): void;

	/**
	 * Pauses the current audio stream
	 * @param silence Whether to play silence while paused to prevent audio glitches
	 */
	pause(silence?: boolean): void;

	/**
	 * Resume the current audio stream
	 */
	resume(): void;

	/**
	 * Handles the voice connection events
	 * @param name The name of the event
	 * @param listener The listener function that gets attached to the event
	 */
	onEvent(name: string, listener: (...args: any[]) => void): void
}
