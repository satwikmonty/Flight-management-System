import {z} from 'zod';

export const GetRouteRequestSchema = z.object({
    id: z.number({
        required_error: 'Flight ID is required',
        invalid_type_error: 'Flight ID is invalid, it should be a number',
    }),
});

export const GetRouteResponseSchema = z.object({
    id: z.number(),
    source: z.string(),
    destination: z.string(),
    distance: z.number(),
    fare: z.number(),
    isActive: z.number(),
});

export const GetAllRoutesResponseSchema = z.array(GetRouteResponseSchema);
