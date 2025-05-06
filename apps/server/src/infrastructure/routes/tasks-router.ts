import { Router } from "express";
import { container } from "../../container";
import { UpdateStatusTaskController } from "./tasks";

const tasksRouter = Router();

const updateStatusTaskController = container.resolve(
  UpdateStatusTaskController
);

tasksRouter.patch("/:id/status", (req, res) =>
  updateStatusTaskController.handle(req, res)
);

export { tasksRouter };
