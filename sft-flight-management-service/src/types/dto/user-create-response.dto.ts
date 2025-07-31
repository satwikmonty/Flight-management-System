import { z } from 'zod';
import type { CreateUserResponseSchema } from '../../utils/schemas/users/create-user.schema';
import type { GetUserResponseSchema } from '../../utils/schemas/users/get-user.schema';


export type CreateUserResponse = z.infer<typeof CreateUserResponseSchema>;
export type GetUserResponse = z.infer<typeof GetUserResponseSchema>;
export type GetAllUsersResponse = {
    id: number;
    userId: string;
    firstName:string;
    lastName:string;
    email:string;
    password: string;
    userType: string;
    loginStatus:number;
};