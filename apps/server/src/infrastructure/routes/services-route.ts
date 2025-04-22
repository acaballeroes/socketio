import { Request, Response, Router } from "express";
import { InMemoryServiceRepository } from "../data/services-repository";
import { CustomServer } from "../socket/socket-events";
import {
  CreateServiceCommand,
  CreateServiceCommandHandler,
} from "../../application/use-cases/create-service";
import { GetServicesQueryHandler } from "../../application/use-cases/get-services/get-services-query-handler";
import { GetServicesQuery } from "../../application/use-cases/get-services/get-services-query";
import { AddTaskServiceCommandHandler } from "../../application/use-cases/add-task-service/add-task-service-command-handler";
import { AddTaskServiceCommand } from "../../application/use-cases/add-task-service/add-task-service-command";
import {
  GetServiceByIdQuery,
  GetServiceByIdQueryHandler,
} from "../../application/use-cases/get-service-by-id";
import { GetTasksByServiceQueryHandler } from "../../application/use-cases/get-tasks-by-service/get-tasks-by-service-query-handler";
import { GetTasksByServiceQuery } from "../../application/use-cases/get-tasks-by-service";

const servicesRouter = Router();
const serviceRepository = new InMemoryServiceRepository();

//Handlers
const createServiceCommandHandler = new CreateServiceCommandHandler(
  serviceRepository
);
const addTaskServiceCommandHandler = new AddTaskServiceCommandHandler(
  serviceRepository
);
const getServicesQueryHandler = new GetServicesQueryHandler(serviceRepository);
const getServicesByIdQueryHandler = new GetServiceByIdQueryHandler(
  serviceRepository
);
const getTasksByServiceQueryHandler = new GetTasksByServiceQueryHandler(
  serviceRepository
);

// Get all services
servicesRouter.get("/", async (_, res: Response) => {
  const query = new GetServicesQuery();
  const services = await getServicesQueryHandler.handle(query);
  res.json(services);
});

// Get a service by ID
servicesRouter.get("/:id", async (req: any, res: any) => {
  console.log("Get service by ID", req.params.id);
  const query = new GetServiceByIdQuery(req.params.id);
  const service = await getServicesByIdQueryHandler.handle(query);

  if (!service) {
    return res.status(404).json({ message: "Service not found" });
  }

  res.json(service);
});

// Get all tasks of a service
servicesRouter.get("/:id/tasks", async (req: any, res: any) => {
  const query = new GetTasksByServiceQuery(req.params.id);
  const tasks = await getTasksByServiceQueryHandler.handle(query);

  if (!tasks) {
    return res.status(404).json({ message: "Service not found" });
  }
  res.json(tasks);
});

// Create a new service
servicesRouter.post("/", async (req: Request, res: Response) => {
  const { name, description } = req.body;

  const command = new CreateServiceCommand(name, description);
  const newService = await createServiceCommandHandler.handle(command);

  // Emit WebSocket event for new service
  const io = req.app.get("io") as CustomServer;
  io.onNewService?.(newService);
  // io.emit("onNewService", newService);

  res.json(newService);
});

// Add a task to a service
servicesRouter.post("/:id/tasks", async (req: Request, res: Response) => {
  const { name, description, status } = req.body;

  /**
   * Creates a new instance of the AddTaskServiceCommand with the provided parameters.
   *
   * @param req.params.id - The unique identifier for the task.
   * @param name - The name of the task.
   * @param description - A brief description of the task.
   * @param status - The current status of the task.
   */
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
