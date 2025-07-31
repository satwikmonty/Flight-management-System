import { DataTypes, Model, Sequelize } from 'sequelize';
import type { ScheduleAttributes } from '../../../types/rds/schedule-attributes.type';


export class Schedule extends Model implements ScheduleAttributes {
    public id!: number;
    public flightId!: number;
    public travelDuration!: number;
    public availableDays!: string;
    public departureTime!: Date;
    public routeId!: number;
    public isActive!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static initialize(sequelize: Sequelize) {
        Schedule.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    field: 'id'
                },
                flightId: {
                    type: DataTypes.INTEGER,
                    references: {
                        model: 'sft_flight',
                        key: 'id'
                    },
                    allowNull: false,
                    field: 'flight_id'
                },
                travelDuration: {
                    type: DataTypes.FLOAT(7, 3),
                    allowNull: false,
                    field: 'travel_duration'
                },
                availableDays: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                    field: 'available_days'
                },
                departureTime: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    field: 'departure_time'
                },
                routeId: {
                    type: DataTypes.INTEGER,
                    references: {
                        model: 'sft_route',
                        key: 'id'
                    },
                    field: 'route_id'
                },
                isActive: {
                    type: DataTypes.TINYINT,
                    allowNull: false,
                    defaultValue: 1 ,
                    field: 'is_active'
                },
            },
            {
                sequelize,
                modelName: 'schedule',
                tableName: 'sft_schedule',
                timestamps: true,
                underscored: true,
            }
        );
    }
}
