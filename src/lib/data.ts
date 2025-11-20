import type { Drone, Mission, User } from './types';

export const INITIAL_DRONES: Drone[] = [
  {
    id: 'drone-001',
    model: 'DJI Mavic 3 Pro',
    status: 'Available',
    battery: 98,
    location: { lat: 34.0522, lng: -118.2437 },
    maintenanceLogs: [{ date: '2024-05-01', notes: 'Routine check-up. All systems nominal.' }],
  },
  {
    id: 'drone-002',
    model: 'Autel EVO II Pro',
    status: 'In Mission',
    battery: 75,
    location: { lat: 34.055, lng: -118.25 },
    maintenanceLogs: [],
  },
  {
    id: 'drone-003',
    model: 'Skydio 2+',
    status: 'Maintenance',
    battery: 100,
    location: { lat: 34.05, lng: -118.24 },
    maintenanceLogs: [{ date: '2024-05-15', notes: 'Gimbal stabilizer replaced.' }],
  },
  {
    id: 'drone-004',
    model: 'Parrot Anafi USA',
    status: 'Available',
    battery: 92,
    location: { lat: 34.048, lng: -118.238 },
    maintenanceLogs: [],
  },
];

export const INITIAL_MISSIONS: Mission[] = [
  {
    id: 'mission-abc-123',
    serviceType: 'Aerial Photography',
    pickupLocation: '123 Main St, Los Angeles, CA',
    destinationLocation: '456 Oak Ave, Los Angeles, CA',
    dateTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    estimatedPrice: 250,
    status: 'In Progress',
    droneId: 'drone-002',
    operatorId: 'operator-1',
    customerId: 'customer-1',
    telemetry: {
      speed: 45,
      altitude: 120,
      battery: 75,
      location: { lat: 34.055, lng: -118.25 },
    },
    eta: '15 minutes',
  },
  {
    id: 'mission-def-456',
    serviceType: 'Delivery',
    pickupLocation: '789 Pine St, Los Angeles, CA',
    destinationLocation: '101 Maple Dr, Los Angeles, CA',
    dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    estimatedPrice: 75,
    status: 'Accepted',
    droneId: 'drone-001',
    operatorId: 'operator-2',
    customerId: 'customer-2',
  },
  {
    id: 'mission-ghi-789',
    serviceType: 'Security Surveillance',
    pickupLocation: 'Cyberdyne Systems, 2144 Kramer St, Los Angeles, CA',
    destinationLocation: 'Cyberdyne Systems, 2144 Kramer St, Los Angeles, CA',
    dateTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    estimatedPrice: 500,
    status: 'Pending',
    customerId: 'customer-1',
  },
];

export const INITIAL_USERS: User[] = [
  { id: 'admin-1', name: 'Admin User', email: 'admin@dronetrack.com', role: 'admin' },
  { id: 'operator-1', name: 'John Pilot', email: 'john.pilot@dronetrack.com', role: 'operator' },
  { id: 'operator-2', name: 'Jane Flyer', email: 'jane.flyer@dronetrack.com', role: 'operator' },
  { id: 'customer-1', name: 'Alice Client', email: 'alice.client@email.com', role: 'customer' },
  { id: 'customer-2', name: 'Bob Customer', email: 'bob.customer@email.com', role: 'customer' },
];
