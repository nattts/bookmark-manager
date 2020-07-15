/* eslint-disable no-undef */

const SaveLink = require('../../lib/use-cases/saveLink');


describe('SaveLink()', () => {
	const utils = require('../../lib/frameworks/common/utils/helpers');
	const repository = require('../../lib/infrastructure/repositories/LinksRepository');
	const user_id = '123a';
	const category = 'travel';
	const url = 'http://example.com';
	let saved;


	it('should throw if args are falsy', async () => {
		const args = [ null, undefined, NaN, '', 0, false ];
		args.forEach(async arg => {
			expect(async () => await SaveLink(arg, arg, arg, arg)).rejects.toThrow();
		});
	});
	
	
	it('should return an object with status 201 and message if bookmark is saved', async () => {
		
		const expected = { status: 201, message: 'bookmark saved' };
		saved = true;

		utils.exist = jest.fn().mockResolvedValue(false);
		repository.save = jest.fn().mockResolvedValue(saved);

		const result = await SaveLink(user_id, category, url, repository);
		
		expect(utils.exist).toHaveBeenCalledTimes(1);
		expect(utils.exist).toHaveBeenCalledWith(user_id, url, repository);
		expect(repository.save).toHaveBeenCalledTimes(1);
		expect(repository.save).toHaveBeenCalledWith(user_id, url, category);
		
		expect(await result).toEqual(expect.objectContaining(expected));
	});

	
	it('should return an object with status 202 and message if bookmark already exist', async () => {
		
		const expected = { status: 202, message: 'bookmark already exist' };
		saved = false;
		
		utils.exist = jest.fn().mockResolvedValue(true);

		const result = await SaveLink(user_id, category, url, repository);
		expect(await result).toEqual(expect.objectContaining(expected));
	});

	
	it('should return an object with status 500 and message if operation could not be done', async () => {
		
		const expected = { status: 500, message: 'request can not be fulfilled at the moment' };
		saved = false;

		utils.exist = jest.fn().mockResolvedValue(false);
		repository.save = jest.fn().mockResolvedValue(saved);

		const result = await SaveLink(user_id, category, url, repository);
		
		expect(utils.exist).toHaveBeenCalledTimes(1);
		expect(utils.exist).toHaveBeenCalledWith(user_id, url, repository);
		expect(repository.save).toHaveBeenCalledTimes(1);
		expect(repository.save).toHaveBeenCalledWith(user_id, url, category);
		
		expect(await result).toEqual(expect.objectContaining(expected));
	});

});
