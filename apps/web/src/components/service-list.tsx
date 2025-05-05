'use client';
import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>DESCRIPTION</TableHead>
              <TableHead># TASKS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell>{service.id}</TableCell>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell>{service.tasks.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ServiceList;
