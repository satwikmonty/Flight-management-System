import { z } from 'zod';

export const flightSearchSchema = z.object({
  from: z.string().min(1, { message: "Source is required" }),
  to: z.string().min(1, { message: "Destination is required" }),
  departure: z.string().min(1, { message: "Departure date is required" }),
  return: z.string().optional(),
  passengers: z
    .number({ invalid_type_error: "Must select number of passengers" })
    .min(1, { message: "At least 1 passenger required" })
});

export interface FlightSearchFormData {
  from: string;
  to: string;
  departure: string;
  return?: string;   
  passengers: number;
}
