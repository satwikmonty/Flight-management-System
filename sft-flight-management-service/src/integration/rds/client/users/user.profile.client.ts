import type { Transaction } from 'sequelize';
import { sequelize } from '../../index';
import type { UserProfileAttributes } from '../../../../types/rds/user-profile-attributes.type';
import { UserProfile } from '../../models/user.profile.model';

export const create = async (
  profileDetails: Omit<UserProfileAttributes, 'id'>
): Promise<UserProfile> => {
  const transaction: Transaction = await sequelize.transaction();

  try {
    console.log('Creating user profile in DB...');
    const newProfile: UserProfile = await UserProfile.create(profileDetails, { transaction });
    console.log(`Created user profile in DB with Id: ${newProfile.id}`);
    await transaction.commit();
    return newProfile;
  } catch (err) {
    await transaction.rollback();
    console.error(`Error creating user profile in DB! Error => ${err}`);
    throw err;
  }
};


export const getAllUserProfiles = async (
  filters: { email?: string; userId?: string } = {},
  sortOrder: 'ASC' | 'DESC' = 'ASC'
): Promise<UserProfile[]> => {
  const whereClause: any = {};
  if (filters.userId?.trim()) {
    whereClause.userId = filters.userId.trim();
  }
  if (filters.email?.trim()) {
    whereClause.email = filters.email.trim().toLowerCase();
  }

  try {
    console.log('Fetching user profiles with:', `(${sortOrder})`);
    const profiles = await UserProfile.findAll({
      where: whereClause,
      order: [['createdAt', sortOrder]]
    });

    return profiles;
  } catch (err) {
    console.error(`Error fetching user profiles from DB! Error => ${err}`);
    throw err;
  }
};


export const UpdateUserProfileById = async (
  id: number,
  updates: Partial<UserProfile>
): Promise<UserProfile | null> => {
  try {
    console.log(`Updating UserProfile with ID: ${id}`, updates);

    const [affectedRows] = await UserProfile.update(updates, {
      where: { id }
    });

    if (affectedRows === 0) {
      console.log('No UserProfile updated. UserProfile does not exist.');
      return null;
    }

    const updatedProfile = await UserProfile.findByPk(id);

    if (updatedProfile) {
      console.log('UserProfile updated successfully:', updatedProfile);
    }

    return updatedProfile;
  } catch (err) {
    console.error(`Error updating UserProfile in DB! Error => ${err}`);
    throw err;
  }
};
