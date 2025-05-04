import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import {
  GetServicesQuery,
  GetServicesQueryHandler,
} from "../../../application/use-cases/get-services";

@injectable()
export class GetAllServiceController {
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
