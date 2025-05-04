'use client';
import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface Task {
  id: string;
  name: string;
  description: string;
  status: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  tasks: Task[];
}

const socket: Socket = io('http://localhost:4000', {
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.log('Connected to server');
});

const fetchServices = async (): Promise<Service[]> => {
  try {
    const response = await fetch('http://localhost:4000/services', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch services: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};

const ServiceList: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadServices = async () => {
    try {
      const data = await fetchServices();
      setServices(data);
      setError(null);
    } catch {
      setError('Failed to load services. Please try again later.');
    }
  };

  useEffect(() => {
    loadServices();

    socket.on('newService', async () => {
      console.log('New service received');
      await loadServices();
    });

    socket.on('newTask', async ({ task, serviceId }) => {
      console.log('New task received:', task, 'for service:', serviceId);
      await loadServices();
    });

    // Clean up listeners when the component unmounts
    return () => {
      socket.off('newService');
      socket.off('newTask');
    };
  }, []);

  return (
    <div>
      <h1>Service List</h1>
      {error && <p className='text-red-500'>{error}</p>}
      <div className="p-8">
        <div className='grid grid-cols-4 gap-4 font-bold'>
          <div>ID</div>
          <div>NAME</div>
          <div>DESCRIPTION</div>
          <div># TASKS</div>
        </div>
        {services.map((service) => (
          <div className='grid grid-cols-4 gap-4' key={service.id}>
            <div>{service.id}</div>
            <div>{service.name}</div>
            <div>{service.description}</div>
            <div>{service.tasks.length}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
