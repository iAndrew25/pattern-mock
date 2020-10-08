const {
	getNewArray,
	getNumber,
	getColor,
	getUrl,
	getEmail,
	getCustomInteger,
	getInteger,
	getPhoneNumber,
	getBoolean,
	getDate,
	getParagraph,
	getSentence,
	getFullName,
	getName,
	getWord,
	getString,
	getCounter
} = require('./generator');
const {isObject, isFunction, isString} = require('./utils');
const TYPES = require('./types');
const DEFAULT_CONFIG = require('./default-config');

const getValue = ({type, config, itemIndex}) => {
	switch(type) {
		case TYPES.WORD:
			return getWord(config);
		case TYPES.NAME:
			return getName(config);
		case TYPES.FULL_NAME:
			return getFullName(config);
		case TYPES.SENTENCE:
			return getSentence(config);
		case TYPES.PARAGRAPH:
			return getParagraph(config);
		case TYPES.STRING:
			return getString(config);

		case TYPES.URL:
			return getUrl('http://');
		case TYPES.EMAIL:
			return getEmail();
		case TYPES.COLOR:
			return getColor();

		case TYPES.BOOLEAN:
			return getBoolean();
		case TYPES.DATE:
			return getDate();

		case TYPES.COUNTER:
			return getCounter(itemIndex, config);
		case TYPES.NUMBER:
			return getInteger();
		case TYPES.PHONE_NUMBER:
			return getPhoneNumber(config);

		default:
			if(type.startsWith(TYPES.CUSTOM_NUMBER)) {
				return getCustomInteger(type);
			}

			return type;
	}
};

const stringDispatcher = ({type, config, itemIndex}) => {
	const {decorate} = config;
	const value = getValue({type, config, itemIndex});

	return isFunction(decorate) ? decorate(value) : value;	
}

const arrayDispatcher = ({type, config, itemIndex}) => {
	const {decorate, decorateEach, length, shouldPickOne, ...rest} = config;
	const listLength = type.length;
	const _config = {
		...rest,
		decorate: decorateEach
	}

	if(shouldPickOne) return dispatcher({
		itemIndex,
		config: _config,
		type: type[getNumber([0, listLength - 1])]
	});

	const isPattern = ((isString(type[0]) && TYPES[type[0]]) || isObject(type[0])) && listLength === 1;
	const arrayLength = isPattern ? length || getNumber(rest.range) : listLength;

	const list = getNewArray(arrayLength).map((_, index) => dispatcher({
		config: _config,
		itemIndex: index,
		type: (isPattern || (!isString(type[0])) && listLength === 1) ? type[0] : type[index]
	}));

	return isFunction(decorate) ? decorate(list) : list;
}

const objectDispatcher = ({type, config, itemIndex}) => {
	if(type.hasOwnProperty("__pattern__")) {
		const {__pattern__, __config__ = {}} = type;

		return dispatcher({
			itemIndex,
			type: __pattern__,
			config: {
				...config,
				...__config__
			}
		});
	} else {
		const {decorate, ...rest} = config;

		const object = Object.entries(type).reduce((total, [key, value]) => ({
			...total,
			[key]: dispatcher({
				itemIndex,
				type: value,
				config: rest
			})
		}), {});
		
		return isFunction(decorate) ? decorate(object) : object;
	}	
}

const dispatcher = ({type, config, itemIndex}) => {
	if(type === null) return null;
	
	if(isString(type)) return stringDispatcher({type, config, itemIndex});

	if(Array.isArray(type)) return arrayDispatcher({type, config, itemIndex});

	if(isObject(type)) return objectDispatcher({type, config, itemIndex});

	return type;
};

module.exports = (pattern, config = {}) => {
	if(isObject(pattern)) {
		return dispatcher({type: pattern, config: {...DEFAULT_CONFIG, ...config}});
	} else {
		throw new Error(`Expected object, received '${typeof pattern}'.`);
	}
};
