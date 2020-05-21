import {IUser} from "./IUser";
import {IRole} from "./IRole";
import {IServer} from "./IServer";
import {ITextChannel} from "./ITextChannel";

export interface IMessage {
	/**
	 * Gets the channel the message was sent in.
	 * @supported Discord, Slack
	 * @return The wrapped channel object
	 */
	getTextChannel(): ITextChannel;

	/**
	 * Gets the content of the message.
	 * @supported Discord, Slack
	 * @param [excludeFirstWord] - Excludes the first word of the content if set to true
	 * @return The message content
	 */
	getContent(excludeFirstWord?: boolean): string;

	/**
	 * Gets the content of the message as an array.
	 * @supported Discord, Slack
	 * @param [excludeFirstWord] - Excludes the first word of the content array if set to true
	 * @return The message split into an array
	 */
	getContentArray(excludeFirstWord?: boolean): string[];

	/**
	 * Gets the regex groups of a message
	 * @supported Discord, Slack
	 * @param regexPattern - The pattern which shall be applied on the message.
	 */
	getRegexGroups(regexPattern: RegExp): string[];

	/**
	 * Gets the author of the message
	 * @supported Discord, Slack
	 * @return The author of the message
	 */
	getAuthor(): IUser;

	/**
	 * Gets the roles of the author
	 * @supported Discord
	 * @return The roles of the author
	 */
	getAuthorRoles(): IRole[];

	/**
	 * Checks whether the message was sent on a server
	 * @supported Discord, Slack
	 * @return True if the message was sent on a server, else false
	 */
	hasServer(): boolean;

	/**
	 * Gets the server the message was sent on, not every message has was sent on a server.
	 * @supported Discord
	 * @return The server the message was sent on
	 */
	getServer(): IServer;

	/**
	 * Check if a user was mentioned within the message.
	 * @supported Discord, Slack
	 * @param User - The user to check for mentions
	 * @return True if the user was mentioned, else false
	 */
	isMentioned(User: IUser): boolean;

	/**
	 * Check if the message is deletable by the user.
	 * @supported Discord
	 * @return True if the message is deletable
	 */
	isDeletable(): boolean;

	/**
	 * Deletes the message.
	 * @supported Discord, Slack
	 * @return The deleted message or an error message if the deletion was not possible
	 */
	delete(): Promise<IMessage|Error>;

	/**
	 * The date on which the message was created at.
	 * @supported Discord, Slack
	 * @return The date the message was created at
	 */
	getCreationDate(): Date;
}
