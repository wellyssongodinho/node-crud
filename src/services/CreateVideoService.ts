import AppDataSource from "../config/database/data-source";
import { Category } from "../entities/Category";
import { Video } from "../entities/Video";

type VideoRequest = {
    name: string;
    description: string;
    duration: number;
    category_id: string;
}

export class CreateVideoService {
    async execute({name, description, duration, category_id}: VideoRequest ): Promise<Video | Error> {
        const repo = await AppDataSource.getRepository(Video);
        const existsVideo = await repo.findOneBy({name});
        if (existsVideo){
            return new Error(`Video ${name} already exists`);
        }

        const repoCategory = await AppDataSource.getRepository(Category);
        const category = await repoCategory.findOneBy({id: category_id});
        if (!category){
            return new Error(`Category ${category_id} does not exists`);
        }
        const video = repo.create({name, description, duration, category_id});
        await repo.save(video);
        return video;
    }
};
