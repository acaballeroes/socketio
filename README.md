# PILOT Project

This project is a real-time application built using Socket.IO for WebSocket communication and RabbitMQ for message brokering. It follows the principles of **Clean Architecture** to ensure scalability, maintainability, and testability.

---

## What is Clean Architecture?

Clean Architecture, introduced by Robert C. Martin (Uncle Bob), is a software design philosophy that emphasizes separation of concerns and independence of frameworks, databases, and user interfaces. The architecture is structured in concentric layers, where the innermost layers are the most abstract and the outermost layers are the most concrete.

### Key Principles of Clean Architecture:
1. **Independence**: The business rules are independent of frameworks, databases, or external systems.
2. **Testability**: The architecture makes it easy to test the core business logic without relying on external dependencies.
3. **Separation of Concerns**: Each layer has a specific responsibility, reducing coupling and increasing cohesion.

### Clean Architecture Diagram

Below is a simplified representation of Clean Architecture:

![Clean Architecture Diagram](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)

- **Enterprise Business Rules (Entities)**: Represent the core business rules and are independent of any external systems.
- **Application Business rules (Use Cases)**: Contain the application-specific business rules and orchestrate the flow of data to and from entities.
- **Interface Adapters (Controllers, Gateways, presenters)**: Convert data from the format most convenient for use cases and entities to the format required by external systems.
- **Frameworks & Drivers ()**: Represent the outermost layer, including frameworks, databases, and external APIs.


## Architecture Overview

This project is structured according to Clean Architecture principles:

- **Entities**: Core business logic and domain models.
- **Use Cases**: Application-specific business rules, such as message processing and WebSocket communication.
- **Interface Adapters**: Adapters for RabbitMQ, Socket.IO, and other external systems.
- **Frameworks & Drivers**: Includes the Node.js runtime, Express.js, and RabbitMQ.

---

## RabbitMQ Management UI

Access the RabbitMQ Management UI at [http://localhost:15672](http://localhost:15672)  
Default username/password: `guest/guest`

---

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

---

## Contributing

Contributions are welcome! Please follow the Clean Architecture principles when adding new features or refactoring existing code.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.