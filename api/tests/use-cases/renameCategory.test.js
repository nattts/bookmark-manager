/* eslint-disable no-undef */

const RenameCategory = require('../../lib/use-cases/renameCategory');

describe('RenameCategory()', () => {
	const repository = jest.mock('../../lib/infrastructure/repositories/CategoriesRepository');
	const user_id = '123a';
	let currentCategory = 'music';
	let newCategory = 'travel';
	let created;

	it('should throw if args are falsy', async () => {
		const args = [null, undefined, NaN, '', 0, false ];
		args.forEach(async arg => {
			expect(async () => await RenameCategory(arg, arg, arg, arg)).rejects.toThrow();
		});
	});
	
	it('should return an object with status 201 and message if new category created', async () => {
		
		const expected = { status: 201, message: "successfully renamed category" };
		created = true;
		
		repository.rename = jest.fn().mockResolvedValue(created);
		const result = await RenameCategory(user_id, currentCategory, newCategory, repository);
		
		expect(repository.rename).toHaveBeenCalledTimes(1);
		expect(repository.rename).toHaveBeenCalledWith(user_id, currentCategory, newCategory);
		expect(await result).toEqual(expect.objectContaining(expected));
	});

	it('should return an object with status 202 and message if new category created', async () => {
		
		const expected = { status: 202, message:'could not rename a category' };
		created = false;
		
		repository.rename = jest.fn().mockResolvedValue(created);
		const result = await RenameCategory(user_id, currentCategory, newCategory, repository);
		
		expect(repository.rename).toHaveBeenCalledTimes(1);
		expect(repository.rename).toHaveBeenCalledWith(user_id, currentCategory, newCategory);
		expect(await result).toEqual(expect.objectContaining(expected));
	});

	it('should return an object with status 202 and message if new category created', async () => {
		
		const expected = { status: 201, message: "new category should be different" };
		currentCategory = 'music';
		newCategory = 'music';
		
		const result = await RenameCategory(user_id, currentCategory, newCategory, repository);
		expect(result).toEqual(expect.objectContaining(expected));
	});

});