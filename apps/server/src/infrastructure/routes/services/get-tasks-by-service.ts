import { Request, Response } from "express";
import { GetTasksByServiceQuery, GetTasksByServiceQueryHandler } from "../../../application/use-cases/get-tasks-by-service";
import { InMemoryServiceRepository } from "../../repositories";

const serviceRepository = new InMemoryServiceRepository();
const getTasksByServiceQueryHandler = new GetTasksByServiceQueryHandler(serviceRepository);

export const getTasksByService = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: "Service ID is required" });
            return;
        }

        const query = new GetTasksByServiceQuery(id);
        const tasks = await getTasksByServiceQueryHandler.handle(query);

        if (!tasks || tasks.length === 0) {
            res.status(404).json({ message: "No tasks found for the specified service" });
            return;
        }

        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error fetching tasks by service:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};