/* eslint-disable no-undef */

const CreateCategory = require('../../lib/use-cases/createCategory');

describe('CreateCategory()', () => {
	let repository = jest.mock('../../lib/infrastructure/repositories/CategoriesRepository');
	let user_id = '123a';
	let category = 'tmp';
	let created;

	it('should throw if args are falsy', async () => {
		const args = [null, undefined, NaN, '', 0, false ];
		args.forEach(async arg => {
			expect(async () => await CreateCategory(arg, arg, arg)).rejects.toThrow();
		});
	});
	
	it('should return an object with status 201 and message if new category created', async () => {
		
		const expected = { status: 201, message: "new category created" };
		created = true;
		
		repository.create = jest.fn().mockResolvedValue(created);
		const result = await CreateCategory(user_id, category, repository);
		
		expect(repository.create).toHaveBeenCalledTimes(1);
		expect(repository.create).toHaveBeenCalledWith(user_id, category);
		expect(await result).toEqual(expect.objectContaining(expected));
	});

	it('should return an object with status 202 and message if new category created', async () => {
		
		const expected = { status: 202, message:'category already exist' };
		created = false;
		
		repository.create = jest.fn().mockResolvedValue(created);
		const result = await CreateCategory(user_id, category, repository);
		
		expect(repository.create).toHaveBeenCalledTimes(1);
		expect(repository.create).toHaveBeenCalledWith(user_id, category);
		expect(await result).toEqual(expect.objectContaining(expected));
	});

});