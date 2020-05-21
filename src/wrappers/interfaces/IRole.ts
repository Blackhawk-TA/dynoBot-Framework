export interface IRole {
	/**
	 * Gets the role id.
	 * @supported Discord
	 * @return The role id
	 */
	getId(): number;

	/**
	 * Gets the role name.
	 * @supported Discord
	 * @return The role name
	 */
	getName(): string;

	/**
	 * Gets the role color.
	 * @supported Discord
	 * @return The role color
	 */
	getColor(): number;

	/**
	 * Gets the role permissions.
	 * @supported Discord
	 * @return The role permissions
	 */
	getPermissions(): number;
}