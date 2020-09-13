const patternMock = require('./index');

console.log(patternMock({
	da: {
		calc: 'NAME',
		__type__: ['3', '2', '1', 0],
		__config__: {
			decorateEach: i => 'forEach ' + i,
			decorate: i => [...i, 's'],
			length: 3,
			// range
		}
	},
	nu: {
		__type__: ['NUMBER', 'NAME', 'EMAIL'],
		__config__: {
			range: [2,2]
		}
	},
	poate: {
		__type__: ['1', '2', '3', '4', '5'],
		__config__: {
			pickOne: true
		}
	},
	// ids: ['COUNTER'],
	buc: ['COUNTE', 'S'],
	suc: ['COUNTE'],
	dates: {
		__type__: ['DATE'],
		__config__: {
			decorateEach: data => {
				console.log('Data trimisa de patternmock', data);
				const date = new Date(data);
				const year = date.getFullYear()
				return 'Anul ' + year;
			}
		}
	},
	iduri: {
		__type__: 'COUNTER',
		__config__: {
			counterStart: 10,
			length: 20
		}
	},
	nam: {
		__type__: 'FULL_NAME',
		__config__: {
			wordsInFullName: [1,1]
		}
	}
}));