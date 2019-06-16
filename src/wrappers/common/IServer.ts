import {IUser} from "./IUser";
import {IChannel} from "./IChannel";
import {IRole} from "./IRole";

export interface IServer {
	/**
	 * Get the id of the server
	 * @return {number} - The server id
	 */
	getId(): number;

	/**
	 * Get the name of the server
	 * @return {string} - The server name
	 */
	getName(): string;

	/**
	 * Get the members of the server
	 * @return {IUser[]} - The members of the server
	 */
	getMembers(): IUser[];

	/**
	 * Get the channels of the server
	 * @return {IChannel[]} - The channels of the server
	 */
	getChannels(): IChannel[];

	/**
	 * Get the roles of the server
	 * @return {IRole[]} - The roles of the server
	 */
	getRoles(): IRole[];
}