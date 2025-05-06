import amqp from "amqplib";
import { Task } from "../../../domain/entities";

const QUEUE_NAME = "tasks.created.queue";

export const publishTaskCreated = async (task: Task) => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: true });

    const message = JSON.stringify(task);
    channel.sendToQueue(QUEUE_NAME, Buffer.from(message), { persistent: true });

    console.log(`Task created message sent to ${QUEUE_NAME}:`, task);

    await channel.close();
    await connection.close();
  } catch (error) {
    console.error("Error in Task Created Publisher:", error);
  }
};
