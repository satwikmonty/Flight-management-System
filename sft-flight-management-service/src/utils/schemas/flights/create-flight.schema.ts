import { z } from 'zod';
import { FlightType } from '../../enums/flight-type.enum.js';

export const CreateFlightRequestSchema = z.object({
	flightNumber: z
		.string({
			required_error: 'Flight number is required',
			invalid_type_error: 'Flight number is invalid, it should be min 3 chars and max 10 chars',
		})
		.min(3)
		.max(10000),
	flightName: z
		.string({
			required_error: 'Flight name is required',
			invalid_type_error: 'Flight name is invalid, it should be min 3 chars and max 20 chars',
		})
		.min(3)
		.max(20),
	economySeatingCapacity: z.number({
		required_error: 'Economy seating capacity is required',
		invalid_type_error: 'Economy seating capacity is invalid, it should be a number',
	}),
	businessSeatingCapacity: z.number({
		required_error: 'Business seating capacity is required',
		invalid_type_error: 'Business seating capacity is invalid, it should be a number',
	}),
	economyReservationCapacity: z.number({
		//required_error: 'Economy reservation capacity is required',
		invalid_type_error: 'Economy reservation capacity is invalid, it should be a number',
	}),
	businessReservationCapacity: z.number({
		//required_error: 'Economy reservation capacity is required',
		invalid_type_error: 'Economy reservation capacity is invalid, it should be a number',
	}),
	flightType: z.nativeEnum(FlightType, {
		required_error: 'Flight type is required',
		invalid_type_error: `Flight type is invalid, it should be one of ${Object.values(FlightType)}`,
	}),
	isActive: z
    .union([z.literal(0), z.literal(1)])
    .default(1)
    .optional()
});

export const CreateFlightResponseSchema = z.object({
	id: z.number(),
});
