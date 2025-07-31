import {z} from 'zod';
import { GetRouteResponseSchema } from './get-route.schema';

export const UpdateRouteRequestSchema = z.object({
    id: z.number({
        required_error: 'Route ID is required for update',
        invalid_type_error: 'Route ID must be a number',
    }),
    updates: z.object({
        source: z.string().optional(),
        destination: z.string().optional(),
        distance: z.number().optional(),
        fare: z.number().optional(),
        isActive:z.number().optional(),
    }),
});


export const UpdateRouteResponseSchema = GetRouteResponseSchema;