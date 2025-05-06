import { inject, injectable } from "tsyringe";
import { Service } from "../../../../domain/entities";
import { IServiceRepository } from "../../../../domain/repositories";
import { IQueryHandler } from "../../../abstractions";
import { GetServicesQuery } from "./get-services-query";

@injectable()
export class GetServicesQueryHandler
  implements IQueryHandler<GetServicesQuery, Service[]>
{
  constructor(
    @inject("ServiceRepository") private serviceRepository: IServiceRepository
  ) {}

  handle(_: GetServicesQuery): Promise<Service[]> {
    return Promise.resolve(this.serviceRepository.getAllServices());
  }
}
