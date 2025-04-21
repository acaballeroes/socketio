import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { servicesRouter } from './infrastructure/routes/services.js';
import { initializeSocketEvents } from './socket-events.js';

const PORT = 4000;

const app = express();

// Middlewares
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH'],
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create HTTP and WebSocket servers
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH'],
  },
});

// Initialize WebSocket events
initializeSocketEvents(io);

// Pass `io` to routes
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use('/services', servicesRouter);

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
