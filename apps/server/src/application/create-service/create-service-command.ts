import { ICommand } from "../abstractions/command";

export class CreateServiceCommand implements ICommand<void> {
    constructor(public readonly name: string, public readonly description: string) {}
}