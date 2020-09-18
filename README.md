# Pattern mock · [![Build Status](https://travis-ci.org/iAndrew25/pattern-mock.svg?branch=master)](https://travis-ci.org/iAndrew25/pattern-mock) ![GitHub](https://img.shields.io/github/license/iAndrew25/pattern-mock?label=License) ![npm](https://img.shields.io/npm/v/pattern-mock?label=Latest%20version) ![npm](https://img.shields.io/npm/dt/pattern-mock?label=Downloads) 
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

## CDN
The source can also be found on the following CDN:

```html
<script src="https://unpkg.com/pattern-mock@3.0.0/dist/pattern-mock.min.js"></script>
```

## Syntax
```javascript
patternMock(pattern[, config]);
```

### Parameters
* **pattern** - an object which specifies the structure of the result.
	* `key` - string - property name.
	* `value` - any - pattern to be mocked (e.g. `name: 'NAME'`).
		* In case there is a need for passing a config object to a key, the following structure is required:
			* `__pattern__` - any - pattern to be mocked (just like `value`).
			* `__config__` - object - `config` (see below)

* **config** - a configuration object which sets configuration and ranges of numbers for generating random data:
	* `numbersInPhoneNumber` - array - default `[10, 10]`
	* `sentencesInParagraph` - array - default `[3, 6]`
	* `wordsInSentence` - array - default `[5, 10]`
	* `wordsInFullName` - array - default `[2, 4]`
	* `lettersInWord` - array - default `[4, 8]`
	* `lettersInString` - array - default `[5, 10]`
	* `spaceIndexInPhoneNumber` - array - default `[4, 6, 8]`
	* `counterStart` - number - default `0`
	* `range` - array - default `[3, 8]`
	* `length` - number - sets the length of a list.
	* `decorateEach` - function - calls each element from a list and returns the output.
	* `decorate` - function - calls the value and returns the output.
	* `shouldPickOne` - boolean - picks a single value from a list.

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
When creating a list, all we need to do is to add a type as first argument such as:

```javascript
patternMock({
	names: ['FULL_NAME']
});

// {
// 	names: [ "Vavobur Qeloc", "Dame Hogicebu Qosudet", "Lowo Welu" ]
// }
```

Nesting more types:

```javascript
patternMock({
	person: {
		name: 'FULL_NAME',
		age: 'CUSTOM_NUMBER_17-26',
		hobbies: ['WORD'],
		isCool: 'BOOLEAN'
	}
});

// {
// 	person": {
// 		"name": "Guya Caro Sacusip Datig",
// 		"age": 22,
// 		"hobbies": [
// 			"jaxen",
// 			"ragodutu",
// 			"noxefu"
// 		],
// 		"isCool": true
// 	}
// }
```

For a more complex and custom structure, we can use different `__config__` properties, followed by `__pattern__` which will be the value for our property:

```javascript
patternMock({
	yearOfBirth: {
		__pattern__: 'DATE',
		__config__: {
			decorate: date => date.getFullYear()
		}
	}
});

// {
// 	"yearOfBirth": 1985
// }
```

Or a more nested and complex structure:

```javascript
patternMock({
	person: {
		name: 'FULL_NAME',
		hobbies: ['WORD'],
		bestAt: {
			__pattern__: ['losing at games', 'being rejected'],
			__config__: {
				decorate: list => list.join(', ')
			}
		},
		friends: {
			__pattern__: [{
				name: 'FULL_NAME',
				age: 'CUSTOM_NUMBER_17-26',
				favouriteGame: {
					__pattern__: ['LEAGUE OF LEGENDS', 'DOTA', 'SMITE'],
					__config__: {
						shouldPickOne: true
					}
				}
			}],
			__config__: {
				length: 3,
				decorateEach: ({age, ...rest}) => ({age: `${age} years old`, ...rest})
			}
		},
		randomStuff: ['NUMBER', {email: 'EMAIL'}, 'COLOR', ['whatever', 'BOOLEAN']]
	}
});

// {
// 	"person": {
// 		"name": "Yihoruhi Ruqu Jevimi",
// 		"hobbies": [
// 			"febo",
// 			"nowo",
// 			"wemoxox",
// 			"coquna",
// 			"rere",
// 			"sujof",
// 			"gage",
// 			"pizamic"
// 		],
// 		"bestAt": "losing at games, being rejected",
// 		"friends": [
// 			{
// 				"age": "17 years old",
// 				"name": "Wuvew Dusuto",
// 				"favouriteGame": "LEAGUE OF LEGENDS"
// 			},
// 			{
// 				"age": "22 years old",
// 				"name": "Pexujuba Wuwizur",
// 				"favouriteGame": "DOTA"
// 			},
// 			{
// 				"age": "24 years old",
// 				"name": "Buwed Mazopaze",
// 				"favouriteGame": "SMITE"
// 			}
// 		],
// 		"randomStuff": [
// 			4658847147811904,
// 			{
// 				"email": "nu@sidagapitu.we"
// 			},
// 			"#ADC0DB",
//			[
//				"whatever",
//				true
//			]
// 		]
// 	}
// }
```

## Authors
* **Andrew** - [iAndrew25](https://github.com/iAndrew25)

See also the list of [contributors](https://github.com/iAndrew25/pattern-mock/graphs/contributors) who participated in this project.

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
