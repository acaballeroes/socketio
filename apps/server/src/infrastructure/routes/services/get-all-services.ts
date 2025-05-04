import { Request, Response } from "express";
import { GetServicesQuery, GetServicesQueryHandler } from "../../../application/use-cases/get-services";
import { InMemoryServiceRepository } from "../../repositories";

const serviceRepository = new InMemoryServiceRepository();
const getServicesQueryHandler = new GetServicesQueryHandler(serviceRepository);

export const getAllServices = async (_: Request, res: Response) => {
  const query = new GetServicesQuery();
  const services = await getServicesQueryHandler.handle(query);
  res.json(services);
};