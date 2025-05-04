import { Task } from "../../../domain/entities";
import { IServiceRepository } from "../../../domain/repositories";
import { ICommandHandler } from "../../abstractions";
import { v4 as uuidv4 } from "uuid";
import { AddTaskServiceCommand } from "./add-task-service-command";
import { inject, injectable } from "tsyringe";

@injectable()
export class AddTaskServiceCommandHandler
  implements ICommandHandler<AddTaskServiceCommand, Task>
{
  constructor(
    @inject("ServiceRepository") private serviceRepository: IServiceRepository
  ) {}

  handle(command: AddTaskServiceCommand): Promise<Task> {
    const newTask: Task = {
      id: uuidv4(),
      name: command.name,
      description: command.description,
      status: command.status,
    };

    return Promise.resolve(
      this.serviceRepository.addTaskToService(command.serviceId, newTask)
    );
  }
}
