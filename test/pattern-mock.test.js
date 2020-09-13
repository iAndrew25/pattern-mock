const patternMock = require('../src');


describe('patternMock', () => {

	describe('Simple types', () => {

		test('type `WORD` should return a string', () => {
			const output = patternMock({
				place: 'WORD'
			});

			expect(typeof output.place).toEqual('string');
		});

		test('type `NAME` should return a string', () => {
			const output = patternMock({
				name: 'NAME'
			});

			expect(typeof output.name).toEqual('string');
		});

		test('type `FULL_NAME` should return a string', () => {
			const output = patternMock({
				fullName: 'FULL_NAME'
			});

			expect(typeof output.fullName).toEqual('string');
		});

		test('type `SENTENCE` should return a string', () => {
			const output = patternMock({
				description: 'SENTENCE'
			}); 

			expect(typeof output.description).toEqual('string');
		});

		test('type `PARAGRAPH` should return a string', () => {
			const output = patternMock({
				article: 'PARAGRAPH'
			}); 

			expect(typeof output.article).toEqual('string');
		});
		
		test('type `BOOLEAN` should return a boolean', () => {
			const output = patternMock({
				isOffline: 'BOOLEAN'
			}); 

			expect(typeof output.isOffline).toEqual('boolean');
		});
		
		test('type `DATE` should return a date', () => {
			const output = patternMock({
				meetingDate: 'DATE'
			}); 

			expect(output.meetingDate instanceof Date).toEqual(true);
		});
		
		test('type `NUMBER` should return a number', () => {
			const output = patternMock({
				id: 'NUMBER'
			}); 

			expect(typeof output.id).toEqual('number');
		});

		test('type `CUSTOM_NUMBER` should return a number between 3 and 6', () => {
			const output = patternMock({
				price: 'CUSTOM_NUMBER_3-6'
			}); 

			expect(typeof output.price).toEqual('number');
			expect(3 <= output.price && output.price <= 6).toEqual(true);
			expect(() => patternMock({
				price: 'CUSTOM_NUMBER_3-SIX'
			})).toThrow();
		});

		test('type `PHONE_NUMBER` should return a string', () => {
			const output = patternMock({
				phoneNumber: 'PHONE_NUMBER'
			}); 

			expect(typeof output.phoneNumber).toEqual('string');

			expect(output.phoneNumber[4]).toEqual(' ');
			expect(output.phoneNumber[7]).toEqual(' ');
			expect(output.phoneNumber[10]).toEqual(' ');
		});

		test('type `EMAIL` should return a string', () => {
			const output = patternMock({
				email: 'EMAIL'
			}); 

			expect(typeof output.email).toEqual('string');
			expect(output.email.includes('@')).toEqual(true);
		});

		test('type `STRING` should return a string', () => {
			const output = patternMock({
				randomId: 'STRING'
			}); 

			expect(typeof output.randomId).toEqual('string');
		});

		test('type `COLOR` should return a string', () => {
			const output = patternMock({
				color: 'COLOR'
			}); 

			expect(typeof output.color).toEqual('string');
			expect(output.color[0]).toEqual('#');
			expect(output.color.length).toEqual(7);
		});

		test('type `URL` should return a string', () => {
			const output = patternMock({
				website: 'URL'
			}); 

			expect(typeof output.website).toEqual('string');
			expect(output.website.startsWith('http://')).toEqual(true);
		});

		test('type `COUNTER` should return incremented values', () => {
			const output = patternMock({
				id: {
					__type__: ['COUNTER'],
					__config__: {
						length: 7
					}
				}
			});

			expect(output.id).toEqual([0, 1, 2, 3, 4, 5, 6]);
		});

		test('should return fixed value', () => {
			const output = patternMock({
				null: null,
				undefined: undefined,
				number: 42,
				string: 'GOLDEN_STAG',
				function: jest.fn()
			}); 

			expect(output.null).toEqual(null);
			expect(output.undefined).toEqual(undefined);
			expect(output.number).toEqual(42);
			expect(output.string).toEqual('GOLDEN_STAG');
			expect(output.function).toEqual(expect.any(Function));
		});
	});

	describe('Nested types', () => {
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
		});

		test('should return input values', () => {
			const input = [{
				name: 'NAMES'
			}, {
				fullName: 'FULL_NAMES'
			}];

			const output = patternMock({
				items: input
			});

			expect(output.items).toEqual(input);
		});

		test('should call `decorateEach` for each item', () => {
			const decorateEach = jest.fn();
			const called = 5;

			const output = patternMock({
				emails: {
					__type__: ['EMAIL'],
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
					__type__: firstName,
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
					__type__: list,
					__config__: {
						decorate: l => [...l, 'three']
					}
				}
			});

			expect(output.numbers).toEqual([...list, 'three']);
		});

		test('should return a counter starting from default value', () => {
			const output = patternMock({
				counter: {
					__type__: 'COUNTER'
				}
			});

			expect(output.counter).toEqual(0);
		});

		test('should pick a value from a list', () => {
			const input = ['One', 'Two', 'Three'];

			const output = patternMock({
				items: {
					__type__: ['One', 'Two', 'Three'],
					__config__: {
						pickOne: true
					}
				}
			});

			expect(input.includes(output.items)).toBe(true);
		});

		test('should return list with 4 elements', () => {
			const output = patternMock({
				colors: {
					__type__: ['COLOR'],
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