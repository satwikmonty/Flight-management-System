import { z } from 'zod';
import type { CreateFlightRequestSchema } from '../../utils/schemas/flights/create-flight.schema';
import type {GetFlightRequestSchema} from '../../utils/schemas/flights/get-flight.schema';
import type {UpdateFlightRequestSchema} from '../../utils/schemas/flights/update-flight.schema';

export type CreateFlightRequest = z.infer<typeof CreateFlightRequestSchema>;

export type GetFlightRequest = z.infer<typeof GetFlightRequestSchema>;

export type UpdateFlightRequest = z.infer<typeof UpdateFlightRequestSchema>