import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import {
  GetServiceByIdQuery,
  GetServiceByIdQueryHandler,
} from "../../../application/use-cases/get-service-by-id";

@injectable()
export class GetServiceByIdController {
  constructor(
    @inject("CreateServiceCommandHandler")
    private getServicesByIdQueryHandler: GetServiceByIdQueryHandler
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ message: "Service ID is required" });
        return;
      }

      const query = new GetServiceByIdQuery(id);
      const service = await this.getServicesByIdQueryHandler.handle(query);

      if (!service) {
        res.status(404).json({ message: "Service not found" });
        return;
      }

      res.json(service);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      res
        .status(500)
        .json({ message: "An error occurred", error: errorMessage });
    }
  }
}
