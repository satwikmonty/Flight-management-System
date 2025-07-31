import { getAllUsers } from "../../../integration/rds/client/users/user.client";
import type { GetAllUsersResponse } from "../../../types/dto/user-create-response.dto";

export const executeGetAllUsers = async (
    filters: { email?: string },
    sortOrder: 'ASC' | 'DESC' = 'ASC'
): Promise<GetAllUsersResponse[]> => {
    try {
        console.log(`Executing User Search  Sorting by: (${sortOrder})`);
        const user = await getAllUsers(filters, sortOrder);
        return user.map(user => ({
            id: user.id,
            userId: user.userId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password:user.password,
            userType:user.userType,
            loginStatus:user.loginStatus,
        }));
    } catch (err) {
        console.error(`Error fetching user! Error => ${err}`);
        throw err;
    }
};