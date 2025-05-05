import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import {
  CreateServiceCommand,
  CreateServiceCommandHandler,
} from "../../../application/use-cases/create-service";
import { CustomServer } from "../../socket/socket-events";

@injectable()
export class CreateServiceController {
  constructor(
    @inject("CreateServiceCommandHandler")
    private createServiceCommandHandler: CreateServiceCommandHandler
  ) {}

  async handle(req: Request, res: Response) {
    const { name, description } = req.body;

    const command = new CreateServiceCommand(name, description);
    const newService = await this.createServiceCommandHandler.handle(command);

    const io = req.app.get("io") as CustomServer;
    io.onNewService?.(newService);

    res.json(newService);
  }
}
