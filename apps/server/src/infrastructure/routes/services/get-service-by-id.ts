import { Request, Response } from "express";
import { GetServiceByIdQuery, GetServiceByIdQueryHandler } from "../../../application/use-cases/get-service-by-id";
import { InMemoryServiceRepository } from "../../repositories";

const serviceRepository = new InMemoryServiceRepository();
const getServicesByIdQueryHandler = new GetServiceByIdQueryHandler(serviceRepository);

export const getServiceById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: "Service ID is required" });
            return;
        }

        const query = new GetServiceByIdQuery(id);
        const service = await getServicesByIdQueryHandler.handle(query);

        if (!service) {
            res.status(404).json({ message: "Service not found" });
            return;
        }

        res.json(service);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({ message: "An error occurred", error: errorMessage });
    }
};
