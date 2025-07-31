import {z} from 'zod';
import { GetScheduleResponseSchema } from './get-schedule.schema';

export const UpdateScheduleRequestSchema = z.object({
    id: z.number({
        required_error: 'Schedule ID is required for update',
        invalid_type_error: 'Schedule ID must be a number',
    }),
    updates: z.object({
        flightId: z.number().optional(),
        travelDuration: z.number().optional(),
        availableDays: z.string().optional(),
        departureTime: z.date().optional(),
        routeId: z.number().optional(),
        isActive:z.number().optional()
    }),
});


export const UpdateScheduleResponseSchema = GetScheduleResponseSchema;