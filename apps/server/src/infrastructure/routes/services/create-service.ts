import { Request, Response } from "express";
import { CreateServiceCommand, CreateServiceCommandHandler } from "../../../application/use-cases/create-service";
import { CustomServer } from "../../socket/socket-events";
import { InMemoryServiceRepository } from "../../repositories";

const serviceRepository = new InMemoryServiceRepository();
const createServiceCommandHandler = new CreateServiceCommandHandler(serviceRepository);

export const createService = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  const command = new CreateServiceCommand(name, description);
  const newService = await createServiceCommandHandler.handle(command);

  // Emit WebSocket event for new service
  const io = req.app.get("io") as CustomServer;
  io.onNewService?.(newService);

  res.json(newService);
};