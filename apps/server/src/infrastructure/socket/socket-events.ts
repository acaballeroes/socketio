import { DefaultEventsMap, Server, Socket } from 'socket.io';
import { Service, Task } from '../../domain/entities';

export interface CustomServer
  extends Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> {
  onNewService?: (service: Service) => void;
  onNewTask?: (task: Task, serviceId: string) => void;
}

export const initializeSocketEvents = (io: CustomServer) => {
  io.on('connection', (socket: Socket) => {
    console.log('A user connected');

    // Listen for disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  // Emit event for new service creation
  io.onNewService = (service: Service) => {
    io.emit('newService', service);
    console.log('Notified clients about new service:', service);
  };

  // Emit event for new task addition
  io.onNewTask = (task: Task, serviceId: string) => {
    io.emit('newTask', { task, serviceId });
    console.log(
      'Notified clients about new task:',
      task,
      'for service:',
      serviceId
    );
  };
};
