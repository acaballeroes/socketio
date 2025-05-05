import "reflect-metadata";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import { initializeSocketEvents } from "./infrastructure/socket/socket-events";
import { servicesRouter } from "./infrastructure/routes/services-router";
import { startTaskUpdatedListener } from "./infrastructure/messaging/task-updated-listener";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH"],
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH"],
  },
});

initializeSocketEvents(io);
app.set("io", io);
app.use("/services", servicesRouter);

// Function to initialize RabbitMQ listener
const initializeRabbitMQ = async () => {
  try {
    await startTaskUpdatedListener();
    console.log("RabbitMQ listener started successfully.");
  } catch (error) {
    console.error("Failed to start RabbitMQ listener:", error);
    throw error; // Prevent server from starting if RabbitMQ fails
  }
};

// Function to start the server
const startServer = async () => {
  try {
    await initializeRabbitMQ(); // Ensure RabbitMQ is ready before starting the server

    server.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });

    console.log("Server is running...");
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1); // Exit the process if the server fails to start
  }
};

// Graceful shutdown
const handleShutdown = () => {
  console.log("Shutting down server...");
  server.close(() => {
    console.log("HTTP server closed.");
    process.exit(0);
  });
};

process.on("SIGINT", handleShutdown);
process.on("SIGTERM", handleShutdown);

// Start the server
startServer();
