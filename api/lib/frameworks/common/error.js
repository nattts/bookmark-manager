class OperationalError extends Error {
	constructor(statusCode, message, description) {
		super();
		this.statusCode = statusCode;
		this.errorName = 'OperationError';
		this.message = message;
		this.description = description;
		this.stack = `${new Error().stack}`;
	}
}

class InvalidInputError extends Error {
	constructor(message) {
		super();
		this.errorName = 'InvalidInputError';
		this.message = message;
		this.stack = `${new Error().stack}`;
	}
}

class DBServiceError extends Error {
	constructor(message) {
		super();
		this.errorName = 'DBServiceError';
		this.message = message;
		this.stack = `${new Error().stack}`;
	}
}

class ServiceError extends Error {
	constructor(message) {
		super();
		this.errorName = 'SeviceError';
		this.message = message;
		this.stack = `${new Error().stack}`;
	}
}

const handleError = (err, req, res, next) => {
	if (err.name === 'UnauthorizedError') {
		console.log(err)
		return res.status(401).send(err.name);
	}
	console.log(err);
	return res.status(500).send({ status: 500, message: 'Something went wrong' });
};

module.exports = {
	handleError,
	ServiceError,
	DBServiceError,
	InvalidInputError,
	OperationalError
};