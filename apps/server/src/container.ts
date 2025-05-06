import "reflect-metadata";
import { container } from "tsyringe";
import {
  InMemoryServiceRepository,
  InMemoryTaskRepository,
} from "./infrastructure/repositories";
import { CreateServiceCommandHandler } from "./application/use-cases/services/create-service";
import { GetServicesQueryHandler } from "./application/use-cases/services/get-services";
import { GetServiceByIdQueryHandler } from "./application/use-cases/services/get-service-by-id";
import { GetTasksByServiceQueryHandler } from "./application/use-cases/services/get-tasks-by-service";
import { AddTaskServiceCommandHandler } from "./application/use-cases/services/add-task-service";
import { IServiceRepository } from "./domain/repositories";
import { ITaskRepository } from "./domain/repositories/task-repository";
import { UpdateStatusTaskCommandHandler } from "./application/use-cases/tasks/update-task-status/update-task-status-command-handler";

function registerDependencies() {
  registerRepositories();
  registerCommandHandlers();
  registerQueryHandlers();
}

function registerRepositories() {
  container.register<IServiceRepository>("ServiceRepository", {
    useClass: InMemoryServiceRepository,
  });

  container.register<ITaskRepository>("TaskRepository", {
    useClass: InMemoryTaskRepository,
  });
}

function registerCommandHandlers() {
  container.registerSingleton<CreateServiceCommandHandler>(
    "CreateServiceCommandHandler",
    CreateServiceCommandHandler
  );

  container.register<AddTaskServiceCommandHandler>(
    "AddTaskServiceCommandHandler",
    AddTaskServiceCommandHandler
  );

  container.register<UpdateStatusTaskCommandHandler>(
    "UpdateStatusTaskCommandHandler",
    UpdateStatusTaskCommandHandler
  );
}

function registerQueryHandlers() {
  container.registerSingleton<GetServicesQueryHandler>(
    "GetServicesQueryHandler",
    GetServicesQueryHandler
  );

  container.register<GetServiceByIdQueryHandler>(
    "GetServiceByIdQueryHandler",
    GetServiceByIdQueryHandler
  );

  container.register<GetTasksByServiceQueryHandler>(
    "GetTasksByServiceQueryHandler",
    GetTasksByServiceQueryHandler
  );
}

registerDependencies();

export { container };
