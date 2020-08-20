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
	
	/* UTIL */

	const isObject = value => value && typeof value === 'object';

	const getNewArray = length => Array.from({length});

	const getRandomNumber = ([min, max]) => Math.floor(Math.random() * (max - min + 1)) + min;

	const toTitleCase = string => string.split(' ').map(word => word[0].toUpperCase() + word.substr(1).toLowerCase()).join(' ');

	/* GET RANDOM */

	/* Returns a random HEX COLOR
	 *
	 * getRandomColor() // #4BAAE6
	 * getRandomColor() // #991413
	 *
	 */
	const getRandomColor = () => {
		const letters = '0123456789ABCDEF';

		return getNewArray(6).reduce(total => total + letters[getRandomNumber([0, letters.length - 1])], '#');
	};

	/* Returns a random URL
	 *
	 * getRandomUrl() // http://puzux.jehe
	 * getRandomUrl('ftp://') // ftp://hefutac.pep
	 *
	 */
	const getRandomUrl = prefix => {
		return `${prefix || ''}${getRandomWord({lettersInWord: [3, 10]})}.${getRandomWord({lettersInWord: [2, 4]})}`;
	};

	/* Returns a random EMAIL
	 *
	 * getRandomEmail() // marujava@mecof.re
	 * getRandomEmail() // toz@yaqigaza.zo
	 *
	 */
	const getRandomEmail = () => {
		return `${getRandomWord({lettersInWord: [2, 10]})}@${getRandomUrl()}`;
	};

	/* Returns a random CUSTOM INTEGER
	 *
	 * getRandomCustomInteger('CUSTOM_NUMBER_40-99') // 42
	 * getRandomCustomInteger('CUSTOM_NUMBER_97-99') // 98
	 *
	 */
	const getRandomCustomInteger = string => {
		let [minValue, maxValue] = string.split('_')[2].split('-');

		if(!isNaN(minValue) && !isNaN(maxValue)) {
			return getRandomNumber([parseInt(minValue), parseInt(maxValue)]);
		} else {
			throw new Error(`Expected 'CUSTOM_NUMBER_<MIN_NUMBER>-<MAX_NUMBER>', received '${string}'.`);
		}
	};

	/* Returns a random INTEGER
	 *
	 * getRandomCustomInteger('CUSTOM_NUMBER_40-99') // 4882551048005688
	 * getRandomCustomInteger('CUSTOM_NUMBER_97-99') // 1859774071706282
	 *
	 */
	const getRandomInteger = () => getRandomNumber([0, Number.MAX_SAFE_INTEGER]);

	/* Returns a random PHONE NUMBER
	 *
	 * getRandomPhoneNumber() // 7877 37 77 56
	 * getRandomPhoneNumber() // 2624 87 26 68
	 *
	 */
	const getRandomPhoneNumber = ({numbersInPhoneNumber, spaceIndexInPhoneNumber}) => {
		const numbersCount = getRandomNumber(numbersInPhoneNumber);

		return getNewArray(numbersCount).reduce((phoneNumber, _, index) => {
			return `${phoneNumber}${spaceIndexInPhoneNumber.includes(index) ? ' ' : ''}${getRandomNumber([0, 9])}`
		}, '');
	};

	/* Returns a random BOOLEAN
	 *
	 * getRandomBoolean() // true
	 * getRandomBoolean() // false
	 *
	 */
	const getRandomBoolean = () => Math.random() > 0.5;

	/* Returns a random DATE
	 *
	 * getRandomDate() // 2008-03-01T00:28:30.442Z
	 * getRandomDate() // 2017-02-03T10:05:52.641Z
	 *
	 */
	const getRandomDate = () => {
		const maxDate = Date.now();

		return new Date(getRandomNumber([-maxDate, maxDate]));
	};

	/* Returns a random PARAGRAPH
	 *
	 * getRandomParagraph() // Vezefem piwagi mirunef gozijo bojiw weposi. Qajo jivof yuhid sejaxe yagi lavo wecumiqo vehoci fofuh. Ruwe vogaraw vafenepa zuqazi xoyejate cuhed.
	 * getRandomParagraph() // Xubolexe vaheh yujoyus gucecude diwogi gabomaq nevohexi. Hivahunu yeruciru ravoqa puzi laruhimu yisosoga. Yurilen lera simiru zitu loxi sojo fidavabi reperiq ponohovu.
	 *
	 */
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

	/* Returns a random SENTENCE
	 *
	 * getRandomSentence() // Yezaza pinumuca getig qahade lifub.
	 * getRandomSentence() // Xinalu dadele fiqi zadasud pedodoci hihadin lodogewo gatozu.
	 *
	 */
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

	/* Returns a random FULL NAME
	 *
	 * getRandomFullName() // Lejilaru Vuqo Joxato Doxiwe
	 * getRandomFullName() // Nive Bajago
	 *
	 */
	const getRandomFullName = config => {
		const namesCount = getRandomNumber(config.wordsInFullName);

		return getNewArray(namesCount).map(_ => getRandomName(config)).join(' ');
	};

	/* Returns a random NAME
	 *
	 * getRandomName() // Pawocet
	 * getRandomName() // Lubeba
	 *
	 */
	const getRandomName = config => {
		return toTitleCase(getRandomWord(config));
	};

	/* Returns a random WORD
	 *
	 * getRandomWord() // rosu
	 * getRandomWord() // rutazu
	 *
	 */
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

	/* Returns a random STRING
	 *
	 * getRandomString() // yGNMxpEjSE
	 * getRandomString() // hLEQLR
	 *
	 */
	const getRandomString = ({lettersInString}) => {
		const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		
		const stringLength = getRandomNumber(lettersInString);

		return getNewArray(stringLength).reduce(string => string + letters[getRandomNumber([0, letters.length - 1])], '');
	};

	/* Returns a random STRING
	 *
	 * getCounter(1) // 2
	 * getCounter(4) // 5
	 *
	 */
	const getCounter = (itemIndex, {counterStart}) => itemIndex + counterStart;

	const setValue = (type, config, itemIndex) => {
		switch(type) {
			case 'WORD':
				return getRandomWord(config);
			case 'NAME':
				return getRandomName(config);
			case 'FULL_NAME':
				return getRandomFullName(config);
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

			case 'COUNTER':
				return getCounter(itemIndex, config);
			case 'NUMBER':
				return getRandomInteger();
			case 'PHONE_NUMBER':
				return getRandomPhoneNumber(config);

			default:
				if(type.startsWith('CUSTOM_NUMBER')) {
					return getRandomCustomInteger(type);
				}

				return type;
		}
	};

	const dispatcher = (type, config, itemIndex) => {
		if(type === null) return null;

		if(typeof type === 'string') return setValue(type, config, itemIndex);

		if(Array.isArray(type)) {
			const {length, minLength = 1, maxLength} = type[1] || {};
			const arrayLength = length ? length : maxLength ? getRandomNumber([minLength, maxLength]) : config.itemsInList;

			return getNewArray(arrayLength).map((_, index) => dispatcher(type[0], config, index));
		}

		if(isObject(type)) {
			return Object.entries(type).reduce((total, [key, value]) => ({
				...total,
				[key]: dispatcher(value, config, itemIndex)
			}), {});
		}
		
		return type;
	};

	const DEFAULT_CONFIG = {
		itemsInList: [3, 8],
		numbersInPhoneNumber: [10, 10],
		sentencesInParagraph: [3, 6],
		wordsInSentence: [5, 10],
		wordsInFullName: [2, 4],
		lettersInWord: [4, 8],
		lettersInString: [5, 10],
		spaceIndexInPhoneNumber: [4, 6, 8],
		counterStart: 0
	};

	return (pattern, config = {}) => {
		if(isObject(pattern)) {
			return dispatcher(pattern, {...DEFAULT_CONFIG, ...config});
		} else {
			throw new Error(`Expected object, received '${typeof pattern}'.`);
		}
	};	
}));