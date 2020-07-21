
export default class Request {
	constructor(method, token) {
		this.token = token;
		this.method = method;
		this.options = {
			method: `${this.method}`,
			withCredentials: true,
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': `Bearer ${this.token}`
			}
		};
		this.makeCall = this.makeCall.bind(this);
	}

	async makeCall(api, bodyArgs) {
		if (bodyArgs) {
			const str = JSON.stringify(bodyArgs);
			Object.assign(this.options, {body: str});
		}
		return fetch(api, this.options);
	} 
}
