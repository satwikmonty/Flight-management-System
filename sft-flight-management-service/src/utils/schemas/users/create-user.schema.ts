import { z } from 'zod';
import { UserType } from '../../enums/user-type.enum';

export const CreateUserRequestSchema = z.object({
    userId: z
        .string({
            //required_error: 'UserId is required',
            invalid_type_error: 'UserId is invalid, it should be min 3 chars and max 10 chars',
        })
        .min(3)
        .max(10000).optional(),
    firstName: z
        .string({
            required_error: 'First Name is required',
            invalid_type_error: 'First Name is invalid, it should be min 3 chars and max 10 chars',
        })
        .min(3)
        .max(10000), 
    lastName: z
        .string({
            required_error: 'Last Name is required',
            invalid_type_error: 'Last Name is invalid, it should be min 3 chars and max 10 chars',
        })
        .min(3)
        .max(10000),
    email: z
        .string({
            required_error: 'Email is required',
            invalid_type_error: 'Email is invalid, it should be min 3 chars and max 100 chars',
        })
        .min(3)
        .max(100),            
    password: z
        .string({
            required_error: 'Password is required',
            invalid_type_error: 'Password is invalid, it should be min 3 chars and max 20 chars',
        })
        .min(3)
        .max(20),
    userType: z.nativeEnum(UserType, {
                required_error: 'User type is required',
                invalid_type_error: `User type is invalid, it should be one of ${Object.values(UserType)}`,
            }),
    loginStatus: z
            .union([z.literal(0), z.literal(1)])
            .default(0)
            .optional(),
        
});

export const CreateUserResponseSchema = z.object({
    id: z.number(),
});
