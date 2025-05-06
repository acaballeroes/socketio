import { Service } from "../../domain/entities";

export const services: Service[] = [
  {
    id: "25db8546-b2fb-45b6-9704-3002421450ed",
    name: "Service 1",
    description: "Description of Service 1",
    tasks: [
      {
        id: "1d3392b7-816d-44df-9dd2-1e45c621670d",
        name: "Task 1",
        description: "Description of Task 1",
        status: "pending",
      },
    ],
  },
  {
    id: "a2acba64-cb55-4b7d-a579-f6fb42c0c741",
    name: "Service 2",
    description: "Description of Service 2",
    tasks: [],
  },
];
