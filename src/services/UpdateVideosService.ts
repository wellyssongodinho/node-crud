import AppDataSource from "../config/database/data-source";
import { Category } from "../entities/Category";
import { Video } from "../entities/Video";

type VideoRequest = {
    id: string;
    name: string;
    description: string;
    duration: number;
    category_id: string;
}

export class UpdateVideoService {
    async execute({id, name, description, duration, category_id}: VideoRequest): Promise<VideoRequest | Error>{
        const repo = AppDataSource.getRepository(Video);
        const video = await repo.findOneBy({id});
        if (!video){
            return new Error(`Video ${id} does not exists`);
        }
        const repoCategory = await AppDataSource.getRepository(Category);
        const category = await repoCategory.findOneBy({id: category_id});
        if (!category){
            return new Error(`Category ${category_id} does not exists`);
        }
        video.name = name ? name : video.name;
        video.description = description ? description : video.description;
        video.duration = duration ? duration : video.duration;
        video.category_id = category_id ? category_id : video.category_id;
        await repo.save(video);
        return video;
    }
};
