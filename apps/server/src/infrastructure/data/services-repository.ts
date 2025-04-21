import { Service, Task } from '../../domain/entities';
import { IServiceRepository } from '../../domain/repositories';

const services: Service[] = [];

export class InMemoryServiceRepository implements IServiceRepository {
  getAllServices(): Service[] {
    return services;
  }

  getServiceById(id: string): Service {
    const service = services.find((service) => service.id === id);
    if (!service) {
      throw new Error('Service not found');
    }
    return service;
  }

  createService(service: Service): Service {
    services.push(service);
    return service;
  }

  addTaskToService(serviceId: string, task: Task): Task {
    const service = this.getServiceById(serviceId);
    if (!service) {
      throw new Error('Service not found');
    }
    service.tasks.push(task);
    return task;
  }
}
