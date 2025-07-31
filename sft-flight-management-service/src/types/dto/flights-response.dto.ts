import { z } from 'zod';
import type { CreateFlightResponseSchema } from '../../utils/schemas/flights/create-flight.schema.js';
import type {GetAllFlightsResponseSchema, GetFlightResponseSchema} from '../../utils/schemas/flights/get-flight.schema.js'
import type {UpdateFlightResponseSchema} from '../../utils/schemas/flights/update-flight.schema.js'
import { FlightType } from '../../utils/enums/flight-type.enum.js';

export type CreateFlightResponse = z.infer<typeof CreateFlightResponseSchema>;
export type GetFlightResponse = z.infer<typeof GetFlightResponseSchema>;
export type GetAllFlightsResponse = {
    id: number;
    flightNumber: string;
    flightName: string;
    economySeatingCapacity: number;
    businessSeatingCapacity: number;
    economyReservationCapacity: number;
    businessReservationCapacity: number;
    flightType: FlightType;
};

export type UpdateFlightResponse = z.infer<typeof GetFlightResponseSchema>;