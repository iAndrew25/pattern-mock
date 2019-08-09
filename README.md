# Schema mock
Generates mock data based on a specified schema.

### Installing
To use with node:
```
$ npm install <name>
```

Then in the console:
```javascript
const schemaMock = require('<name>');
```

To use directly in the browser:
```
<script src="path/to/yourCopyOf/<name>.js"></script>
```

or the minified version:
```
<script src="path/to/yourCopyOf/<name>.min.js"></script>
```

## Syntax
```javascript
schemaMock(schema, config[)
```

### Parameters
* schema
⋅⋅⋅ An object which specifies the structure of the result.
* config
⋅⋅⋅ A configuration object which sets ranges of numbers for generating random `itemsInList`, `numbersInPhoneNumber`, `sentencesInParagraph`, `wordsInSentence`, `wordsInName`, `lettersInWord`.

## API

### Supported types
* WORD
```javascript
schemaMock({
	place: 'WORD',
});
```
* NAME
```javascript
schemaMock({
	name: 'NAME',
});
```
* SENTENCE
```javascript
schemaMock({
	description: 'SENTENCE'
});
```
* PARAGRAPH
```javascript
schemaMock({
	article: 'PARAGRAPH'
});
```
* BOOLEAN
```javascript
schemaMock({
	isOffline: 'BOOLEAN'
});
```
* DATE
```javascript
schemaMock({
	meetingDate: 'DATE'
});
```
* NUMBER
```javascript
schemaMock({
	id: 'NUMBER'
});
```
* PHONE_NUMBER
```javascript
schemaMock({
	phoneNumber: 'PHONE_NUMBER'
});
```
* CUSTOM_NUMBER_<MIN_NUMBER>-<MAX_NUMBER>
```javascript
schemaMock({
	phoneNumber: 'PHONE_NUMBER'
});
```

## Example
Explain how to run the automated tests for this system

```javascript
const schema = {
	id: 'NUMBER',
	name: 'NAME',
	description: 'SENTENCE',
	price: 'CUSTOM_NUMBER_10-30',
	expirationDate: 'DATE',
	ingredients: [{
		name: 'NAME',
		quantity: 'CUSTOM_NUMBER_5-13'
	}]
};

schemaMock(schema);
```

## Versioning
We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors
* **Andrew** - [iAndy3](https://github.com/iAndy3)

See also the list of [contributors](https://github.com/iAndy3/schema-mock/graphs/contributors) who participated in this project.

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details