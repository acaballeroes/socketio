# Socket.IO Project

This project is a real-time application built using Socket.IO for WebSocket communication and RabbitMQ for message brokering.

## Installation

npm install

npm run dev

To start the required services using Docker, run:
```bash
docker compose up -d
```

## Common Terminal Commands

Here are some commonly used commands for this project:

- Install dependencies:
  ```bash
  npm install
  ```

- Start the development server:
  ```bash
  npm run dev
  ```

- Start services with Docker:
  ```bash
  docker compose up -d
  ```

## Architecture

The project consists of the following components:

### RabbitMQ Management UI

Access the RabbitMQ Management UI at http://localhost:15672 
default username/password: guest/guest