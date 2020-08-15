import { backendUrl } from "../../../globals";
import { getClient } from "../../client/http";

const submodule = "admin";

const getAll = async (): Promise<Category[]> => {
	const client = getClient();
	const categories =  (await client.get(`${backendUrl}/${submodule}/category/getAll`)).data;
	console.log(categories);
	return categories;
};

const save = async (_category: Category): Promise<Category> => {
	const client = getClient();
	const category = (await client.post(`${backendUrl}/${submodule}/category/save`, _category)).data;
	console.log(category);
	return category;
};


const update = async (_category: Category): Promise<Category> => {
	const client = getClient();
	const category = (await client.put(`${backendUrl}/${submodule}/category/update`, _category)).data;
	console.log(category);
	return category;
};


const deleteById = async (idCategory: number): Promise<boolean> => {
	const client = getClient();
	const retval = (await client.delete(`${backendUrl}/${submodule}/category/deleteById/${idCategory}`)).data;
	console.log(retval);
	return retval;
};


const adminCategoryService = {
	getAll,
	deleteById,
	save,
	update,
};

export default adminCategoryService;