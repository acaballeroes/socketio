import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import {
  AddTaskServiceCommand,
  AddTaskServiceCommandHandler,
} from "../../../application/use-cases/services/add-task-service";
import { CustomServer } from "../../messaging/socket/socket-events";

@injectable()
export class AddTaskServiceController {
  constructor(
    @inject("AddTaskServiceCommandHandler")
    private addTaskServiceCommandHandler: AddTaskServiceCommandHandler
  ) {}

  async handle(req: Request, res: Response) {
    const { name, description, status } = req.body;

    const command = new AddTaskServiceCommand(
      req.params.id,
      name,
      description,
      status
    );
    const newTask = await this.addTaskServiceCommandHandler.handle(command);

    const io = req.app.get("io") as CustomServer;
    io.onNewTask?.(newTask, req.params.id);

    res.json(newTask);
  }
}
