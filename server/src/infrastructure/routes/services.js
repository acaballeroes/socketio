import express from 'express';
import { InMemoryServiceRepository } from '../data/services.js';
import { CreateService } from '../../application/use-cases/CreateService.js';
import { AddTaskToService } from '../../application/use-cases/AddTaskToService.js';

const servicesRouter = express.Router();
const serviceRepository = new InMemoryServiceRepository();
const createService = new CreateService(serviceRepository);
const addTaskToService = new AddTaskToService(serviceRepository);

// Get all services
servicesRouter.get('/', (_, res) => {
  res.json(serviceRepository.getAllServices());
});

// Get a service by ID
servicesRouter.get('/:id', (req, res) => {
  const service = serviceRepository.getServiceById(req.params.id);
  if (!service) {
    return res.status(404).json({ message: 'Service not found' });
  }
  res.json(service);
});

// Get all tasks of a service
servicesRouter.get('/:id/tasks', (req, res) => {
  const service = serviceRepository.getServiceById(req.params.id);
  if (!service) {
    return res.status(404).json({ message: 'Service not found' });
  }
  res.json(service.tasks);
});

// Add a task to a service
servicesRouter.post('/:id/tasks', (req, res) => {
  const { name, description, status } = req.body;
  try {
    const newTask = addTaskToService.execute(
      req.params.id,
      name,
      description,
      status
    );

    // Emit WebSocket event for new task
    req.io.onNewTask(newTask, req.params.id);

    res.json(newTask);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Create a new service
servicesRouter.post('/', (req, res) => {
  const { name, description } = req.body;
  const newService = createService.execute(name, description);

  // Emit WebSocket event for new service
  req.io.onNewService(newService);

  res.json(newService);
});

export { servicesRouter };
