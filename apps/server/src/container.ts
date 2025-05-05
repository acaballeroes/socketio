import "reflect-metadata";
import { container } from "tsyringe";
import { InMemoryServiceRepository } from "./infrastructure/repositories";
import { CreateServiceCommandHandler } from "./application/use-cases/create-service";
import { GetServicesQueryHandler } from "./application/use-cases/get-services";
import { GetServiceByIdQueryHandler } from "./application/use-cases/get-service-by-id";
import { GetTasksByServiceQueryHandler } from "./application/use-cases/get-tasks-by-service";
import { AddTaskServiceCommandHandler } from "./application/use-cases/add-task-service";
import { IServiceRepository } from "./domain/repositories";

container.register<IServiceRepository>("ServiceRepository", {
  useClass: InMemoryServiceRepository,
});

container.registerSingleton<CreateServiceCommandHandler>(
  "CreateServiceCommandHandler",
  CreateServiceCommandHandler
);
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
container.register<AddTaskServiceCommandHandler>(
  "AddTaskServiceCommandHandler",
  AddTaskServiceCommandHandler
);

export { container };
