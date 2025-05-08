import { Router } from "express";
import { container } from "../../container";
import {
  AddTaskServiceController,
  CreateServiceController,
  GetServiceController,
  GetServiceByIdController,
  GetTasksByServiceController,
} from "../controllers/services";

const servicesRouter = Router();

const createServiceController = container.resolve(CreateServiceController);
const getAllServiceController = container.resolve(GetServiceController);
const addTaskServiceController = container.resolve(AddTaskServiceController);
const getServiceByIdController = container.resolve(GetServiceByIdController);
const getTasksByServiceController = container.resolve(
  GetTasksByServiceController
);

servicesRouter.get("/", (req, res) => getAllServiceController.handle(req, res));
servicesRouter.get("/:id", (req, res) =>
  getServiceByIdController.handle(req, res)
);
servicesRouter.get("/:id/tasks", (req, res) =>
  getTasksByServiceController.handle(req, res)
);
servicesRouter.post("/", (req, res) =>
  createServiceController.handle(req, res)
);
servicesRouter.post("/:id/tasks", (req, res) =>
  addTaskServiceController.handle(req, res)
);

export { servicesRouter };
