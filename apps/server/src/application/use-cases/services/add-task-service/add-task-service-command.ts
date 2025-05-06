import { Task } from "../../../../domain/entities";
import { ICommand } from "../../../abstractions";

export class AddTaskServiceCommand implements ICommand<Task> {
  constructor(
    public serviceId: string,
    public name: string,
    public description: string,
    public status: string
  ) {}
}
