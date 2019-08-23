import {ErrorHandler} from "../../../utils/ErrorHandler";

const request = require("request");

export class SlackApiHandler {
	private _apiConnection: any;
	private readonly _token: string;
	//TODO check what happens on several servers with pre-called methods
	private readonly _bufferedMethods: object = {
		"channels.list": {
			returnValue: {},
			updateEvents: ["channels_created", "channels_deleted"]
		},
		"users.list": {
			returnValue: {},
			updateEvents: ["channel_join", "channels_leave", "channels_kick"]
		}
	};

	constructor(token: string) {
		this._token = token;

		for (let methodName in this._bufferedMethods) {
			if (this._bufferedMethods.hasOwnProperty(methodName)) {
				this.preCallMethod(methodName);
			}
		}
	}

	setApiConnection(value: any) {
		this._apiConnection = value;
	}

	callMethod(method: string, param: object = {}): Promise<any> {
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

	//Pre-call method to prevent the usage of promises for the framework methods
	preCallMethod(name: string): void {
		this.callMethod(name).then(response => {
			this._bufferedMethods[name].returnValue = response;
		}).catch(error => {
			ErrorHandler.throwErrorMessage("There was a problem calling a Slack API method: " + error);
		});
	}

	getPreCalledMethod(name: string) {
		if (this._bufferedMethods.hasOwnProperty(name)) {
			return this._bufferedMethods[name].returnValue;
		} else {
			ErrorHandler.throwErrorMessage(`The method ${name} is not supported. Please add it to the bufferedMethods list.`);
		}
	}

	updatePreCalledMethods(eventType: string) {
		for (let methodName in this._bufferedMethods) {
			if (this._bufferedMethods.hasOwnProperty(methodName)) {
				let updateEvents = this._bufferedMethods[methodName].updateEvents;
				updateEvents.forEach(event => {
					if (event === eventType) {
						this.preCallMethod(methodName);
					}
				});
			}
		}
	}
}