import { v4 as uuidv4 } from 'uuid';
import { IServiceRepository } from '../../domain/repositories';
import { Task } from '../../domain/entities';

export class AddTaskToService {
  constructor(private serviceRepository: IServiceRepository) {}

  execute(
    serviceId: string,
    name: string,
    description: string,
    status: string
  ) {
    const newTask: Task = { id: uuidv4(), name, description, status };
    return this.serviceRepository.addTaskToService(serviceId, newTask);
  }
}
