export const initializeSocketEvents = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  // Emit event for new service creation
  io.onNewService = (service) => {
    io.emit('newService', service);
    console.log('Notified clients about new service:', service);
  };

  // Emit event for new task addition
  io.onNewTask = (task, serviceId) => {
    io.emit('newTask', { task, serviceId });
    console.log(
      'Notified clients about new task:',
      task,
      'for service:',
      serviceId
    );
  };
};
