import { z } from 'zod';

export const searchSchema = z
  .object({
    from: z.string().min(1, 'Departure city is required'),
    to: z.string().min(1, 'Arrival city is required'),
    departure: z.string().min(1, 'Departure date is required'),
    return: z.string().optional(),
    passengers: z.string().min(1, 'Please select number of passengers')
  })
  .refine((data) => data.from !== data.to, {
    path: ['to'],
    message: 'Departure and arrival cities must be different'
  });

export type SearchFormValues = z.infer<typeof searchSchema>;
