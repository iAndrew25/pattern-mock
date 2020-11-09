const patternMock = require('../src');


describe('patternMock', () => {

	describe('simple types', () => {

		test('should return a string when passing `WORD` type', () => {
			const output = patternMock({
				place: 'WORD'
			});

			expect(typeof output.place).toEqual('string');
		});

		test('should return a string when passing `NAME` type', () => {
			const output = patternMock({
				name: 'NAME'
			});

			expect(typeof output.name).toEqual('string');
		});

		test('should return a string when passing `FULL_NAME` type', () => {
			const output = patternMock({
				fullName: 'FULL_NAME'
			});

			expect(typeof output.fullName).toEqual('string');
		});

		test('should return a string when passing `SENTENCE` type', () => {
			const output = patternMock({
				description: 'SENTENCE'
			}); 

			expect(typeof output.description).toEqual('string');
		});

		test('should return a string when passing `PARAGRAPH` type', () => {
			const output = patternMock({
				article: 'PARAGRAPH'
			}); 

			expect(typeof output.article).toEqual('string');
		});
		
		test('should return a boolean when passing `BOOLEAN` type', () => {
			const output = patternMock({
				isOffline: 'BOOLEAN'
			}); 

			expect(typeof output.isOffline).toEqual('boolean');
		});
		
		test('should return a date when passing `DATE` type', () => {
			const output = patternMock({
				meetingDate: 'DATE'
			}); 

			expect(output.meetingDate instanceof Date).toEqual(true);
		});
		
		test('should return a number when passing `NUMBER` type', () => {
			const output = patternMock({
				id: 'NUMBER'
			}); 

			expect(typeof output.id).toEqual('number');
		});

		test('should return a number between 3 and 6 when passing `CUSTOM_NUMBER` type', () => {
			const output = patternMock({
				price: 'CUSTOM_NUMBER_3-6'
			}); 

			expect(typeof output.price).toEqual('number');
			expect(3 <= output.price && output.price <= 6).toEqual(true);
			expect(() => patternMock({
				price: 'CUSTOM_NUMBER_3-SIX'
			})).toThrow();
		});

		test('should return a string when passing `PHONE_NUMBER` type', () => {
			const output = patternMock({
				phoneNumber: 'PHONE_NUMBER'
			}); 

			expect(typeof output.phoneNumber).toEqual('string');

			expect(output.phoneNumber[4]).toEqual(' ');
			expect(output.phoneNumber[7]).toEqual(' ');
			expect(output.phoneNumber[10]).toEqual(' ');
		});

		test('should return a string when passing `EMAIL` type', () => {
			const output = patternMock({
				email: 'EMAIL'
			}); 

			expect(typeof output.email).toEqual('string');
			expect(output.email.includes('@')).toEqual(true);
		});

		test('should return a string when passing `STRING` type', () => {
			const output = patternMock({
				randomId: 'STRING'
			}); 

			expect(typeof output.randomId).toEqual('string');
		});

		test('should return a string when passing `COLOR` type', () => {
			const output = patternMock({
				color: 'COLOR'
			}); 

			expect(typeof output.color).toEqual('string');
			expect(output.color[0]).toEqual('#');
			expect(output.color.length).toEqual(7);
		});

		test('should return a string when passing `URL` type', () => {
			const output = patternMock({
				website: 'URL'
			}); 

			expect(typeof output.website).toEqual('string');
			expect(output.website.startsWith('http://')).toEqual(true);
		});

		test('should return incremented values when passing `COUNTER` type', () => {
			const output = patternMock({
				id: {
					__pattern__: ['COUNTER'],
					__config__: {
						length: 7
					}
				}
			});

			expect(output.id).toEqual([0, 1, 2, 3, 4, 5, 6]);
		});
	});

	describe('edge cases', () => {
		const unknownTypeList = ['NAMES', 'FULL_NAMES'];
		const unknownObjectList = [{
			id: 1,
			name: 'NAMES'
		}, {
			id: 2,
			fullName: 'FULL_NAMES'
		}];
		const unknownObject = {
			names: 'NAMES',
			fullNames: 'FULL_NAMES'
		};

		test('should return the right values when passing random types', () => {
			const input = ['NUMBER', {email: 'EMAIL'}, 'COLOR', ['42', 42]];
			const output = patternMock({input})

			expect(typeof output.input[0]).toEqual('number');
			expect(typeof output.input[1].email).toEqual('string');
			expect(output.input[2].startsWith('#')).toEqual(true);
			expect(output.input[3][0]).toEqual('42');
			expect(output.input[3][1]).toEqual(42);
		});

		test('should return input values when passing unknown types', () => {
			const output = patternMock({
				null: null,
				undefined: undefined,
				number: 42,
				string: 'GOLDEN_STAG',
				function: jest.fn()
			});

			expect(patternMock({unknownTypeList})).toEqual({unknownTypeList});
			expect(patternMock({unknownObjectList})).toEqual({unknownObjectList});
			expect(patternMock({unknownObject})).toEqual({unknownObject});
			expect(output.null).toEqual(null);
			expect(output.undefined).toEqual(undefined);
			expect(output.number).toEqual(42);
			expect(output.string).toEqual('GOLDEN_STAG');
			expect(output.function).toEqual(expect.any(Function));
		});

		test('should return a single value from a list when passing `shouldPickOne` flag', () => {
			const unknownTypeListPick = patternMock({
				value: {
					__pattern__: unknownTypeList,
					__config__: {
						shouldPickOne: true
					}
				}
			});
			const unknownObjectListPick = patternMock({
				value: {
					__pattern__: unknownObjectList,
					__config__: {
						shouldPickOne: true
					}
				}
			});
			const unknownObjectPick = patternMock({
				unknownObject: {
					__pattern__: unknownObject,
					__config__: {
						shouldPickOne: true
					}
				}
			});

			const typeListPick = patternMock({
				value: {
					__pattern__: ['NAME'],
					__config__: {
						shouldPickOne: true
					}
				}
			});

			const typeListPickDecorateEach = patternMock({
				value: {
					__pattern__: ['NAME'],
					__config__: {
						shouldPickOne: true,
						decorateEach: i => i + 'ing.'
					}
				}
			});

			expect(unknownTypeList.includes(unknownTypeListPick.value)).toEqual(true);
			expect(unknownObjectList.some(i => i.id === unknownObjectListPick.value.id)).toEqual(true);
			expect(patternMock(unknownObjectPick)).toEqual({unknownObject});
			expect(typeof typeListPick.value).toEqual('string');
			expect(typeListPickDecorateEach.value.endsWith('ing.')).toEqual(true);
		});

		test('should call `decorate` for the first layer of props', () => {
			const decorate = jest.fn(({name}) => ({name: `${name}-end`}));

			const output = patternMock({
				__pattern__: {
					name: 'NAME'
				},
				__config__: {
					decorate
				}
			});

			expect(output.name.endsWith('-end')).toEqual(true);
		});

		test('should call `decorateEach` for each item', () => {
			const decorateEach = jest.fn();
			const called = 5;

			const output = patternMock({
				emails: {
					__pattern__: ['EMAIL'],
					__config__: {
						decorateEach,
						length: called
					}
				}
			});

			expect(decorateEach).toBeCalledTimes(called);
		});

		test('should concatenate string to name', () => {
			const firstName = 'Marco';
			const lastName = 'Polo';

			const output = patternMock({
				name: {
					__pattern__: firstName,
					__config__: {
						decorate: name => `${name} ${lastName}`
					}
				}
			});

			expect(output.name).toEqual(`${firstName} ${lastName}`);
		});

		test('should add new item to list', () => {
			const list = ['one', 'two'];

			const output = patternMock({
				numbers: {
					__pattern__: list,
					__config__: {
						decorate: l => [...l, 'three']
					}
				}
			});

			expect(output.numbers).toEqual([...list, 'three']);
		});

		test('should return a list with one item when passing an unknown pattern', () => {
			expect(patternMock({
				test: ['ITEM']
			}).test.length).toEqual(1);
		});

		test('should return a list of random numbers', () => {
			expect(patternMock({
				test: {
					__pattern__: ['CUSTOM_NUMBER_20-30'],
					__config__: {
						length: 10
					}
				}
			}).test.length).toEqual(10);
		});

	});

	describe('nested types', () => {
		test('should return an object', () => {
			const output = patternMock({
				id: 'NUMBER',
				people: [{
					name: 'NAME',
					age: 'CUSTOM_NUMBER_20-30',
					SSN: null,
					hobbies: ['WORD']
				}]
			});

			expect(output).toEqual({
				id: expect.any(Number),
				people: expect.arrayContaining([
					expect.objectContaining({
						name: expect.any(String),
						age: expect.any(Number),
						SSN: null,
						hobbies: expect.arrayContaining([
							expect.any(String)
						])	
					})
				])
			});
			expect(output.people.length > 3).toEqual(true);
		});

		test('should return a counter starting from default value', () => {
			const output = patternMock({
				counter: {
					__pattern__: 'COUNTER'
				}
			});

			expect(output.counter).toEqual(0);
		});

		test('should return list with 4 elements', () => {
			const output = patternMock({
				colors: {
					__pattern__: ['COLOR'],
					__config__: {
						length: 4
					}
				}
			});

			expect(output.colors.length).toEqual(4);
		});

		test('should throw error', () => {
			expect(() => patternMock('random-string')).toThrow();
		});
	});
});