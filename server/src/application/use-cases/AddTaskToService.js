import { Task } from '../../domain/entities/Task.js';
import { v4 as uuidv4 } from 'uuid';

export class AddTaskToService {
  constructor(serviceRepository) {
    this.serviceRepository = serviceRepository;
  }

  execute(serviceId, name, description, status) {
    const newTask = new Task(uuidv4(), name, description, status);
    return this.serviceRepository.addTaskToService(serviceId, newTask);
  }
}
