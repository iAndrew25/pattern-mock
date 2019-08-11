const patternMock = require('../pattern-mock');


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
		});

		test('type `RANDOM_TYPE` should throw an error', () => {
			expect(() => patternMock({
				randomType: 'RANDOM_TYPE'
			})).toThrow();
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

		test('should throw error', () => {
			expect(() => patternMock({
				callback: () => {}	
			})).toThrow();

			expect(() => patternMock('random-string')).toThrow();
		});
	});
});