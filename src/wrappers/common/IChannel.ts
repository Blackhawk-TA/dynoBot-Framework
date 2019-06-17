import {IServer} from "./IServer";
import {IMessage} from "./IMessage";

export interface IChannel {
	/**
	 * Send a message to the channel
	 * @param {string} [message] - The message to send
	 * @param {*} [options] - Options for the message, can also be just a RichEmbed or Attachment
	 */
	send(message?: string, options?: any);

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

	/**
	 * Get messages sent in the channel
	 * @param {number} amount - The amount of messages to get
	 * @return {Promise<IMessage[]>} A promise which returns an array of the messages on resolve
	 */
	getMessages(amount: number): Promise<IMessage[]>;

	/**
	 * Deletes the given amount of messages in the channel
	 * @param {number} amount - The amount of messages which shall be deleted
	 * @param {boolean} filter - A filter for the messages
	 */
	deleteMessages(amount: number, filter: boolean): Promise<IMessage[]>;

	/**
	 * Delete every message in an array of messages
	 * @param {IMessage[]} messages - The messages which shall be deleted
	 */
	deleteMessageArray(messages: IMessage[]): Promise<IMessage[]>;
}