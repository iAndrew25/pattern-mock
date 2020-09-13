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
const {isObject, isFunction} = require('./utils');
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

const dispatcher = ({type, config, itemIndex}) => {
	if(type === null) return null;
	
	const {decorate, decorateEach, length, range, pickOne} = config;

	if(typeof type === 'string') {
		const value = getValue({type, config, itemIndex});

		return isFunction(decorate) ? decorate(value) : value;
	}

	if(Array.isArray(type)) {
		const listLength = type.length;

		if(pickOne) {
			return type[getNumber([0, listLength - 1])]
		}

		const hasOneItem = listLength === 1;
		const isListOfSameType = __TYPES__[type[0]] && listLength === 1;
		const arrayLength = !isListOfSameType ? listLength : length || getNumber(range || config.itemsInList);

		const list = getNewArray(arrayLength).map((_, index) => {
			return dispatcher({
				type: isListOfSameType ? type[0] : type[index],
				itemIndex: index,
				config: {
					...config,
					decorate: decorateEach
				}
			});
		});

		return isFunction(decorate) ? decorate(list) : list;
	}

	if(isObject(type)) {
		if(type.hasOwnProperty("__type__")) {
			return dispatcher({
				itemIndex,
				type: type.__type__,
				config: {
					...config,
					...(type.__config__ || {})
				},
			});
		} else {
			return Object.entries(type).reduce((total, [key, value]) => ({
				...total,
				[key]: dispatcher({
					config,
					itemIndex,
					type: value
				})
			}), {});
		}
	}

	return type;
};

module.exports = (pattern, config = {}) => {
	if(isObject(pattern)) {
		return dispatcher({type: pattern, config: {...DEFAULT_CONFIG, ...config}});
	} else {
		throw new Error(`Expected object, received '${typeof pattern}'.`);
	}
};
