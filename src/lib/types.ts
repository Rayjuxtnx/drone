export type ServiceType =
  | 'Aerial Photography'
  | 'Delivery'
  | 'Security Surveillance'
  | 'Agriculture Mapping'
  | 'Infrastructure Inspection';

export const serviceTypes: ServiceType[] = [
    'Aerial Photography',
    'Delivery',
    'Security Surveillance',
    'Agriculture Mapping',
    'Infrastructure Inspection'
];

export type MissionStatus =
  | 'Pending'
  | 'Accepted'
  | 'In Progress'
  | 'Completed'
  | 'Cancelled'
  | 'Rejected';

export const missionStatuses: MissionStatus[] = [
    'Pending',
    'Accepted',
    'In Progress',
    'Completed',
    'Cancelled',
    'Rejected'
];


export interface Mission {
  id: string;
  serviceType: ServiceType;
  pickupLocation: string;
  destinationLocation: string;
  dateTime: string;
  requirements?: string;
  estimatedPrice: number;
  status: MissionStatus;
  droneId?: string;
  operatorId?: string;
  customerId: string;
  telemetry?: {
    speed: number;
    altitude: number;
    battery: number;
    location: {
      lat: number;
      lng: number;
    };
  };
  eta?: string;
}

export type DroneStatus = 'Available' | 'In Mission' | 'Maintenance' | 'Offline';
export const droneStatuses: DroneStatus[] = ['Available', 'In Mission', 'Maintenance', 'Offline'];

export interface Drone {
  id: string;
  model: string;
  status: DroneStatus;
  battery: number;
  location: {
    lat: number;
    lng: number;
  };
  maintenanceLogs: { date: string; notes: string }[];
}

export type UserRole = 'customer' | 'operator' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
