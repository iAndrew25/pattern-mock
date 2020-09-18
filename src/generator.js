const {toTitleCase} = require('./utils');

const getNewArray = length => Array.from({length});

/* Returns a random NUMBER
 *
 * getNumber([1,2]) // 2
 * getNumber([10, 20]) // 11
 *
 */ 
const getNumber = ([min, max]) => Math.floor(Math.random() * (max - min + 1)) + min;

/* Returns a random HEX COLOR
 *
 * getColor() // #4BAAE6
 * getColor() // #991413
 *
 */ 
const getColor = () => {
	const letters = '0123456789ABCDEF';

	return getNewArray(6).reduce(total => total + letters[getNumber([0, letters.length - 1])], '#');
};

/* Returns a random URL
 *
 * getUrl() // http://puzux.jehe
 * getUrl('ftp://') // ftp://hefutac.pep
 *
 */ 
const getUrl = prefix => {
	return `${prefix || ''}${getWord({lettersInWord: [3, 10]})}.${getWord({lettersInWord: [2, 4]})}`;
};

/* Returns a random EMAIL
 *
 * getEmail() // marujava@mecof.re
 * getEmail() // toz@yaqigaza.zo
 *
 */ 
const getEmail = () => {
	return `${getWord({lettersInWord: [2, 10]})}@${getUrl()}`;
};

/* Returns a random CUSTOM INTEGER
 *
 * getCustomInteger('CUSTOM_NUMBER_40-99') // 42
 * getCustomInteger('CUSTOM_NUMBER_97-99') // 98
 *
 */ 
const getCustomInteger = string => {
	let [minValue, maxValue] = string.split('_')[2].split('-');

	if(!isNaN(minValue) && !isNaN(maxValue)) {
		return getNumber([parseInt(minValue), parseInt(maxValue)]);
	} else {
		throw new Error(`Expected 'CUSTOM_NUMBER_<MIN_NUMBER>-<MAX_NUMBER>', received '${string}'.`);
	}
};

/* Returns a random INTEGER
 *
 * getInteger() // 4882551048005688
 * getInteger() // 1859774071706282
 *
 */
const getInteger = () => getNumber([0, Number.MAX_SAFE_INTEGER]);

/* Returns a random PHONE NUMBER
 *
 * getPhoneNumber() // 7877 37 77 56
 * getPhoneNumber() // 2624 87 26 68
 *
 */
const getPhoneNumber = ({numbersInPhoneNumber, spaceIndexInPhoneNumber}) => {
	const numbersCount = getNumber(numbersInPhoneNumber);

	return getNewArray(numbersCount).reduce((phoneNumber, _, index) => {
		return `${phoneNumber}${spaceIndexInPhoneNumber.includes(index) ? ' ' : ''}${getNumber([0, 9])}`
	}, '');
};

/* Returns a random BOOLEAN
 *
 * getBoolean() // true
 * getBoolean() // false
 *
 */
const getBoolean = () => Math.random() > 0.5;

/* Returns a random DATE
 *
 * getDate() // 2008-03-01T00:28:30.442Z
 * getDate() // 2017-02-03T10:05:52.641Z
 *
 */
const getDate = () => {
	const maxDate = Date.now();

	return new Date(getNumber([-maxDate, maxDate]));
};

/* Returns a random PARAGRAPH
 *
 * getParagraph() // Vezefem piwagi mirunef gozijo bojiw weposi. Qajo jivof yuhid sejaxe yagi lavo wecumiqo vehoci fofuh. Ruwe vogaraw vafenepa zuqazi xoyejate cuhed.
 * getParagraph() // Xubolexe vaheh yujoyus gucecude diwogi gabomaq nevohexi. Hivahunu yeruciru ravoqa puzi laruhimu yisosoga. Yurilen lera simiru zitu loxi sojo fidavabi reperiq ponohovu.
 *
 */
const getParagraph = config => {
	const sentencesCount = getNumber(config.sentencesInParagraph);

	return getNewArray(sentencesCount).reduce((paragraph, _, key) => {
		if(key === 0) {
			return getSentence(config);
		} else {
			return `${paragraph} ${getSentence(config)}`;
		}
	}, '');
};

/* Returns a random SENTENCE
 *
 * getSentence() // Yezaza pinumuca getig qahade lifub.
 * getSentence() // Xinalu dadele fiqi zadasud pedodoci hihadin lodogewo gatozu.
 *
 */
const getSentence = config => {
	const wordsCount = getNumber(config.wordsInSentence);

	return getNewArray(wordsCount).reduce((sentence, _, key) => {
		if(key === 0) {
			return toTitleCase(getWord(config));
		} else if(key === wordsCount - 1) {
			return `${sentence} ${getWord(config)}.`;
		} else {
			return `${sentence} ${getWord(config)}`;
		}
	}, '');
};

/* Returns a random FULL NAME
 *
 * getFullName() // Lejilaru Vuqo Joxato Doxiwe
 * getFullName() // Nive Bajago
 *
 */
const getFullName = config => {
	const namesCount = getNumber(config.wordsInFullName);

	return getNewArray(namesCount).map(_ => getName(config)).join(' ');
};

/* Returns a random NAME
 *
 * getName() // Pawocet
 * getName() // Lubeba
 *
 */
const getName = config => {
	return toTitleCase(getWord(config));
};

/* Returns a random WORD
 *
 * getWord() // rosu
 * getWord() // rutazu
 *
 */
const getWord = ({lettersInWord}) => {
	const consonants = 'bcdfghjlmnpqrstvwxyz';
	const vowels = 'aeiou';

	const wordLength = getNumber(lettersInWord);

	return getNewArray(wordLength).reduce((word, _, key) => {
		if(key % 2 === 0) {
			return word + consonants[getNumber([0, consonants.length - 1])];
		} else {
			return word + vowels[getNumber([0, vowels.length - 1])];
		}
	}, '');
};

/* Returns a random STRING
 *
 * getString() // yGNMxpEjSE
 * getString() // hLEQLR
 *
 */
const getString = ({lettersInString}) => {
	const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	
	const stringLength = getNumber(lettersInString);

	return getNewArray(stringLength).reduce(string => string + letters[getNumber([0, letters.length - 1])], '');
};

/* Returns an incremented COUNTER
 *
 * getCounter(1) // 2
 * getCounter(4) // 5
 *
 */
const getCounter = (itemIndex, {counterStart}) => (itemIndex || 0) + counterStart;

module.exports = {
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
};
