import { DefaultEventsMap, Server, Socket } from "socket.io";
import { Service, Task } from "../../../domain/entities";

export interface CustomServer
  extends Server<DefaultEventsMap, DefaultEventsMap> {
  onUpdateTask?(task: any, id: string): unknown;
  onNewService?: (service: Service) => void;
  onNewTask?: (task: Task, serviceId: string) => void;
}

export const initializeSocketEvents = (io: CustomServer) => {
  io.on("connection", (socket: Socket) => {
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  io.onUpdateTask = (task: Task, taskId: string) => {
    io.emit("updateTask", { task, taskId });
  };

  io.onNewService = (service: Service) => {
    io.emit("newService", service);
  };

  io.onNewTask = (task: Task, serviceId: string) => {
    io.emit("newTask", { task, serviceId });
  };
};
