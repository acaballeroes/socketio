import { Task } from "../../../domain/entities";
import { IQuery } from "../../abstractions";

export class GetTasksByServiceQuery implements IQuery<Task[]> {
    constructor(public readonly id: string) {}
}