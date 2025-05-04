import { Request, Response } from "express";
import { AddTaskServiceCommand, AddTaskServiceCommandHandler } from "../../../application/use-cases/add-task-service";
import { CustomServer } from "../../socket/socket-events";
import { InMemoryServiceRepository } from "../../repositories";

const serviceRepository = new InMemoryServiceRepository();
const addTaskServiceCommandHandler = new AddTaskServiceCommandHandler(serviceRepository);

export const addTaskToService = async (req: Request, res: Response) => {
  const { name, description, status } = req.body;

  const command = new AddTaskServiceCommand(req.params.id, name, description, status);
  const newTask = await addTaskServiceCommandHandler.handle(command);

  // Emit WebSocket event for new task
  const io = req.app.get("io") as CustomServer;
  io.onNewTask?.(newTask, req.params.id);

  res.json(newTask);
};