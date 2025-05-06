import { Task } from "../entities";

export interface ITaskRepository {
  getAllTask(): Promise<Task[]>;

  getTaskById(id: string): Promise<Task>;

  createTask(serviceId: string, task: Task): Promise<Task>;

  getTasksByService(serviceId: string): Promise<Task[]>;

  updateTask(task: Task): Promise<Task>;
}
