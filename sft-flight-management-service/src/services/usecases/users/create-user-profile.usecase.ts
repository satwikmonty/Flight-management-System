import { create } from '../../../integration/rds/client/users/user.profile.client';
import type { CreateUserProfileRequest } from '../../../types/dto/user-profile-request.dto';
import type { CreateUserProfileResponse } from '../../../types/dto/user-profile-response.dto';
import type { UserProfileAttributes } from '../../../types/rds/user-profile-attributes.type';

export const execute = async (
  createUserProfileRequest: CreateUserProfileRequest
): Promise<CreateUserProfileResponse> => {
  console.log(`Create UserProfile Request: ${JSON.stringify(createUserProfileRequest, null, 4)}`);

  const newProfile = await create(createUserProfileRequest as Omit<UserProfileAttributes, 'id'>);

  return {
    id: newProfile.id,
  };
};
