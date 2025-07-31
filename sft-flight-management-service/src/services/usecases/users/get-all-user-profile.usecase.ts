import { getAllUserProfiles } from "../../../integration/rds/client/users/user.profile.client";
import type { GetUserProfileResponse } from "../../../types/dto/user-profile-response.dto";

export const executeGetAllUserProfiles = async (
  filters: { email?: string; userId?: string },
  sortOrder: 'ASC' | 'DESC' = 'ASC'
): Promise<GetUserProfileResponse[]> => {
  try {
    console.log(`Executing UserProfile Search  Sorting by: (${sortOrder})`);
    const profiles = await getAllUserProfiles(filters, sortOrder);

    return profiles.map(profile => ({
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
      email: profile.email,
    }));
  } catch (err) {
    console.error(`Error fetching user profiles! Error => ${err}`);
    throw err;
  }
};
