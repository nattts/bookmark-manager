/* eslint-disable no-undef */

const DeleteLink = require('../../lib/use-cases/deleteLink');

describe('DeleteLink()', () => {
	const repository = jest.mock('../../lib/infrastructure/repositories/LinksRepository');
	const user_id = '123a';
	const category = 'travel';
	const url = 'http://example.com';
	let deleted;

	it('should throw if args are falsy', async () => {
		const args = [ null, undefined, NaN, '', 0, false ];
		args.forEach(async arg => {
			expect(async () => await DeleteLink(arg, arg, arg, arg)).rejects.toThrow();
		});
	});
	
	it('should return an object with status 201 and message if bookmark is deleted', async () => {
		
		const expected = { status: 201, message: 'bookmark deleted' };
		deleted = true;
		
		repository.delete = jest.fn().mockResolvedValue(deleted);
		const result = await DeleteLink(user_id, category, url, repository);
		
		expect(repository.delete).toHaveBeenCalledTimes(1);
		expect(repository.delete).toHaveBeenCalledWith(user_id, category, url);
		expect(await result).toEqual(expect.objectContaining(expected));
	});

	it('should return an object with status 500 and message if bookmark can not be deleted', async () => {
		
		const expected = { status: 500, message: 'request can not be fulfilled at the moment' };
		deleted = false;
		
		repository.delete = jest.fn().mockResolvedValue(deleted);
		const result = await DeleteLink(user_id, category, url, repository);
		
		expect(repository.delete).toHaveBeenCalledTimes(1);
		expect(repository.delete).toHaveBeenCalledWith(user_id, category, url);
		expect(await result).toEqual(expect.objectContaining(expected));
	});

});