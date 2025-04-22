import { Service } from "../../../domain/entities";
import { IQuery } from "../../abstractions/query";

export class GetServicesQuery implements IQuery<Service[]> {
    constructor() {}
}