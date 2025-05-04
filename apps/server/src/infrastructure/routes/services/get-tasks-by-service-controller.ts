import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import {
  GetTasksByServiceQuery,
  GetTasksByServiceQueryHandler,
} from "../../../application/use-cases/get-tasks-by-service";

@injectable()
export class GetTasksByServiceController {
  constructor(
    @inject("GetTasksByServiceQueryHandler")
    private getTasksByServiceQueryHandler: GetTasksByServiceQueryHandler
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Service ID is required" });
        return;
      }

      const query = new GetTasksByServiceQuery(id);
      const tasks = await this.getTasksByServiceQueryHandler.handle(query);

      if (!tasks || tasks.length === 0) {
        res
          .status(404)
          .json({ message: "No tasks found for the specified service" });
        return;
      }

      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
