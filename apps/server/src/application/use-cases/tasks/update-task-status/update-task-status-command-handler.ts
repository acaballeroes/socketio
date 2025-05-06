import { injectable, inject } from "tsyringe";
import { ICommandHandler } from "../../../abstractions";
import { UpdateStatusTaskCommand } from "./update-task-status-command";
import { Task } from "../../../../domain/entities";
import { ITaskRepository } from "../../../../domain/repositories/task-repository";

@injectable()
export class UpdateStatusTaskCommandHandler
  implements ICommandHandler<UpdateStatusTaskCommand, Task>
{
  constructor(
    @inject("TaskRepository") private taskRepository: ITaskRepository
  ) {}

  async handle(command: UpdateStatusTaskCommand): Promise<Task> {
    const { taskId, status } = command;

    const task = await this.taskRepository.getTaskById(taskId);
    if (!task) {
      throw new Error(`Task with ID ${taskId} not found`);
    }

    task.status = status;

    await this.taskRepository.updateTask(task);

    return task;
  }
}
