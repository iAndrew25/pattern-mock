const toTitleCase = string => string.split(' ').map(word => word[0].toUpperCase() + word.substr(1).toLowerCase()).join(' ');
const isObject = value => value && typeof value === 'object';
const isFunction = fn => typeof fn === 'function';
const isString = str => typeof str === 'string';

module.exports = {
	toTitleCase,
	isFunction,
	isString,
	isObject
};
