import { z } from 'zod';
import type {CreateUserRequestSchema} from '../../utils/schemas/users/create-user.schema'
import type {GetUserRequestSchema} from '../../utils/schemas/users/get-user.schema'

export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>;

export type GetUserRequest = z.infer<typeof GetUserRequestSchema>;