# Changelog
## [3.0.0] - 2020-09-18
### Breaking Changes
- it is not possible anymore to pass a configuration element to a list as a second element. `patternMock` will now return the actual value if it is not a valid `type`.

### Added
- the following configuration properties:
	* `shouldPickOne`  - boolean - return a single value from a list.
	* `decorate` - function - calls the function with the value as parameter, and returns the function's output.
	* `decorateEach` - function - calls the function for every value of a list, and returns the function's output.

### Updated
- now it is possible to set a configuration object for each property. Instead of setting the type as value for key, now we can pass an object with two properties: 
	* `__config__` - configuration object.
	* `__pattern__` - type.

### Removed
- the following configuration property:
	* `itemsInList` - it was replaced by `range`.

## [2.0.0] - 2020-08-20
### Updated
- `PHONE_NUMBER` type, instead of just displaying a long number, not it has the config option to add spaces to it, so it looks more readable (e.g. 0367 265 754).

### Breaking Changes
- the second parameter passed to a list is not an array anymore. Now it is an object that can receive the following properties:
	* `length` - number - setting a fixed length for the list.
	* `range` - array of two numbers - setting range for the list length.

## [1.4.0] - 2019-10-21
### Added
- the following type:
	* `COUNTER`

## [1.3.1] - 2019-10-21
### Fixed
- issue when passing an array with more items, it would throw an error.

## [1.3.0] - 2019-08-23
### Added
- you won't get an error anymore whenever you're using a property which is not a type, instead it will return it as it is, letting the user to display static values.
- the following types:
	* `FULL_NAME`

### Changed
- the `NAME` type will now return a single name.

## [1.2.0] - 2019-08-22
### Added
- you can now specify the range of elements in each array by passing an additional element to the list.

## [1.1.0] - 2019-08-11
### Added
- the following types:
	* `EMAIL`
	* `STRING`
	* `COLOR`
	* `URL`
