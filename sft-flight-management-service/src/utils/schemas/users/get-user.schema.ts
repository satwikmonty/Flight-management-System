import {z} from 'zod';
import { UserType } from '../../enums/user-type.enum';

export const GetUserRequestSchema = z.object({
    id: z.number({
        required_error: 'User ID is required',
        invalid_type_error: 'User ID is invalid, it should be a number',
    }),
});

export const GetUserResponseSchema = z.object({
    id: z.number(),
    userId: z.string(),
    firstName: z.string(),
    lastName:z.string(),
    email:z.string(),
    password: z.string(),
    flightType: z.nativeEnum(UserType),
    loginStatus:z.number(),
});

export const GetAllUsersResponseSchema = z.array(GetUserResponseSchema);