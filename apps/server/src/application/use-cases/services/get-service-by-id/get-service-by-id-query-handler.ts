import { Service } from "../../../../domain/entities";
import { IServiceRepository } from "../../../../domain/repositories";
import { GetServiceByIdQuery } from "./get-service-by-id-query";
import { IQueryHandler } from "../../../abstractions";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetServiceByIdQueryHandler
  implements IQueryHandler<GetServiceByIdQuery, Service>
{
  constructor(
    @inject("ServiceRepository") private serviceRepository: IServiceRepository
  ) {}

  handle(query: GetServiceByIdQuery): Promise<Service> {
    return Promise.resolve(this.serviceRepository.getServiceById(query.id));
  }
}
