import AppDataSource from "../config/database/data-source";
import { Category } from "../entities/Category";

export class DeleteCategoryService {
    async execute(id: string) {
        const repo = AppDataSource.getRepository(Category);
        const category = await repo.findOneBy({id});
        if (!category){
            return new Error(`Category ${id} does not exists`);
        }
        await repo.delete(id);
    }
};
