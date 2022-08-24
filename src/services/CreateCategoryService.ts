import AppDataSource from "../config/database/data-source";
import { Category } from "../entities/Category";

type CategoryRequest = {
    name: string;
    description: string;
}

export class CreateCategoryService {
    async execute({name, description}: CategoryRequest ): Promise<Category | Error> {
        const repo = AppDataSource.getRepository(Category);
        const existCategory = await repo.findOneBy({name});
        if (existCategory){
            return new Error(`Category ${name} already exists`);
        }
        // const category = new Category();
        // category.name = name;
        // category.description = description;
        const category = repo.create({name, description});
        await repo.save(category);
        return category;
    }
};
