import express, { Request, Response } from 'express';
import { createServer } from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';
import { initializeSocketEvents } from './socket-events';
import { servicesRouter } from './infrastructure/routes/services';
const PORT = process.env.PORT || 4000;

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

app.set('io', io);

// // Pass `io` to routes
// app.use((req: Request, res: Response, next) => {
//   req.io = io;
//   next();
// });

app.use('/services', servicesRouter);

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
