import { DataTypes, Model, Sequelize } from 'sequelize';
import type { UserAttributes } from '../../../types/rds/user-create-attributes.type';

export class User extends Model implements UserAttributes {
    public id!: number;
    public userId!: string;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;
    public userType!: string;
    public loginStatus!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static initialize(sequelize: Sequelize) {
        User.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                userId: {
                    type: DataTypes.STRING,
                    unique: true,
                    autoIncrement: false,
                    allowNull: false,
                    field: 'user_id',
                },
                firstName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    field: 'first_name',
                },
                lastName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    field: 'last_name',
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    field: 'email',
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    field: 'password',
                },
                userType: {
                    type: DataTypes.ENUM('user', 'admin'),
                    allowNull: false,
                    defaultValue: 'user',
                    field: 'user_type',
                },
                loginStatus: {
                    type: DataTypes.TINYINT,
                    allowNull: false,
                    defaultValue: 0,
                    field: 'login_status'
                },
            },
            {
                sequelize,
                modelName: 'user',
                tableName: 'sft_user_credentials',
                timestamps: true,
                underscored: true,
            }
        );
    }
}
