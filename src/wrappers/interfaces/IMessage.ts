import {IUser} from "./IUser";
import {IRole} from "./IRole";
import {IServer} from "./IServer";

export interface IMessage {
	_message: any;

	/**
	 * Get the content of the message
	 * @return The message content
	 */
	getContent(): string;

	/**
	 * Get the content of the message as an array
	 * @return The message split into an array
	 */
	getContentArray(): string[];

	/**
	 * Get the regex groups of a message
	 * @param regexPattern - The pattern which shall be applied on the message
	 */
	getRegexGroups(regexPattern: RegExp): string[];

	/**
	 * Get the author of the message
	 * @return The author of the message
	 */
	getAuthor(): IUser;

	/**
	 * Get the roles of the author
	 * @return The roles of the author
	 */
	getAuthorRoles(): IRole[];

	/**
	 * Get the server the message was sent on
	 * @return The server the message was sent on
	 */
	getServer(): IServer;

	/**
	 * Check if a user was mentioned within the message
	 * @param User - The user to check for mentions
	 * @return True if the user was mentioned, else false
	 */
	isMentioned(User: IUser): boolean;

	/**
	 * Check if the message is deletable by the user
	 * @return True if the message is deletable
	 */
	isDeletable(): boolean;

	/**
	 * Deletes the message
	 * @return The deleted message or an error message if the deletion was not possible
	 */
	delete(): Promise<IMessage|Error>;

	/**
	 * The date on which the message was created at
	 * @return The date the message was created at
	 */
	getCreationDate(): Date;
}