import { Task } from "../../../../domain/entities";
import { ICommand } from "../../../abstractions";

export class UpdateStatusTaskCommand implements ICommand<Task> {
  constructor(
    public readonly taskId: string,
    public readonly status: string
  ) {}
}
