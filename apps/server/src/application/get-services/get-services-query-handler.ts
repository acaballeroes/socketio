import { Service } from "../../domain/entities";
import { IServiceRepository } from "../../domain/repositories";
import { IQueryHandler } from "../abstractions/query-handler";
import { GetServicesQuery } from "./get-services-query";

export class GetServicesQueryHandler implements IQueryHandler<GetServicesQuery, Service[]> {
    constructor(private serviceRepository: IServiceRepository) {}

    handle(query: GetServicesQuery): Promise<Service[]> {      
      return Promise.resolve(this.serviceRepository.getAllServices());
    }
  }