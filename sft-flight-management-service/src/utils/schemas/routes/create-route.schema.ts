import { z } from 'zod';

export const CreateRouteRequestSchema = z.object({
    source: z
        .string({
            required_error: 'Source is required',
            invalid_type_error: 'Source is invalid, it should be min 3 chars and max 10 chars',
        })
        .min(3)
        .max(10000),
    destination: z
        .string({
            required_error: 'Destination is required',
            invalid_type_error: 'Destination is invalid, it should be min 3 chars and max 10 chars',
        })
        .min(3)
        .max(10),
    distance: z.number({
        required_error: 'Distance is required',
        invalid_type_error: 'Distance is invalid, it should be a number',
    }),
    fare: z.number({
        required_error: 'Fare is required',
        invalid_type_error: 'Fare is invalid, it should be a number',
    }),
    isActive: z
    .union([z.literal(0), z.literal(1)])
    .default(1)
    .optional()
    
});

export const CreateRouteResponseSchema = z.object({
    id: z.number(),
});
