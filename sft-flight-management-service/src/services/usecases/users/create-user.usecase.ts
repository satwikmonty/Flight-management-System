import { create } from '../../../integration/rds/client/users/user.client';
import type { CreateUserRequest } from '../../../types/dto/user-create-request.dto';
import type { CreateUserResponse } from '../../../types/dto/user-create-response.dto';
import type { UserAttributes } from '../../../types/rds/user-create-attributes.type';

export const execute = async (createUserRequest: CreateUserRequest): Promise<CreateUserResponse> => {
    console.log(`Create User Request ${JSON.stringify(createUserRequest, null, 4)}`);
    const newUser = await create(createUserRequest as Omit<UserAttributes, 'id'>);
    return {
        id: newUser.id,
    };
};