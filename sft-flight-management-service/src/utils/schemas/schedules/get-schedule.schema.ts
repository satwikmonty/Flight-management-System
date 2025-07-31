import {z} from 'zod';

export const GetScheduleRequestSchema = z.object({
    id: z.number({
        required_error: 'Schedule ID is required',
        invalid_type_error: 'Schedule ID is invalid, it should be a number',
    }),
});

export const GetScheduleResponseSchema = z.object({
    id: z.number(),
    flightId: z.number(),
    travelDuration: z.number(),
    availableDays: z.string(),
    departureTime: z.coerce.date(),
    routeId: z.number(),
    isActive:z.number()
});

export const GetAllSchedulesResponseSchema = z.array(GetScheduleResponseSchema);
