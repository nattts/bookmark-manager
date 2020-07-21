const { InvalidInputError } = require ('../error');

class ControllerBase {
	validate(...args) {
		let valid = args.every(arg => !!arg && arg !== "undefined");
		if (!valid) throw new InvalidInputError('args not valid');
		return true;
	}
}

module.exports = { ControllerBase };