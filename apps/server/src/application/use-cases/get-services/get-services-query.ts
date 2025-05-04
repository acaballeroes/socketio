import { Service } from "../../../domain/entities";
import { IQuery } from "../../abstractions";

export class GetServicesQuery implements IQuery<Service[]> {
  constructor() {}
}
