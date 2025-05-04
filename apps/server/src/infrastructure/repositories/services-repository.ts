import { Service, Task } from '../../domain/entities';
import { IServiceRepository } from '../../domain/repositories';

const services: Service[] = [
  {
    id: "25db8546-b2fb-45b6-9704-3002421450ed",
    name: "Service 1",
    description: "Description of Service 1",
    tasks: [
      {
        id: "1d3392b7-816d-44df-9dd2-1e45c621670d",
        name: "Task 1",
        description: "Description of Task 1",
        status: "pending"
      }
    ]
  },
  {
    id: "a2acba64-cb55-4b7d-a579-f6fb42c0c741",
    name: "Service 1",
    description: "Description of Service 1",
    tasks: []
  }
];

export class InMemoryServiceRepository implements IServiceRepository {
  getAllServices(): Service[] {
    return services;
  }

  getServiceById(id: string): Service {
    console.log("id", id );
    console.log("services", {services} );
    const service = services.find((service) => service.id === id);
    console.log("service", {service} );
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

  getTasksByService(serviceId: string): Task[] {
    const service = this.getServiceById(serviceId);
    if (!service) {
      throw new Error('Service not found');
    }
    return service.tasks;
  }
}
