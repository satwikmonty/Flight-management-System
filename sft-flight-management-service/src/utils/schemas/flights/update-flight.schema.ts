import {z} from 'zod';
import { FlightType } from '../../enums/flight-type.enum';
import { GetFlightResponseSchema } from './get-flight.schema';

export const UpdateFlightRequestSchema = z.object({
    id: z.number({
        required_error: 'Flight ID is required for update',
        invalid_type_error: 'Flight ID must be a number',
    }),
    updates: z.object({
        flightNumber: z.string().optional(),
        flightName: z.string().optional(),
        economySeatingCapacity: z.number().optional(),
        businessSeatingCapacity: z.number().optional(),
        economyReservationCapacity: z.number().optional(),
        businessReservationCapacity: z.number().optional(),
        flightType: z.nativeEnum(FlightType).optional(),
        isActive:z.number().optional(),
    }),
});


export const UpdateFlightResponseSchema = GetFlightResponseSchema;
