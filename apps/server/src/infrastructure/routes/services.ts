import { Request, Response, Router } from "express";
import { InMemoryServiceRepository } from "../data/services-repository";
import { CustomServer } from "../socket/socket-events";
import {
  CreateServiceCommand,
  CreateServiceCommandHandler,
} from "../../application/create-service";
import { GetServicesQueryHandler } from "../../application/get-services/get-services-query-handler";
import { GetServicesQuery } from "../../application/get-services/get-services-query";
import { AddTaskServiceCommandHandler } from "../../application/add-task-service/add-task-service-command-handler";
import { AddTaskServiceCommand } from "../../application/add-task-service/add-task-service-command";
import { GetServiceByIdQuery, GetServiceByIdQueryHandler } from "../../application/get-service-by-id";

const servicesRouter = Router();
const serviceRepository = new InMemoryServiceRepository();

// Command Handlers
const createServiceCommandHandler = new CreateServiceCommandHandler(
  serviceRepository
);
const addTaskServiceCommandHandler = new AddTaskServiceCommandHandler(
  serviceRepository
);

// Query Handlers
const getServicesQueryHandler = new GetServicesQueryHandler(serviceRepository);
const getServicesByIdQueryHandler = new GetServiceByIdQueryHandler(serviceRepository);


// Get all services
servicesRouter.get("/", async (_, res: Response) => {
  const query = new GetServicesQuery();
  const services = await getServicesQueryHandler.handle(query);
  res.json(services);
});

// Get a service by ID
servicesRouter.get("/:id", async(req: any, res: any) => {
  console.log("Get service by ID", req.params.id);
  const query = new GetServiceByIdQuery(req.params.id);
  const service = await getServicesByIdQueryHandler.handle(query);

  if (!service) {
    return res.status(404).json({ message: "Service not found" });
  }

  res.json(service);
});

// Get all tasks of a service
servicesRouter.get("/:id/tasks", (req: any, res: any) => {
  const service = serviceRepository.getServiceById(req.params.id);
  if (!service) {
    return res.status(404).json({ message: "Service not found" });
  }
  res.json(service.tasks);
});

// Create a new service
servicesRouter.post("/", async (req: Request, res: Response) => {
  const { name, description } = req.body;

  const command = new CreateServiceCommand(name, description);
  const newService = await createServiceCommandHandler.handle(command);

  // Emit WebSocket event for new service
  const io = req.app.get("io") as CustomServer;
  io.onNewService?.(newService);

  res.json(newService);
});

// Add a task to a service
servicesRouter.post("/:id/tasks", async (req: Request, res: Response) => {
  const { name, description, status } = req.body;

  const command = new AddTaskServiceCommand(
    req.params.id,
    name,
    description,
    status
  );

  const newTask = await addTaskServiceCommandHandler.handle(command);

  // // Emit WebSocket event for new task
  // req.io.onNewTask(newTask, req.params.id);
  const io = req.app.get("io") as CustomServer;
  io.onNewTask?.(newTask, req.params.id);

  res.json(newTask);
});

export { servicesRouter };
