import { UpdateUserProfileById } from "../../../integration/rds/client/users/user.profile.client";
import type { UpdateUserProfileResponse } from "../../../types/dto/user-profile-response.dto";

export const executeUpdateUserProfileById = async (
  id: number,
  updates: Partial<{
    firstName: string;
    lastName: string;
    dob: string;
    gender: string;
    street: string;
    location: string;
    city: string;
    state: string;
    pincode: string;
    mobileNo: string;
    email: string;
  }>
): Promise<UpdateUserProfileResponse | null> => {
  console.log(`Updating UserProfile ID: ${id}`, updates);

  const profile = await UpdateUserProfileById(id, updates);

  if (!profile) {
    console.log("UserProfile not found or update failed.");
    return null;
  }

  return {
    id: profile.id,
    userId: profile.userId,
    firstName: profile.firstName,
    lastName: profile.lastName,
    dob: profile.dob,
    gender: profile.gender,
    street: profile.street,
    location: profile.location,
    city: profile.city,
    state: profile.state,
    pincode: profile.pincode,
    mobileNo: profile.mobileNo,
    email: profile.email
  };
};
