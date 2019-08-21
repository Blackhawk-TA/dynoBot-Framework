const request = require("request");

export class SlackApiHandler {
	private readonly _token: string;

	constructor(token: string) {
		this._token = token;
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