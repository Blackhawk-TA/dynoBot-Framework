import {IUser} from "../interfaces/IUser";
import {IChannel} from "../interfaces/IChannel";
import {IServer} from "../interfaces/IServer";
import {SlackApiHandler} from "./SlackApiHandler";
import {ErrorHandler} from "../../utils/ErrorHandler";
import {SlackChannel} from "./SlackChannel";

export class SlackUser implements IUser {
	private readonly _user: any;
	private readonly _ApiHandler: SlackApiHandler;

	constructor(user: any, ApiHandler: SlackApiHandler) {
		this._user = user;
		this._ApiHandler = ApiHandler;
	}

	createDM(): Promise<IChannel> {
		let param: object = {
			user: this._user.id,
			// eslint-disable-next-line camelcase
			return_im: true
		};

		return new Promise<IChannel>((resolve, reject) => {
			this._ApiHandler.callMethod("im.open", param).then(response => {
				if (response.ok) {
					resolve(new SlackChannel(response.channel));
				} else {
					reject(response);
				}
			}).catch(error => {
				reject(error);
			});
		});
	}

	deleteDM(): Promise<IChannel> {
		let param: object = {
		};

		return new Promise<IChannel>((resolve, reject) => {
			this._ApiHandler.callMethod("im.list", param).then(response => {
				if (response.ok) {
					response.ims.forEach(channel => {
						if (channel.user === this._user.id) {
							resolve(new SlackChannel(channel));
						}
					});
				} else {
					reject(response);
				}
			}).catch(error => {
				reject(error);
			});
		});
	}

	getId(): string {
		return this._user.id;
	}

	getName(): string {
		return this._user.real_name;
	}

	getServer(): IServer {
		ErrorHandler.log("This method is not supported by the slack api.");
		return null;
	}

	getTag(): string {
		ErrorHandler.log("This method is not supported by the slack api.");
		return null;
	}
}