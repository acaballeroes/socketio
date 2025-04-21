import { Request, Response, Router } from 'express';
import { InMemoryServiceRepository } from '../data/services-repository';
import { CreateService } from '../../application/use-cases/create-service';
import { AddTaskToService } from '../../application/use-cases/add-task-service';
import { CustomServer } from '../../socket-events';

const servicesRouter = Router();
const serviceRepository = new InMemoryServiceRepository();
const createService = new CreateService(serviceRepository);
const addTaskToService = new AddTaskToService(serviceRepository);

// Get all services
servicesRouter.get('/', (_, res: Response) => {
  res.json(serviceRepository.getAllServices());
});

// Get a service by ID
servicesRouter.get('/:id', (req: any, res: any) => {
  const service = serviceRepository.getServiceById(req.params.id);
  if (!service) {
    return res.status(404).json({ message: 'Service not found' });
  }
  res.json(service);
});

// Get all tasks of a service
servicesRouter.get('/:id/tasks', (req: any, res: any) => {
  const service = serviceRepository.getServiceById(req.params.id);
  if (!service) {
    return res.status(404).json({ message: 'Service not found' });
  }
  res.json(service.tasks);
});

// Add a task to a service
servicesRouter.post('/:id/tasks', (req: Request, res: Response) => {
  const { name, description, status } = req.body;
  try {
    const newTask = addTaskToService.execute(
      req.params.id,
      name,
      description,
      status
    );

    // // Emit WebSocket event for new task
    // req.io.onNewTask(newTask, req.params.id);
    const io = req.app.get('io') as CustomServer;
    io.onNewTask?.(newTask, req.params.id);

    res.json(newTask);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(404).json({ message: errorMessage });
  }
});

// Create a new service
servicesRouter.post('/', (req: Request, res: Response) => {
  const { name, description } = req.body;
  const newService = createService.execute(name, description);

  // // Emit WebSocket event for new service
  // req.io.onNewService(newService);
  const io = req.app.get('io') as CustomServer;
  io.onNewService?.(newService);

  res.json(newService);
});

export { servicesRouter };
