import "reflect-metadata";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import { initializeSocketEvents } from "./infrastructure/socket/socket-events";
import { servicesRouter } from "./infrastructure/routes/services-router";

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

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
