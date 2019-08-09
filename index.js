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
				throw new Error('');
			}
	}
}

const dispatcher = (property, config) => {
	if(property === null) {
		return null;
	} else if(typeof property === 'string') {
		return setValue(property);
	} else if(Array.isArray(property)) {
		return new Array(getRandomNumber(config.itemsInList)).fill().map(_ => dispatcher(property[0], config));
	} else if(typeof property === 'object') {
		return Object.entries(property).reduce((total, [key, value]) => {
			return {
				...total,
				[key]: dispatcher(value, config)
			}
		}, {});
	} else {
		throw new Error(`'${property}' is not allowed as value.`);
	}
}

let defaultConfig = {
	itemsInList: [3, 8],
	numbersInPhoneNumber: [10, 13],
	sentencesInParagraph: [3, 6],
	wordsInSentence: [5, 10],
	wordsInName: [2, 4],
	lettersInWord: [4, 8]
};

const getMockData = (model, config = {}) => {
	if(isObject(model)) {
		return dispatcher(model, {...defaultConfig, ...config});
	} else {
		throw new Error(`Expected object, received '${typeof model}'`);
	}
};