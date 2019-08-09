const getRandomNumber = ([min, max]) => Math.floor(Math.random() * (max - min + 1)) + min;

const isArray = param => Array.isArray(param);
const isObject = param => typeof param === 'object';
const isFunction = param => typeof param === 'function';