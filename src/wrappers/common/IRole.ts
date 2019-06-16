export interface IRole {
	/**
	 * Get the role id
	 * @return {number} - The role id
	 */
	getId(): number;

	/**
	 * Get the role name
	 * @return {string} - The role name
	 */
	getName(): string;

	/**
	 * Get the role color
	 * @return {number} - The role color
	 */
	getColor(): number;

	/**
	 * Get the role permissions
	 * @return {number} - The role permissions
	 */
	getPermissions(): number;

}