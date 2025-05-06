import { IServiceRepository } from "../../domain/repositories";
import { Service, Task } from "../../domain/entities";
import { services } from "../data/services-data";
import { publishTaskCreated } from "../messaging/queue/task-created-publisher";

export class InMemoryServiceRepository implements IServiceRepository {
  getAllServices(): Service[] {
    return services;
  }

  getServiceById(id: string): Service {
    const service = services.find((service) => service.id === id);
    if (!service) {
      throw new Error("Service not found");
    }
    return service;
  }

  createService(service: Service): Service {
    services.push(service);
    return service;
  }

  async addTaskToService(serviceId: string, task: Task): Promise<Task> {
    const service = this.getServiceById(serviceId);
    if (!service) {
      throw new Error("Service not found");
    }
    service.tasks.push(task);

    // Publish task created event
    await publishTaskCreated(task);

    return task;
  }

  getTasksByService(serviceId: string): Task[] {
    const service = this.getServiceById(serviceId);
    if (!service) {
      throw new Error("Service not found");
    }
    return service.tasks;
  }
}
