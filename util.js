const getRandomNumber = ([min, max]) => Math.floor(Math.random() * (max - min + 1)) + min;


const toTitleCase = string => string.split(' ').map(word => `${word[0].toUpperCase()}${word.substr(1).toLowerCase()}`).join(' ');


const getRandomParagraph = range => {
	const sentenceCount = getRandomNumber(range);

	return new Array(sentenceCount).fill().reduce((paragraph, _, key) => {
		if(key === 0) {
			return getRandomSentence(range);
		} else {
			return `${paragraph} ${getRandomSentence(range)}`;
		}
	}, '');
};

const getRandomSentence = range => {
	const wordCount = getRandomNumber(range);

	return new Array(wordCount).fill().reduce((sentence, _, key) => {
		if(key === 0) {
			return toTitleCase(getRandomWord(range));
		} else if(key === wordCount - 1) {
			return `${sentence} ${getRandomWord(range)}.`;
		} else {
			return `${sentence} ${getRandomWord(range)}`;
		}
	}, '');
};

const getRandomName = (nameCount, range) => {
	return new Array(nameCount).fill().map(_ => toTitleCase(getRandomWord(range))).join(' ');
};

const getRandomWord = range => {
	const consonants = 'bcdfghjlmnpqrstvwxyz';
	const vowels = 'aeiou';

	const wordLength = getRandomNumber(range);

	return new Array(wordLength).fill().map((_, key) => {
		if(key % 2 === 0) {
			return consonants[getRandomNumber([0, consonants.length])];
		} else {
			return vowels[getRandomNumber([0, vowels.length])];
		}
	}).join('');
};