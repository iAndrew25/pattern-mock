const getRandomNumber = ([min, max]) => Math.floor(Math.random() * (max - min + 1)) + min;

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
}