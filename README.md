# Pattern mock · [![Build Status](https://travis-ci.org/iAndrew25/pattern-mock.svg?branch=master)](https://travis-ci.org/iAndrew25/pattern-mock) ![GitHub](https://img.shields.io/github/license/iAndrew25/pattern-mock?label=License) ![npm](https://img.shields.io/npm/v/pattern-mock?label=Stable%20version) ![npm](https://img.shields.io/npm/dt/pattern-mock?label=Downloads) 
Generates mock data based on a specified object pattern.

## Content

* [Installing](#Installing)
* [Downloading](#Downloading)
* [Syntax](#Syntax)
  * [Parameters](#Parameters)
* [API](#API)
  * [Supported types](#Supported-Types)
    * [WORD](#WORD)
    * [FULL_NAME](#FULL_NAME)
    * [NAME](#NAME)
    * [SENTENCE](#SENTENCE)
    * [PARAGRAPH](#PARAGRAPH)
    * [STRING](#STRING)
    * [URL](#URL)
    * [EMAIL](#EMAIL)
    * [COLOR](#COLOR)
    * [BOOLEAN](#BOOLEAN)
    * [DATE](#DATE)
    * [NUMBER](#NUMBER)
    * [COUNTER](#COUNTER)
    * [PHONE_NUMBER](#PHONE_NUMBER)
    * [CUSTOM_NUMBER_<MIN_NUMBER>-<MAX_NUMBER>](#CUSTOM_NUMBER_<MIN_NUMBER>-<MAX_NUMBER>)
  * [Nesting types](#Nesting-Types)
* [Authors](#Authors)
* [License](#License)

## Installing

You can install it using Node Package Manager (`npm`):

```
$ npm install --save-dev pattern-mock
```

Then in the console:
```javascript
const patternMock = require('pattern-mock');
```

## Downloading
The source is available for download on [GitHub](https://github.com/iAndrew25/pattern-mock/blob/master/dist).

```html
<script src="path/to/yourCopyOf/pattern-mock.js"></script>
```

Or the minified version:
```html
<script src="path/to/yourCopyOf/pattern-mock.min.js"></script>
```
## Syntax
```javascript
patternMock(pattern, config[);
```

### Parameters
* **pattern** - an object which specifies the structure of the result.
* **config** - a configuration object which sets configuration and ranges of numbers for generating random data:
	* `itemsInList` - default `[3, 8]`
	* `numbersInPhoneNumber` - default `[10, 10]`
	* `sentencesInParagraph` - default `[3, 6]`
	* `wordsInSentence` - default `[5, 10]`
	* `wordsInFullName` - default `[2, 4]`
	* `lettersInWord` - default `[4, 8]`
	* `lettersInString` - default `[5, 10]`
	* `spaceIndexInPhoneNumber` - default `[4, 6, 8]`
	* `counterStart` - default `0`

## API
### Supported types
#### WORD
```javascript
patternMock({
	place: 'WORD'
}); 

// { 
// 	place: "jezug" 
// }
```
#### FULL_NAME
```javascript
patternMock({
	name: 'FULL_NAME'
}); 

// { 
// 	name: "Xolapu Moreni Rupuhixe" 
// }
```
#### NAME
```javascript
patternMock({
	name: 'NAME'
}); 

// {
// 	name: "Dunaf" 
// }
```
#### SENTENCE
```javascript
patternMock({
	description: 'SENTENCE'
}); 

// {
// 	description: "Hivilonu jowux wogo zilaxexa hijo vocefe fuzar."
// }
```
#### PARAGRAPH
```javascript
patternMock({
	article: 'PARAGRAPH'
});

// {
// 	article: "Hudehifu qatu hanel peboviw nepuxut miges vibocu zatipe retuq. Bihu safa juzu tufuho bojap rimapo hovuqasi faha vezu. Dicewama yivusuhu valuy qunowaci jixun. Xoyuvo befo rorer tudo qabac butap pezu tebawup cedow. Puvasar tote xeqer cuxeduzo wico zequrefi lirabad periniw. Jamopofe cucojuh menu cawete denipivu."
// }
```
#### STRING
```javascript
patternMock({
	randomId: 'STRING'
});

// {
// 	randomId: "co5dd6bGs"
// }
```
#### URL
```javascript
patternMock({
	website: 'URL'
});

// {
// 	website: "http://zat.wa"
// }
```
#### EMAIL
```javascript
patternMock({
	email: 'EMAIL'
});

// {
// 	email: "zera@cuje.vi"
// }
```
#### COLOR
```javascript
patternMock({
	color: 'COLOR'
});

// {
// 	color: "#747978"
// }
```
#### BOOLEAN
```javascript
patternMock({
	isOffline: 'BOOLEAN'
}); 

// {
// 	isOffline: true
// }
```
#### DATE
```javascript
patternMock({
	meetingDate: 'DATE'
}); 

// {
// 	meetingDate: Date Tue Dec 03 1974 22:03:35 GMT+0200 (Eastern European Standard Time)
// }
```
#### NUMBER
```javascript
patternMock({
	id: 'NUMBER'
}); 

// {
// 	id: 7111080744192283
// }
```
#### COUNTER
```javascript
patternMock({
	id: ['COUNTER']
}); 

// {
// 	id: [ 0, 1, 2, 3, 4 ]
// }
```
#### PHONE_NUMBER
```javascript
patternMock({
	phoneNumber: 'PHONE_NUMBER'
}); 

// {
// 	phoneNumber: "3346 80 78 99"
// }
```
#### CUSTOM_NUMBER_<MIN_NUMBER>-<MAX_NUMBER>
```javascript
patternMock({
	magicNumber: 'CUSTOM_NUMBER_23-167'
}); 

// { 
// 	magicNumber: 42
// }
```

### Nesting types
When creating a list, all we need to do is to add a pattern as first argument such as:

```javascript
patternMock({
	names: ['FULL_NAME']
});

// {
// 	names: [ "Vavobur Qeloc", "Dame Hogicebu Qosudet", "Lowo Welu" ]
// }
```

The range of the items in list is passed in the config object. We are also able to specify the range of items for the current list by passing an additional object to the list, which accepts one of the following properties:
	* length - number - for setting a fixed length of the list.
	* range - list of two numbers - specifying a minimum and maximum length for the list.

```javascript
patternMock({
	names: ['FULL_NAME', {range: [5, 7]}]
});

// {
// 	names: ["Bovezus Qaheba", "Xohu Bovub Dime", "Qegoruwi Nopoq", "Boyeta Wadag", "Divodoja Naxoqe Woyem", "Zagotay Yepapiso Jamu", "Dezacaz Jajigo"]
// }
```

Nesting more types:

```javascript
patternMock({
	id: 'NUMBER',
	name: 'FULL_NAME',
	description: 'SENTENCE',
	price: 'CUSTOM_NUMBER_10-30',
	expirationDate: 'DATE',
	ingredients: [{
		id: 'COUNTER',
		name: 'WORD',
		quantity: 'CUSTOM_NUMBER_5-13'
	}, {
		length: 2
	}]
});

// {
// 	id: 677404510061448,
// 	name: 'Geqi Tacariwi Pitaheba Pala',
// 	description: 'Turar suvete wofah xuvome hofufi laboma nihigilu teqiz.',
// 	price: 23,
// 	expirationDate: '1958-04-23T02:48:28.493Z',
// 	ingredients: [{
// 		id: 0,
// 		name: 'bigohu',
// 		quantity: 6
// 	}, {
// 		id: 1,
// 		name: 'ceboxodi',
// 		quantity: 12
// 	}]
// }
```

## Authors
* **Andrew** - [iAndrew25](https://github.com/iAndrew25)

See also the list of [contributors](https://github.com/iAndrew25/pattern-mock/graphs/contributors) who participated in this project.

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
