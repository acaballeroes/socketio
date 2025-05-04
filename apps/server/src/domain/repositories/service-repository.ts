import { Service, Task } from "../entities";

export interface IServiceRepository {
  getAllServices(): Service[];

  getServiceById(id: string): Service;

  createService(service: Service): Service;

  addTaskToService(serviceId: string, task: Task): Task;

  getTasksByService(serviceId: string): Task[];
}
