;(function(global, factory) {
	if(typeof exports === 'object' && typeof module !== 'undefined') {
		module.exports = factory();
	} else {
		if(typeof define === 'function' && define.amd) {
			define(factory);
		} else {
			global.schemaMock = factory();
		}
	}
}(this, function() {
	const getRandomNumber = ([min, max]) => Math.floor(Math.random() * (max - min + 1)) + min;

	const toTitleCase = string => string.split(' ').map(word => `${word[0].toUpperCase()}${word.substr(1).toLowerCase()}`).join(' ');

	const getRandomCustomInteger = string => {
		let [minValue, maxValue] = string.split('_')[2].split('-');

		if(!isNaN(minValue) && !isNaN(maxValue)) {
			return getRandomNumber([parseInt(minValue), parseInt(maxValue)]);
		} else {
			throw new Error('Type `CUSTOM_NUMBER` must be preceded by a range of two numbers separated by dash.');
		}
	};

	const getRandomInteger = () => getRandomNumber([0, Number.MAX_SAFE_INTEGER]);

	const getRandomPhoneNumber = ({numbersInPhoneNumber}) => {
		const numbersCount = getRandomNumber(numbersInPhoneNumber);

		return new Array(numbersCount).fill().reduce(phoneNumber => phoneNumber + getRandomNumber([0, 9]), '');
	};

	const getRandomBoolean = () => Math.random() > 0.5;

	const getRandomDate = () => {
		const maxDate = Date.now();

		return new Date(getRandomNumber([-maxDate, maxDate]));
	};

	const getRandomParagraph = config => {
		const sentencesCount = getRandomNumber(config.sentencesInParagraph);

		return new Array(sentencesCount).fill().reduce((paragraph, _, key) => {
			if(key === 0) {
				return getRandomSentence(config);
			} else {
				return `${paragraph} ${getRandomSentence(config)}`;
			}
		}, '');
	};

	const getRandomSentence = config => {
		const wordsCount = getRandomNumber(config.wordsInSentence);

		return new Array(wordsCount).fill().reduce((sentence, _, key) => {
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

		return new Array(namesCount).fill().map(_ => toTitleCase(getRandomWord(config))).join(' ');
	};

	const getRandomWord = ({lettersInWord}) => {
		const consonants = 'bcdfghjlmnpqrstvwxyz';
		const vowels = 'aeiou';

		const wordLength = getRandomNumber(lettersInWord);

		return new Array(wordLength).fill().reduce((word, _, key) => {
			if(key % 2 === 0) {
				return word + consonants[getRandomNumber([0, consonants.length])];
			} else {
				return word + vowels[getRandomNumber([0, vowels.length])];
			}
		}, '');
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
	}

	const dispatcher = (property, config) => {
		if(property === null) {
			return null;
		} else if(typeof property === 'string') {
			return setValue(property, config);
		} else if(Array.isArray(property)) {
			return new Array(getRandomNumber(config.itemsInList)).fill().map(_ => dispatcher(property[0], config));
		} else if(typeof property === 'object') {
			return Object.entries(property).reduce((total, [key, value]) => ({
				...total,
				[key]: dispatcher(value, config)
			}), {});
		} else {
			throw new Error(`'${property}' is not allowed as value.`);
		}
	};

	let defaultConfig = {
		itemsInList: [3, 8],
		numbersInPhoneNumber: [10, 13],
		sentencesInParagraph: [3, 6],
		wordsInSentence: [5, 10],
		wordsInName: [2, 4],
		lettersInWord: [4, 8]
	};

	return (model, config = {}) => {
		if(typeof model === 'object') {
			return dispatcher(model, {...defaultConfig, ...config});
		} else {
			throw new Error(`Expected object, received '${typeof model}'`);
		}
	};	
}));