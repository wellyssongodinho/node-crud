import { Request, Response } from "express";
import { UpdateVideoService } from "../services/UpdateVideosService";

export class UpdateVideoController {
    async handle (request: Request, response: Response){
        const { id } = request.params;
        const {name, description, duration, category_id } = request.body;
        const service = new UpdateVideoService();
        const result = await service.execute({id, name, description, duration, category_id});

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }
        return response.status(204).end();
    }
};
      