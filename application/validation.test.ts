import { describe, expect, it } from 'vitest';
import { validateData } from './validation';

const validPerson = {
	first: 'Ada',
	last: 'Lovelace',
	email: 'ada@example.com',
	address: '1 Analytical Engine Rd',
	created: '2024-01-01',
	balance: '$100.00'
};

describe('validateData', () => {
	it('returns parsed people when the payload matches the schema', () => {
		expect(validateData([validPerson])).toEqual([validPerson]);
	});

	it('throws when a required field is missing', () => {
		const { email: _email, ...invalidPerson } = validPerson;
		expect(() => validateData([invalidPerson])).toThrow();
	});
});
