import type { Transaction } from 'sequelize';
import { sequelize } from '../../index';
import type { UserAttributes } from "../../../../types/rds/user-create-attributes.type";
import { User } from "../../models/user.create.model";
import { UserProfile } from '../../models/user.profile.model';

export const create = async (userDetails: Omit<UserAttributes, 'id'>): Promise<User> => {
    const transaction: Transaction = await sequelize.transaction();

    try {
        console.log('Creating user in DB...');
        const newUser: User = await User.create(userDetails);
        console.log(`Created user in DB with Id: ${newUser.id}`);
        await UserProfile.create(
      {
        userId: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        dob: new Date("2000-01-01"), 
        gender: "Unspecified",
        street: "",
        location: "",
        city: "",
        state: "",
        pincode: "",
        mobileNo: ""
      },
      { transaction }
    );
    console.log(`Created user profile for userId: ${newUser.id}`);
        await transaction.commit();
        return newUser;
    } catch (err) {
        await transaction.rollback();
        console.error(`Error creating user in DB! Error => ${err}`);
        throw err;
    }
};

export const getAllUsers = async (
    filters: { email?: string } = {},
    sortOrder: 'ASC' | 'DESC' = 'ASC',
): Promise<User[]> => {
    const whereClause: any = {};
    if (filters.email?.trim()) {
        whereClause.email = filters.email.trim().toLowerCase();
    }
    try {
        console.log('Fetching users with:', `(${sortOrder})`);
        console.log('>>>>>sortOrder', sortOrder)

        const users = await User.findAll({ where: whereClause, order: [['createdAt', sortOrder]] })

        return users;
    } catch (err) {
        console.error(`Error fetching users from DB! Error => ${err}`);
        throw err;
    }
};

export const updateUserById = async (
  id: number,
  updates: Partial<UserAttributes>
): Promise<User | null> => {
  try {
    console.log(`Updating User with ID: ${id}`, updates);

    const [affectedRows] = await User.update(updates, {
      where: { id }
    });

    if (affectedRows === 0) {
      console.log('No User updated. User does not exist.');
      return null;
    }

    const updatedUser = await User.findByPk(id);

    if (updatedUser) {
      console.log('User updated successfully:', updatedUser);
    }

    return updatedUser;
  } catch (err) {
    console.error(`Error updating User in DB! Error => ${err}`);
    throw err;
  }
};