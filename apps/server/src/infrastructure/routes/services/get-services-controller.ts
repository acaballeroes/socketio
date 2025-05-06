import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import {
  GetServicesQuery,
  GetServicesQueryHandler,
} from "../../../application/use-cases/services/get-services";

@injectable()
export class GetServiceController {
  constructor(
    @inject("GetServicesQueryHandler")
    private getServicesQueryHandler: GetServicesQueryHandler
  ) {}

  async handle(_: Request, res: Response) {
    const query = new GetServicesQuery();
    const services = await this.getServicesQueryHandler.handle(query);
    res.json(services);
  }
}
