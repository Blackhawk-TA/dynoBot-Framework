const request = require("request");

class ApiHandler {
	static callMethod(method: string, param: object): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			const data: object = {
				url: "https://slack.com/api/" + method,
				form: param
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