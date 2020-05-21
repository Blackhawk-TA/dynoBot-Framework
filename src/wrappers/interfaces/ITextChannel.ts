import {IServer} from "./IServer";
import {IMessage} from "./IMessage";

export interface ITextChannel {
	/**
	 * Send a message to the channel.
	 * @supported Discord, Slack
	 * @param [message] - The message to send
	 * @param [options] - Options for the message, can also be just a RichEmbed or Attachment
	 */
	send(message?: string, options?: any);

	/**
	 * Gets the channel id.
	 * @supported Discord, Slack
	 * @return The channel id
	 */
	getId(): string;

	/**
	 * Gets the channel name.
	 * @supported Discord, Slack
	 * @return The channel name
	 */
	getName(): string;

	/**
	 * Gets the server the channel is existing on.
	 * @supported Discord
	 * @return The server of the channel
	 */
	getServer(): IServer;

	/**
	 * Gets messages sent in the channel.
	 * @supported Discord, Slack
	 * @param amount - The amount of messages to get
	 * @return A promise which returns an array of the messages on resolve
	 */
	getMessages(amount: number): Promise<IMessage[]>;

	/**
	 * Delete every message in an array of messages.
	 * @supported Discord, Slack
	 * @param MessagesToDelete - The messages which shall be deleted
	 */
	deleteMessages(MessagesToDelete: IMessage[]): Promise<IMessage[]>;

	/**
	 * Resolves with a collection of messages that pass the specified filter.
	 * @supported Discord
	 * @param options - Optional options to pass to the internal collector
	 */
	awaitMessages(options?: object): Promise<IMessage[]>;
}
