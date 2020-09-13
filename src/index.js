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
const __TYPES__ = require('./__types__');
const DEFAULT_CONFIG = require('./default-config');

const getValue = ({type, config, itemIndex}) => {
	switch(type) {
		case __TYPES__.WORD:
			return getWord(config);
		case __TYPES__.NAME:
			return getName(config);
		case __TYPES__.FULL_NAME:
			return getFullName(config);
		case __TYPES__.SENTENCE:
			return getSentence(config);
		case __TYPES__.PARAGRAPH:
			return getParagraph(config);
		case __TYPES__.STRING:
			return getString(config);

		case __TYPES__.URL:
			return getUrl('http://');
		case __TYPES__.EMAIL:
			return getEmail();
		case __TYPES__.COLOR:
			return getColor();

		case __TYPES__.BOOLEAN:
			return getBoolean();
		case __TYPES__.DATE:
			return getDate();

		case __TYPES__.COUNTER:
			return getCounter(itemIndex, config);
		case __TYPES__.NUMBER:
			return getInteger();
		case __TYPES__.PHONE_NUMBER:
			return getPhoneNumber(config);

		default:
			if(type.startsWith(__TYPES__.CUSTOM_NUMBER)) {
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

	if(shouldPickOne) return type[getNumber([0, listLength - 1])];

	const isListOfSameType = isString(type[0]) && __TYPES__[type[0]] && listLength === 1;
	const arrayLength = (isListOfSameType || !isString(type[0])) ? length || getNumber(rest.range) : listLength;

	const list = getNewArray(arrayLength).map((_, index) => dispatcher({
		type: (isListOfSameType || !isString(type[0])) ? type[0] : type[index],
		itemIndex: index,
		config: {
			...rest,
			decorate: decorateEach
		}
	}));

	return isFunction(decorate) ? decorate(list) : list;	
}

const objectDispatcher = ({type, config, itemIndex}) => {
	if(type.hasOwnProperty("__type__")) {
		const {__type__, __config__ = {}} = type;

		return dispatcher({
			itemIndex,
			type: __type__,
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
