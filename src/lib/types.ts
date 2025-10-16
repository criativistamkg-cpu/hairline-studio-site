export type Service = {
  name: string;
  description?: string;
  price: string;
};

export type Appointment = {
  id: string;
  clientName: string;
  clientEmail: string;
  date: string; // YYYY-MM-DD format
  time: string; // HH:mm format
  service: string;
};
