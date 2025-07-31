import { z } from 'zod';

export const CreateScheduleRequestSchema = z.object({
    flightId: z
        .number({
            required_error: 'Flight number is required',
            invalid_type_error: 'Flight number is invalid, it should be min 1 chars and max 10 chars',
        })
        .min(1)
        .max(10000),
    travelDuration: z.number({
        required_error: 'Travel Duration is required',
        invalid_type_error: 'Travel Duration is invalid, it should be a number',
    }),
    availableDays: z.string({
        required_error: 'Available Days is required',
        invalid_type_error: 'available Days is invalid, it should be a string',
    }),
    departureTime: z.coerce.date({
        required_error: 'Departure Time is required',
        invalid_type_error: 'Departure Time is invalid, it should be a date',
    }),
    routeId: z.number({
        required_error: 'Route ID is required',
        invalid_type_error: 'Route ID is invalid, it should be a number',
    }),
    is_active: z
    .union([z.literal(0), z.literal(1)])
    .default(1)
    .optional()


});

export const CreateScheduleResponseSchema = z.object({
    id: z.number(),
});
