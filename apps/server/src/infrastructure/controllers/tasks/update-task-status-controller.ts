import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { UpdateStatusTaskCommand } from "../../../application/use-cases/tasks/update-task-status/update-task-status-command";
import { UpdateStatusTaskCommandHandler } from "../../../application/use-cases/tasks/update-task-status/update-task-status-command-handler";
import { CustomServer } from "../../messaging/socket/socket-events";

@injectable()
export class UpdateStatusTaskController {
  constructor(
    @inject("UpdateStatusTaskCommandHandler")
    private updateStatusTaskCommandHandler: UpdateStatusTaskCommandHandler
  ) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    console.log("UpdateStatusTaskController ID", { id });
    const { status } = req.body;
    console.log("UpdateStatusTaskController STATUS", { status });

    const command = new UpdateStatusTaskCommand(id, status);
    const task = await this.updateStatusTaskCommandHandler.handle(command);

    const io = req.app.get("io") as CustomServer;
    io.onUpdateTask?.(task, req.params.id);

    res.json(task);
  }
}
