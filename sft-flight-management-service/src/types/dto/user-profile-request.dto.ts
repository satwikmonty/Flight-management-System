import { z } from 'zod';
import type { CreateUserProfileRequestSchema } from '../../utils/schemas/users/create-user-profile.schema';
import type { GetUserProfileRequestSchema } from '../../utils/schemas/users/get-user-profile.schema';

export type CreateUserProfileRequest = z.infer<typeof CreateUserProfileRequestSchema>;

export type GetUserProfileRequest = z.infer<typeof GetUserProfileRequestSchema>;