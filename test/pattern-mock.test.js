const patternMock = require('../dist/pattern-mock');


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

		test('should return list with 4 elements', () => {
			const output = patternMock({
				colors: ['COLOR', [4, 4]] 
			});

			expect(output.colors.length).toEqual(4);
		});

		test('should throw error', () => {
			expect(() => patternMock({
				callback: () => {}	
			})).toThrow();

			expect(() => patternMock('random-string')).toThrow();
		});
	});
});