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

![Clean Architecture Diagram](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)  
*Image credit: Robert C. Martin (Uncle Bob) - [The Clean Code Blog](https://blog.cleancoder.com/)*


- **Enterprise Business Rules (Entities)**: Represent the core business rules and are independent of any external systems.
- **Application Business rules (Use Cases)**: Contain the application-specific business rules and orchestrate the flow of data to and from entities.
- **Interface Adapters (Controllers, Gateways, presenters)**: Convert data from the format most convenient for use cases and entities to the format required by external systems.
- **Frameworks & Drivers ()**: Represent the outermost layer, including frameworks, databases, and external APIs.


###


Below is a simplified representation of Clean Architecture:


<img src="clean-architecture.png" alt="Clean Architecture Diagram" width="400" />

## Architecture Overview

This project is structured according to Clean Architecture principles:

- **Domain**: This layer contains the core business logic and domain models. It is completely independent of external systems, frameworks, or libraries. In this project, it includes the fundamental rules and data structures for real-time communication and message brokering.

- **Application**: This layer contains application-specific business rules and orchestrates the flow of data between the domain layer and the outer layers. In this project, it handles use cases such as processing WebSocket messages and managing RabbitMQ message flows.

- **Infrastructure**: This layer provides implementations for external systems and frameworks. It acts as an adapter for the application layer to interact with external dependencies. In this project, it includes:
  - Adapters for RabbitMQ to handle message brokering.
  - Integration with Socket.IO for WebSocket communication.
  - Other external systems or APIs required by the application.

- **Presentation**: This is the outermost layer responsible for interacting with the user or external systems. In this project, it includes:
  - The Node.js runtime and Express.js for handling HTTP requests and serving the application.
  - WebSocket connections managed via Socket.IO.
  - The RabbitMQ Management UI for monitoring and managing message queues.

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