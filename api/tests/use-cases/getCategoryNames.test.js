/* eslint-disable no-undef */

const GetCategoryNames = require('../../lib/use-cases/getCategoryNames');

describe('getCategoryNames()', () => {
	const repository = jest.mock('../../lib/infrastructure/repositories/CategoriesRepository');
	const user_id = '123a';

	it('should throw if args are falsy', async () => {
		const args = [null, undefined, NaN, '', 0, false ];
		args.forEach(async arg => {
			expect(async () => await GetCategoryNames(arg, arg)).rejects.toThrow();
		});
	});

	it('should return an object with status 200 and message if there are categories saved by user', async () => {

		const expected = { status: 200, message: ['music', 'movies'] };
		const fakeData = {
			"music": [
				"http://example1.com",
				"http://example2.com"
			],
			"movies": [
				"http://example3.com",
				"http://example4.com"
			]
		};

		repository.get = jest.fn().mockResolvedValue(fakeData);
		const result = await GetCategoryNames(user_id, repository);
		
		expect(repository.get).toHaveBeenCalledTimes(1);
		expect(repository.get).toHaveBeenCalledWith(user_id);
		expect(await result).toEqual(expect.objectContaining(expected));
	
	});

	it('should return an object with status 404 and message if user data not found', async () => {
		const expected = { status: 404, message: 'not found' };
		const fakeData = [];
		
		repository.get = jest.fn().mockResolvedValue(fakeData);
		const result = await GetCategoryNames(user_id, repository);
		
		expect(repository.get).toHaveBeenCalledTimes(1);
		expect(repository.get).toHaveBeenCalledWith(user_id);
		expect(await result).toEqual(expect.objectContaining(expected));
	});

});


