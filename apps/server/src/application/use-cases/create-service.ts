import { v4 as uuidv4 } from 'uuid';
import { IServiceRepository } from '../../domain/repositories';
import { Service } from '../../domain/entities';

export class CreateService {
  constructor(private serviceRepository: IServiceRepository) {}

  execute(name: string, description: string) {
    const newService: Service = { id: uuidv4(), name, description, tasks: [] };
    return this.serviceRepository.createService(newService);
  }
}
