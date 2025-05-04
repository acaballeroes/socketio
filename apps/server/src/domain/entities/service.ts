import { Task } from "./task";

export interface Service {
  id: string;
  name: string;
  description: string;
  tasks: Task[];
}
