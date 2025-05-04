import { Router } from "express";
import { createService , getAllServices, getServiceById, getTasksByService, addTaskToService } from "./services";

const servicesRouter = Router();

servicesRouter.get("/", getAllServices);
servicesRouter.get("/:id", getServiceById);
servicesRouter.get("/:id/tasks", getTasksByService);
servicesRouter.post("/", createService);
servicesRouter.post("/:id/tasks", addTaskToService);

export { servicesRouter };
