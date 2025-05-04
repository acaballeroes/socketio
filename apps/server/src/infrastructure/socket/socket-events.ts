import { DefaultEventsMap, Server, Socket } from "socket.io";
import { Service, Task } from "../../domain/entities";

export interface CustomServer
  extends Server<DefaultEventsMap, DefaultEventsMap> {
  onNewService?: (service: Service) => void;
  onNewTask?: (task: Task, serviceId: string) => void;
}

export const initializeSocketEvents = (io: CustomServer) => {
  io.on("connection", (socket: Socket) => {
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  io.onNewService = (service: Service) => {
    io.emit("newService", service);
  };

  // Emit event for new task addition
  io.onNewTask = (task: Task, serviceId: string) => {
    io.emit("newTask", { task, serviceId });
  };
};
