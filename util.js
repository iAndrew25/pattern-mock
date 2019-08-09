const getRandomNumber = ([min, max]) => Math.floor(Math.random() * (max - min + 1)) + min;

const toTitleCase = string => string.split(' ').map(word => `${word[0].toUpperCase()}${word.substr(1).toLowerCase()}`).join(' ');

const getRandomCustomInteger = string => {
	let [minValue, maxValue] = string.split('_')[1].split('-');

	if(!isNaN(minValue) && !isNaN(maxValue)) {
		return getRandomNumber([minValue, maxValue]);
	} else {
		throw new Error('')
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