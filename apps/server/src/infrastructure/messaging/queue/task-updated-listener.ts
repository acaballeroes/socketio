import amqp from "amqplib";
import { container } from "../../../container";
import { UpdateStatusTaskCommand } from "../../../application/use-cases/tasks/update-task-status/update-task-status-command";
import { UpdateStatusTaskCommandHandler } from "../../../application/use-cases/tasks/update-task-status/update-task-status-command-handler";

const QUEUE_NAME = "task.updated.queue";

export const startTaskUpdatedListener = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: true });

    console.log(`Listening for messages on ${QUEUE_NAME}...`);

    channel.consume(QUEUE_NAME, async (message: any) => {
      if (message) {
        const taskUpdate = JSON.parse(message.content.toString());
        console.log(`Received task update:`, taskUpdate);

        const { id, status } = taskUpdate;

        try {
          const updateStatusTaskCommandHandler = container.resolve(
            UpdateStatusTaskCommandHandler
          );

          const command = new UpdateStatusTaskCommand(id, status);
          const updatedTask =
            await updateStatusTaskCommandHandler.handle(command);

          console.log(`Task updated successfully:`, updatedTask);
        } catch (error) {
          if (error instanceof Error) {
            console.error(`Failed to update task:`, error.message);
          } else {
            console.error(`Failed to update task:`, error);
          }
        }

        channel.ack(message);
      }
    });
  } catch (error) {
    console.error("Error in Task Updated Listener:", error);
  }
};
