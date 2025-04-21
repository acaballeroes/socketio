import { Service } from '../../domain/entities/Service.js';
import { v4 as uuidv4 } from 'uuid';

export class CreateService {
  constructor(serviceRepository) {
    this.serviceRepository = serviceRepository;
  }

  execute(name, description) {
    const newService = new Service(uuidv4(), name, description);
    return this.serviceRepository.createService(newService);
  }
}
