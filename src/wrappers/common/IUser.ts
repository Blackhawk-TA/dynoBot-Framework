export interface IUser {
	/**
	 * Get the id of the user
	 * @return {number} - The user id
	 */
	getId(): number;

	/**
	 * Get the name of the user
	 * @return {string} - The username
	 */
	getName(): string;
}
