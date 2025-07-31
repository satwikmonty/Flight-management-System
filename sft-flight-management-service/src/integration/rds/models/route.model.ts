import { DataTypes, Model, Sequelize } from 'sequelize';
import type { RouteAttributes } from '../../../types/rds/route-attributes.type';

export class Route extends Model implements RouteAttributes {
    public id!: number;
    public source!: string;
    public destination!: string;
    public distance!: number;
    public fare!: number;
    public isActive!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static initialize(sequelize: Sequelize) {
        Route.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                source: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    field: 'source',
                },
                destination: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    field: 'destination',
                },
                distance: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    field: 'distance',
                },
                fare: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    field: 'fare',
                },
                isActive: {
                    type: DataTypes.TINYINT,
                    allowNull: false,
                    defaultValue: 1,
                    field: 'is_active'
                },
            },
            {
                sequelize,
                modelName: 'route',
                tableName: 'sft_route',
                timestamps: true,
                underscored: true,
            }
        );
    }
}
