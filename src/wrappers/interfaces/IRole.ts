export interface IRole {
	/**
	 * Gets the role id.
	 * @return The role id
	 */
	getId(): number;

	/**
	 * Gets the role name.
	 * @return The role name
	 */
	getName(): string;

	/**
	 * Gets the role color.
	 * @return The role color
	 */
	getColor(): number;

	/**
	 * Gets the role permissions.
	 * @return The role permissions
	 */
	getPermissions(): number;

}