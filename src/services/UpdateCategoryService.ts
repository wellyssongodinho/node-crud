import AppDataSource from "../config/database/data-source";
import { Category } from "../entities/Category";

type CategoryRequest = {
    id: string;
    name: string;
    description: string;
}

export class UpdateCategoryService {
    async execute({id, name, description}: CategoryRequest): Promise<CategoryRequest | Error>{
        const repo = AppDataSource.getRepository(Category);
        const category = await repo.findOneBy({id});
        if (!category){
            return new Error(`Category ${id} does not exists`);
        }
        category.name = name ? name : category.name;
        category.description = description ? description : category.description;
        await repo.save(category);
        return category;
    }
};
