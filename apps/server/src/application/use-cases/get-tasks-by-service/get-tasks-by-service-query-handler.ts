import { Service, Task } from "../../../domain/entities";
import { IServiceRepository } from "../../../domain/repositories";
import { GetTasksByServiceQuery } from './get-tasks-by-service-query';
import { IQueryHandler } from "../../abstractions";

export class GetTasksByServiceQueryHandler implements IQueryHandler<GetTasksByServiceQuery, Task[]>
{
  constructor(private serviceRepository: IServiceRepository) {}

  handle(query: GetTasksByServiceQuery): Promise<Task[]> {
    return Promise.resolve(this.serviceRepository.getTasksByService(query.id));
  }
}
