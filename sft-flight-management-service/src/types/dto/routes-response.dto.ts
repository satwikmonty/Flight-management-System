import { z } from 'zod';
import type { CreateRouteResponseSchema } from '../../utils/schemas/routes/create-route.schema.js';
import type {GetAllRoutesResponseSchema, GetRouteResponseSchema} from '../../utils/schemas/routes/get-route.schema.js'

export type CreateRouteResponse = z.infer<typeof CreateRouteResponseSchema>;
export type GetRouteResponse = z.infer<typeof GetRouteResponseSchema>;
export type GetAllRoutesResponse = {
    id: number;
    source: string;
    destination: string;
    distance: number;
    fare: number;
    isActive:number;
};

export type UpdateRouteResponse = z.infer<typeof GetRouteResponseSchema>