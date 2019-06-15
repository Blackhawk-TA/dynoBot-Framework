import {IUser} from "./IUser";
import {IChannel} from "./IChannel";

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
	 * Get the channel the message was sent on
	 * @return {IChannel} - The channel the message was sent on
	 */
	getChannel(): IChannel;

	/**
	 * Check if a user was mentioned within the message
	 * @param User - The user to check for mentions
	 * @return {boolean} - True if the user was mentioned, else false
	 */
	isMentioned(User: IUser): boolean;
}