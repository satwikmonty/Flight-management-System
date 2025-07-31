import { z } from 'zod';
import type { CreateUserProfileResponseSchema } from '../../utils/schemas/users/create-user-profile.schema';
import type { GetUserProfileResponseSchema } from '../../utils/schemas/users/get-user-profile.schema';


export type CreateUserProfileResponse = z.infer<typeof CreateUserProfileResponseSchema>;
export type GetUserProfileResponse = z.infer<typeof GetUserProfileResponseSchema>;
export type GetAllUserProfileResponse = {
    id: number;
	userId: string;
	firstName:string;
	lastName:string;
    dob:Date;
    gender:string;
    street:string;
	location:string;
	city: string;
	state: string;
    pincode:string;
    mobileNo:string;
    email:String;
};

export type UpdateUserProfileResponse = z.infer<typeof GetUserProfileResponseSchema>