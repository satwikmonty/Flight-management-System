import {z} from 'zod';
import { FlightType } from '../../enums/flight-type.enum';

export const GetFlightRequestSchema = z.object({
    id: z.number({
        required_error: 'Flight ID is required',
        invalid_type_error: 'Flight ID is invalid, it should be a number',
    }),
});

export const GetFlightResponseSchema = z.object({
    id: z.number(),
    flightNumber: z.string(),
    flightName: z.string(),
    economySeatingCapacity: z.number(),
    businessSeatingCapacity: z.number(),
    economyReservationCapacity: z.number(),
    businessReservationCapacity: z.number(),
    flightType: z.nativeEnum(FlightType),
    isActive:z.number(),
});

export const GetAllFlightsResponseSchema = z.array(GetFlightResponseSchema);