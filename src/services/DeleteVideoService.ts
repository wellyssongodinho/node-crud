import AppDataSource from "../config/database/data-source";
import { Video } from "../entities/Video";

export class DeleteVideoService {
    async execute(id: string) {
        const repo = AppDataSource.getRepository(Video);
        const video = await repo.findOneBy({id});
        if (!video){
            return new Error(`Video ${id} does not exists`);
        }
        await repo.delete(id);
    }
};
