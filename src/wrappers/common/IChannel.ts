import {IServer} from "./IServer";

export interface IChannel {
	/**
	 * Send a message to the channel
	 * @param {string} msg - The message to send
	 */
	send(msg: string): void; //TODO allow more than a string as msg

	/**
	 * Get the channel id
	 * @return {number} - The channel id
	 */
	getId(): number;

	/**
	 * Get the channel name
	 * @return {string} - The channel name
	 */
	getName(): string;

	/**
	 * Get the server the channel is existing on
	 * @return {IServer} - The server of the channel
	 */
	getServer(): IServer;
}