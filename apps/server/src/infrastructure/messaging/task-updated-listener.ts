import amqp from "amqplib";
import { Task } from "../../domain/entities";

const QUEUE_NAME = "task.updated.queue";

export const startTaskUpdatedListener = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: true });

    console.log(`Listening for messages on ${QUEUE_NAME}...`);

    channel.consume(QUEUE_NAME, async (message: any) => {
      if (message) {
        const task: Task = JSON.parse(message.content.toString());
        console.log(`Received task update:`, task);

        // Update the task's status in your repository or database
        // Example: await taskRepository.updateTaskStatus(task.id, task.status);

        channel.ack(message);
      }
    });
  } catch (error) {
    console.error("Error in Task Updated Listener:", error);
  }
};
