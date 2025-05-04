import { Task } from "../../../domain/entities";
import { IServiceRepository } from "../../../domain/repositories";
import { GetTasksByServiceQuery } from "./get-tasks-by-service-query";
import { IQueryHandler } from "../../abstractions";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetTasksByServiceQueryHandler
  implements IQueryHandler<GetTasksByServiceQuery, Task[]>
{
  constructor(
    @inject("ServiceRepository") private serviceRepository: IServiceRepository
  ) {}

  handle(query: GetTasksByServiceQuery): Promise<Task[]> {
    return Promise.resolve(this.serviceRepository.getTasksByService(query.id));
  }
}
