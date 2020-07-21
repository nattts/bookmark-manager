/* eslint-disable no-undef */

const DisplayLinksByCategory = require('../../lib/use-cases/DisplayLinksByCategory');


describe('DisplayLinksByCategory()', () => {
	const repository = require('../../lib/infrastructure/repositories/LinksRepository');
	const user_id = '123a';
	const category = 'travel';

	it('should throw if args are falsy', async () => {
		const args = [ null, undefined, NaN, '', 0, false ];
		args.forEach(async arg => {
			expect(async () => await DisplayLinksByCategory(arg, arg, arg, arg)).rejects.toThrow();
		});
	});

	it('should return an object with status 200 and message as array of links', async () => {
		
		const fakeData =  ["http://example1.com", "http://example2.com"];
		const expected = { status: 200, message: fakeData };

		repository.getBy = jest.fn().mockResolvedValue(fakeData);

		const result = await DisplayLinksByCategory(user_id, category, repository);

		expect(repository.getBy).toHaveBeenCalledTimes(1);
		expect(repository.getBy).toHaveBeenCalledWith(user_id, category);
		expect(await result).toEqual(expect.objectContaining(expected));
	});

	it('should return an object with status 404 and message if links are not found', async () => {
		
		const fakeData =  [];
		const expected = { status: 404, message:'not found' };

		repository.getBy = jest.fn().mockResolvedValue(fakeData);

		const result = await DisplayLinksByCategory(user_id, category, repository);

		expect(repository.getBy).toHaveBeenCalledTimes(1);
		expect(repository.getBy).toHaveBeenCalledWith(user_id, category);
		expect(await result).toEqual(expect.objectContaining(expected));
	});

});
