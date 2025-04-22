import { Service } from "../../domain/entities";
import { IServiceRepository } from "../../domain/repositories";
import { ICommandHandler } from "../abstractions/command-handler";
import { CreateServiceCommand } from "./create-service-command";
import { v4 as uuidv4 } from "uuid";

export class CreateServiceCommandHandler implements ICommandHandler<CreateServiceCommand, Service> {
    constructor(private serviceRepository: IServiceRepository) {}

    handle(command: CreateServiceCommand): Promise<Service> {
      const { name, description } = command;
      const newService: Service = { id: uuidv4(), name, description, tasks: [] };
      
      return Promise.resolve(this.serviceRepository.createService(newService));
    }
  }