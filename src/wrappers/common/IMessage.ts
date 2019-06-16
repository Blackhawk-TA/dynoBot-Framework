import {IUser} from "./IUser";
import {IChannel} from "./IChannel";
import {IRole} from "./IRole";
import {IServer} from "./IServer";

export interface IMessage {
	_message: any;

	/**
	 * Get the content of the message
	 * @return {string} - The message content
	 */
	getContent(): string;

	/**
	 * Get the content of the message as an array
	 * @return {string[]} - The message split into an array
	 */
	getContentArray(): string[];

	/**
	 * Get the regex groups of a message
	 * @param {string} regexPattern - The pattern which shall be applied on the message
	 */
	getRegexGroups(regexPattern: RegExp): string[];

	/**
	 * Get the author of the message
	 * @return {IUser} - The author of the message
	 */
	getAuthor(): IUser;

	/**
	 * Get the roles of the author
	 * @return {IRole[]} - The roles of the author
	 */
	getAuthorRoles(): IRole[];

	/**
	 * Get the channel the message was sent on
	 * @return {IChannel} - The channel the message was sent on
	 */
	getChannel(): IChannel;

	/**
	 * Get the server the message was sent on
	 * @return {IServer} - The server the message was sent on
	 */
	getServer(): IServer;

	/**
	 * Check if a user was mentioned within the message
	 * @param User - The user to check for mentions
	 * @return {boolean} - True if the user was mentioned, else false
	 */
	isMentioned(User: IUser): boolean;

	/**
	 * Check if the message is deletable by the user
	 * @return {boolean} - True if the message is deletable
	 */
	isDeletable(): boolean;

	/**
	 * Deletes the message
	 * @return {IMessage|Error} - The deleted message or an error message if the deletion was not possible
	 */
	delete(): Promise<IMessage|Error>;

	/**
	 * The date on which the message was created at
	 * @return {Date} - The date the message was created at
	 */
	getCreationDate(): Date;
}