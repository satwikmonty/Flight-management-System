import { updateUserById } from "../../../integration/rds/client/users/user.client";
import type { UserAttributes } from "../../../types/rds/user-create-attributes.type";

export const executeUpdateUserById = async (
  id: number,
  updates: Partial<Pick<UserAttributes, 'firstName' | 'lastName' | 'email' | 'password' | 'userType' | 'loginStatus'>>
): Promise<UserAttributes | null> => {
  console.log(`Updating User with ID: ${id}`, updates);

  const user = await updateUserById(id, updates);

  if (!user) {
    console.log("User not found or update failed.");
    return null;
  }

  return {
    id: user.id,
    userId: user.userId,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    userType: user.userType,
    loginStatus: user.loginStatus
  };
};
