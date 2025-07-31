import { z } from 'zod';
import type { CreateScheduleRequestSchema } from '../../utils/schemas/schedules/create-schedule.schema';
import type {GetScheduleRequestSchema} from '../../utils/schemas/schedules/get-schedule.schema'
import type { UpdateScheduleRequestSchema } from '../../utils/schemas/schedules/update-schedule.schema';

export type CreateScheduleRequest = z.infer<typeof CreateScheduleRequestSchema>;

export type GetScheduleRequest = z.infer<typeof GetScheduleRequestSchema>;

export type UpdateScheduleRequest = z.infer<typeof UpdateScheduleRequestSchema>;