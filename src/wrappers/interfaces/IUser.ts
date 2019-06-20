import {DiscordChannel} from "../discord/DiscordChannel";

export interface IUser {
	/**
	 * Get the id of the user
	 * @return The user id
	 */
	getId(): number;

	/**
	 * Get the name of the user
	 * @return The username
	 */
	getName(): string;

	/**
	 * Create a private message channel
	 * @return The channel for private messages
	 */
	createDM(): Promise<DiscordChannel>;

	/**
	 * Deletes a private message channel
	 * @return The channel which has been deleted
	 */
	deleteDM(): Promise<DiscordChannel>;
}
