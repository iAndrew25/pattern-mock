# Pattern mock
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/iAndy3/pattern-mock?label=Code%20size) ![GitHub](https://img.shields.io/github/license/iAndy3/pattern-mock?label=License) ![npm](https://img.shields.io/npm/v/pattern-mock?label=Stable%20version)

Generates mock data based on a specified object pattern.

### Installing
To use with node:
```
$ npm install pattern-mock
```

Then in the console:
```javascript
const patternMock = require('pattern-mock');
```

To use directly in the browser:
```
<script src="path/to/yourCopyOf/pattern-mock.js"></script>
```

## Syntax
```javascript
patternMock(pattern, config[)
```

### Parameters
* **pattern** - an object which specifies the structure of the result.
* **config** - a configuration object which sets ranges of numbers for generating random `itemsInList`, `numbersInPhoneNumber`, `sentencesInParagraph`, `wordsInSentence`, `wordsInName`, `lettersInWord`.
 
## API

### Supported types
* **WORD**
```javascript
patternMock({
	place: 'WORD'
}); 

// Object { place: "jezug" }
```
* **NAME**
```javascript
patternMock({
	name: 'NAME'
}); 

// Object { name: "Xolapu Moreni Rupuhixe" }
```
* **SENTENCE**
```javascript
patternMock({
	description: 'SENTENCE'
}); 

// Object { description: "Hivilonu jowux wogo zilaxexa hijo vocefe fuzar." }
```
* **PARAGRAPH**
```javascript
patternMock({
	article: 'PARAGRAPH'
});

// Object { article: "Hudehifu qatu hanel peboviw nepuxut miges vibocu zatipe retuq. Bihu safa juzu tufuho bojap rimapo hovuqasi faha vezu. Dicewama yivusuhu valuy qunowaci jixun. Xoyuvo befo rorer tudo qabac butap pezu tebawup cedow. Puvasar tote xeqer cuxeduzo wico zequrefi lirabad periniw. Jamopofe cucojuh menu cawete denipivu." }
```
* **BOOLEAN**
```javascript
patternMock({
	isOffline: 'BOOLEAN'
}); 

// Object { isOffline: true }
```
* **DATE**
```javascript
patternMock({
	meetingDate: 'DATE'
}); 

// Object { meetingDate: Date Tue Dec 03 1974 22:03:35 GMT+0200 (Eastern European Standard Time) }
```
* **NUMBER**
```javascript
patternMock({
	id: 'NUMBER'
}); 

// Object { id: 7111080744192283 }
```
* **PHONE_NUMBER**
```javascript
patternMock({
	phoneNumber: 'PHONE_NUMBER'
}); 

// Object { phoneNumber: "3346807899" }
```
* **CUSTOM_NUMBER_<MIN_NUMBER>-<MAX_NUMBER>**
```javascript
patternMock({
	magicNumber: 'CUSTOM_NUMBER_23-167'
}); 

// Object { magicNumber: 42 }
```

## Example of nested types

```javascript
const pattern = {
	id: 'NUMBER',
	name: 'NAME',
	description: 'SENTENCE',
	price: 'CUSTOM_NUMBER_10-30',
	expirationDate: 'DATE',
	ingredients: [{
		name: 'WORD',
		quantity: 'CUSTOM_NUMBER_5-13'
	}]
};

patternMock(pattern);
/*
{
	id: 677404510061448,
	name: 'Geqi Tacariwi Pitaheba Pala',
	description: 'Turar suvete wofah xuvome hofufi laboma nihigilu teqiz.',
	price: 23,
	expirationDate: '1958-04-23T02:48:28.493Z',
	ingredients: [{
		name: 'bigohu',
		quantity: 6
	}, {
		name: 'ceboxodi',
		quantity: 12
	}]
}
*/
```

## Authors
* **Andrew** - [iAndy3](https://github.com/iAndy3)

See also the list of [contributors](https://github.com/iAndy3/pattern-mock/graphs/contributors) who participated in this project.

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details