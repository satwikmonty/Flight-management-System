import { z } from 'zod';
import type { CreateScheduleResponseSchema } from '../../utils/schemas/schedules/create-schedule.schema.js';
import type {GetAllSchedulesResponseSchema, GetScheduleResponseSchema} from '../../utils/schemas/schedules/get-schedule.schema.js'

export type CreateScheduleResponse = z.infer<typeof CreateScheduleResponseSchema>;
export type GetScheduleResponse = z.infer<typeof GetScheduleResponseSchema>;
export type GetAllSchedulesResponse = {
    id: number;
    flightId: number;
    travelDuration: number;
    availableDays: string;
    departureTime: Date;
    routeId: number;
    isActive:number;
};

export type UpdateScheduleResponse = z.infer<typeof GetScheduleResponseSchema>