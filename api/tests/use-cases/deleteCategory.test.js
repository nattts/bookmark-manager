/* eslint-disable no-undef */

const DeleteCategory = require('../../lib/use-cases/deleteCategory');

describe('DeleteCategory()', () => {
	const repository = jest.mock('../../lib/infrastructure/repositories/CategoriesRepository');
	const user_id = '123a';
	const category = 'travel';
	let deleted;

	it('should throw if args are falsy', async () => {
		const args = [null, undefined, NaN, '', 0, false ];
		args.forEach(async arg => {
			expect(async () => await DeleteCategory(arg, arg, arg)).rejects.toThrow();
		});
	});
	
	it('should return an object with status 201 and message if new category deleted', async () => {
		
		const expected = { status: 201, message: "category now deleted" };
		deleted = true;
		
		repository.delete = jest.fn().mockResolvedValue(deleted);
		const result = await DeleteCategory(user_id, category, repository);
		
		expect(repository.delete).toHaveBeenCalledTimes(1);
		expect(repository.delete).toHaveBeenCalledWith(user_id, category);
		expect(await result).toEqual(expect.objectContaining(expected));
	});

	it('should return an object with status 202 and message if could not delete category ', async () => {
		
		const expected = { status: 202, message:'could not delete a category' };
		deleted = false;
		
		repository.delete = jest.fn().mockResolvedValue(deleted);
		const result = await DeleteCategory(user_id, category, repository);
		
		expect(repository.delete).toHaveBeenCalledTimes(1);
		expect(repository.delete).toHaveBeenCalledWith(user_id, category);
		expect(await result).toEqual(expect.objectContaining(expected));
	});

});