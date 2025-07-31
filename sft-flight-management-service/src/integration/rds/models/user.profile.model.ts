import { DataTypes, Model, Sequelize } from 'sequelize';
import type { UserProfileAttributes } from '../../../types/rds/user-profile-attributes.type';

export class UserProfile extends Model implements UserProfileAttributes {
    public id!: number;
    public userId!: string;
    public firstName!: string;
    public lastName!: string;
    public dob!: string;
    public gender!: string;
    public street!: string;
    public location!: string;
    public city!: string;
    public state!: string;
    public pincode!: string;
    public mobileNo!: string;
    public email!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static initialize(sequelize: Sequelize) {
        UserProfile.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                userId: {
                    type: DataTypes.INTEGER,
                    references: {
                        model: 'sft_user_credentials',
                        key: 'id'
                    },
                    allowNull: false,
                    field: 'user_id'
                },
                firstName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    field: 'first_name'
                },
                lastName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    field: 'last_name'
                },
                dob: {
                    type: DataTypes.DATEONLY,
                    allowNull: false,
                    field: 'dob'
                },
                gender: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    field: 'gender'
                },
                street: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    field: 'street'
                },
                location: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    field: 'location'
                },
                city: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    field: 'city'
                },
                state: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    field: 'state'
                },
                pincode: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    field: 'pincode'
                },
                mobileNo: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    field: 'mobile_no'
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        isEmail: true
                    },
                    field: 'email'
                }
            },
            {
                sequelize,
                modelName: 'userProfile',
                tableName: 'sft_user_profile',
                timestamps: true,
                underscored: true
            }
        );
    }
}
