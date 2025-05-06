import { Task } from "../../domain/entities";
import { ITaskRepository } from "../../domain/repositories/task-repository";
import { services } from "../data/services-data";
import { publishTaskCreated } from "../messaging/queue/task-created-publisher";

export class InMemoryTaskRepository implements ITaskRepository {
  getAllTask(): Promise<Task[]> {
    const allTasks: Task[] = [];
    services.forEach((service) => {
      allTasks.push(...service.tasks);
    });

    return Promise.resolve(allTasks);
  }

  getTaskById(id: string): Promise<Task> {
    //return the task with the given id
    const allTasks: Task[] = [];
    services.forEach((service) => {
      allTasks.push(...service.tasks);
    });

    const task = allTasks.find((task) => task.id === id);
    if (!task) {
      throw new Error("Task not found");
    }

    return Promise.resolve(task);
  }

  createTask(serviceId: string, task: Task): Promise<Task> {
    const service = services.find((service) => service.id === serviceId);
    if (!service) {
      throw new Error("Service not found");
    }
    service.tasks.push(task);

    publishTaskCreated(task);

    return Promise.resolve(task);
  }

  getTasksByService(serviceId: string): Promise<Task[]> {
    const service = services.find((service) => service.id === serviceId);
    if (!service) {
      throw new Error("Service not found");
    }
    return Promise.resolve(service.tasks);
  }

  updateTask(task: Task): Promise<Task> {
    const allTasks: Task[] = [];
    services.forEach((service) => {
      allTasks.push(...service.tasks);
    });

    const existingTaskIndex = allTasks.findIndex((t) => t.id === task.id);
    if (existingTaskIndex === -1) {
      throw new Error("Task not found");
    }

    allTasks[existingTaskIndex] = task;

    // Publish task updated queue message
    return Promise.resolve(task);
  }
}
