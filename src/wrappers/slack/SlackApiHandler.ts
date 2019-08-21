import {ErrorHandler} from "../../utils/ErrorHandler";

const request = require("request");

export class SlackApiHandler {
	private readonly _token: string;
	private readonly _bufferedMethods: object = {
		"channels.list": {
			returnValue: {},
			updateEvents: ["channel_created", "channel_deleted"] //TODO update channels list value on these events
		}
	};

	constructor(token: string) {
		this._token = token;
		this.preCallMethods();
	}

	getPreCalledMethod(name: string) {
		if (this._bufferedMethods.hasOwnProperty(name)) {
			return this._bufferedMethods[name].returnValue;
		} else {
			ErrorHandler.throwErrorMessage(`The method ${name} is not supported. Please add it to the bufferedMethods list.`);
		}
	}

	//Pre-call methods to prevent the usage of promises for the framework methods
	preCallMethods(): void {
		for (let methodName in this._bufferedMethods) {
			if (this._bufferedMethods.hasOwnProperty(methodName)) {
				this.callMethod(methodName, {}).then(response => {
					this._bufferedMethods[methodName].returnValue = response;
				}).catch(error => {
					ErrorHandler.throwErrorMessage("There was a problem calling a Slack API method: " + error);
				});
			}
		}
	}

	callMethod(method: string, param: object): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			const data: object = {
				url: "https://slack.com/api/" + method,
				form: Object.assign({token: this._token}, param)
			};
			request.post(data, (err, req, body) => {
				if (err) {
					reject(err);
				} else {
					try {
						let response: object = JSON.parse(body);
						resolve(response);
					} catch (error) {
						reject(error);
					}
				}
			});
		});
	}
}