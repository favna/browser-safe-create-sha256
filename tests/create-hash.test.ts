import { browserSafeCreateHash } from '../dist';

describe('Create Hash', () => {
	const inputs: string[] = [
		JSON.stringify(['Hello']),
		JSON.stringify(['Hello', 'There']),
		JSON.stringify([{ name: 'Hello' }, { name: 'Hi' }]),
		JSON.stringify([['Hello'], ['Hi']]),
		JSON.stringify([[{ name: 'Hello' }], [{ name: 'Hi' }]])
	];

	test.each(inputs)('GIVEN %j THEN return encoded string', (value) => {
		expect(browserSafeCreateHash(value)).toEqual(expect.any(String));
	});
});
