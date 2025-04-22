import { Service } from "../../domain/entities";
import { ICommand } from "../abstractions/command";

export class CreateServiceCommand implements ICommand<Service> {
    constructor(public readonly name: string, public readonly description: string) {}
}