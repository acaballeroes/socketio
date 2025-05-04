import { Service } from "../../../domain/entities";
import { IQuery } from "../../abstractions";

export class GetServiceByIdQuery implements IQuery<Service> {
  constructor(public readonly id: string) {}
}
