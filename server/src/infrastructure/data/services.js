import { IServiceRepository } from '../../domain/interfaces/IServiceRepository.js';

const services = [];

export class InMemoryServiceRepository extends IServiceRepository {
  getAllServices() {
    return services;
  }

  getServiceById(id) {
    return services.find((service) => service.id === id);
  }

  createService(service) {
    services.push(service);
    return service;
  }

  addTaskToService(serviceId, task) {
    const service = this.getServiceById(serviceId);
    if (!service) {
      throw new Error('Service not found');
    }
    service.tasks.push(task);
    return task;
  }
}
