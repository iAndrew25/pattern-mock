;(function(global, factory) {
	if(typeof exports === 'object' && typeof module !== 'undefined') {
		module.exports = factory();
	} else {
		if(typeof define === 'function' && define.amd) {
			define(factory);
		} else {
			global.patternMock = factory();
		}
	}
}(this, function() {
	'use strict';

	const getNewArray = length => Array.from({length});

	const getRandomNumber = ([min, max]) => Math.floor(Math.random() * (max - min + 1)) + min;

	const toTitleCase = string => string.split(' ').map(word => word[0].toUpperCase() + word.substr(1).toLowerCase()).join(' ');

	const getRandomColor = () => {
		const letters = '0123456789ABCDEF';

		return getNewArray(6).reduce(total => total + letters[getRandomNumber([0, letters.length - 1])], '#');
	};

	const getRandomUrl = prefix => {
		return `${prefix || ''}${getRandomWord({lettersInWord: [3, 10]})}.${getRandomWord({lettersInWord: [2, 4]})}`;
	};

	const getRandomEmail = () => {
		return `${getRandomWord({lettersInWord: [2, 10]})}@${getRandomUrl()}`;
	};

	const getRandomCustomInteger = string => {
		let [minValue, maxValue] = string.split('_')[2].split('-');

		if(!isNaN(minValue) && !isNaN(maxValue)) {
			return getRandomNumber([parseInt(minValue), parseInt(maxValue)]);
		} else {
			throw new Error(`Expected 'CUSTOM_NUMBER_<MIN_NUMBER>-<MAX_NUMBER>', received '${string}'.`);
		}
	};

	const getRandomInteger = () => getRandomNumber([0, Number.MAX_SAFE_INTEGER]);

	const getRandomPhoneNumber = ({numbersInPhoneNumber}) => {
		const numbersCount = getRandomNumber(numbersInPhoneNumber);

		return getNewArray(numbersCount).reduce(phoneNumber => phoneNumber + getRandomNumber([0, 9]), '');
	};

	const getRandomBoolean = () => Math.random() > 0.5;

	const getRandomDate = () => {
		const maxDate = Date.now();

		return new Date(getRandomNumber([-maxDate, maxDate]));
	};

	const getRandomParagraph = config => {
		const sentencesCount = getRandomNumber(config.sentencesInParagraph);

		return getNewArray(sentencesCount).reduce((paragraph, _, key) => {
			if(key === 0) {
				return getRandomSentence(config);
			} else {
				return `${paragraph} ${getRandomSentence(config)}`;
			}
		}, '');
	};

	const getRandomSentence = config => {
		const wordsCount = getRandomNumber(config.wordsInSentence);

		return getNewArray(wordsCount).reduce((sentence, _, key) => {
			if(key === 0) {
				return toTitleCase(getRandomWord(config));
			} else if(key === wordsCount - 1) {
				return `${sentence} ${getRandomWord(config)}.`;
			} else {
				return `${sentence} ${getRandomWord(config)}`;
			}
		}, '');
	};

	const getRandomName = config => {
		const namesCount = getRandomNumber(config.wordsInName);

		return getNewArray(namesCount).map(_ => toTitleCase(getRandomWord(config))).join(' ');
	};

	const getRandomWord = ({lettersInWord}) => {
		const consonants = 'bcdfghjlmnpqrstvwxyz';
		const vowels = 'aeiou';

		const wordLength = getRandomNumber(lettersInWord);

		return getNewArray(wordLength).reduce((word, _, key) => {
			if(key % 2 === 0) {
				return word + consonants[getRandomNumber([0, consonants.length - 1])];
			} else {
				return word + vowels[getRandomNumber([0, vowels.length - 1])];
			}
		}, '');
	};

	const getRandomString = ({lettersInString}) => {
		const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		
		const stringLength = getRandomNumber(lettersInString);

		return getNewArray(stringLength).reduce(string => string + letters[getRandomNumber([0, letters.length - 1])], '');
	};

	const setValue = (type, config) => {
		switch(type) {
			case 'WORD':
				return getRandomWord(config);
			case 'NAME':
				return getRandomName(config);
			case 'SENTENCE':
				return getRandomSentence(config);
			case 'PARAGRAPH':
				return getRandomParagraph(config);
			case 'STRING':
				return getRandomString(config);

			case 'URL':
				return getRandomUrl('http://');
			case 'EMAIL':
				return getRandomEmail();
			case 'COLOR':
				return getRandomColor();

			case 'BOOLEAN':
				return getRandomBoolean();
			case 'DATE':
				return getRandomDate();

			case 'NUMBER':
				return getRandomInteger();
			case 'PHONE_NUMBER':
				return getRandomPhoneNumber(config);

			default:
				if(type.startsWith('CUSTOM_NUMBER')) {
					return getRandomCustomInteger(type);
				} else {
					throw new Error(`Type '${type}' is not recognized.`);
				}
		}
	};

	const dispatcher = (property, config) => {
		if(property === null) {
			return null;
		} else if(typeof property === 'string') {
			return setValue(property, config);
		} else if(Array.isArray(property)) {
			return getNewArray(getRandomNumber(property[1] || config.itemsInList)).map(_ => dispatcher(property[0], config));
		} else if(typeof property === 'object') {
			return Object.entries(property).reduce((total, [key, value]) => ({
				...total,
				[key]: dispatcher(value, config)
			}), {});
		} else {
			throw new Error(`'${property}' is not allowed as value.`);
		}
	};

	const DEFAULT_CONFIG = {
		itemsInList: [3, 8],
		numbersInPhoneNumber: [10, 13],
		sentencesInParagraph: [3, 6],
		wordsInSentence: [5, 10],
		wordsInName: [2, 4],
		lettersInWord: [4, 8],
		lettersInString: [5, 10]
	};

	return (pattern, config = {}) => {
		if(typeof pattern === 'object') {
			return dispatcher(pattern, {...DEFAULT_CONFIG, ...config});
		} else {
			throw new Error(`Expected object, received '${typeof pattern}'.`);
		}
	};	
}));