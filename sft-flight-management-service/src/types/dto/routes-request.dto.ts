import { z } from 'zod';
import type { CreateRouteRequestSchema } from '../../utils/schemas/routes/create-route.schema';
import type {GetRouteRequestSchema} from '../../utils/schemas/routes/get-route.schema'
import type { UpdateRouteRequestSchema } from '../../utils/schemas/routes/update-route.schema';

export type CreateRouteRequest = z.infer<typeof CreateRouteRequestSchema>;

export type GetRouteRequest = z.infer<typeof GetRouteRequestSchema>;

export type UpdateRouteRequset = z.infer<typeof UpdateRouteRequestSchema>