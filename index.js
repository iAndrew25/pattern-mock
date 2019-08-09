const setValue = (prop, config = {}) => {
	const {range = [2, 8]} = config;

	if(prop === null) {
		return null;
	} else if(isFunction(prop)) {
		switch(prop) {
			case Number:
				return 1234;
			case String:
				return 'Abcd';
			case Boolean:
				return true;
			default:
				return undefined;
		}
	} else if(isArray(prop)) {
		return new Array(getRandomNumber(range)).fill().map(_ => setValue(prop[0]));
	} else if(isObject(prop)) {
		return Object.entries(prop).reduce((total, [key, value]) => {
			return {
				...total,
				[key]: setValue(value)
			}
		}, {});
	} else {
		throw new Error(`'${prop}' is not allowed as value.`);
	}
}

const getMockData = (model, config) => {
	if(isObject(model)) {
		return setValue(model, config);
	} else {
		throw new Error(`Expected object, received '${typeof model}'`);
	}
}