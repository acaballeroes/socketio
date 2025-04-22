import { Service } from "../../domain/entities";
import { IServiceRepository } from "../../domain/repositories";
import { GetServiceByIdQuery } from "./get-service-by-id-query";
import { IQueryHandler } from "../abstractions";

export class GetServiceByIdQueryHandler implements IQueryHandler<GetServiceByIdQuery, Service>
{
  constructor(private serviceRepository: IServiceRepository) {}

  handle(query: GetServiceByIdQuery): Promise<Service> {
    console.log("GetServiceByIdQueryHandler", {query});
    return Promise.resolve(this.serviceRepository.getServiceById(query.id));
  }
}
