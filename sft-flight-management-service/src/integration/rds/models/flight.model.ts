import { DataTypes, Model, Sequelize } from 'sequelize';
import type { FlightAttributes } from '../../../types/rds/flight-attributes.type';

export class Flight extends Model implements FlightAttributes {
	public id!: number;
	public flightNumber!: string;
	public flightName!: string;
	public economySeatingCapacity!: number;
	public businessSeatingCapacity!: number;
	public economyReservationCapacity!: number;
	public businessReservationCapacity!: number;
	public flightType!: string;
	public isActive!: number;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	public static initialize(sequelize: Sequelize) {
		Flight.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				flightNumber: {
					type: DataTypes.STRING,
					unique: true,
					autoIncrement: false,
					allowNull: false,
					field: 'flight_number',
				},
				flightName: {
					type: DataTypes.STRING,
					allowNull: false,
					field: 'flight_name',
				},
				economySeatingCapacity: {
					type: DataTypes.INTEGER,
					allowNull: false,
					field: 'economy_seating_capacity',
				},
				businessSeatingCapacity: {
					type: DataTypes.INTEGER,
					allowNull: false,
					field: 'business_seating_capacity',
				},
				economyReservationCapacity: {
					type: DataTypes.INTEGER,
					allowNull: true,
					field: 'economy_reservation_capacity',
				},
				businessReservationCapacity: {
					type: DataTypes.INTEGER,
					allowNull: true,
					field: 'business_reservation_capacity',
				},
				flightType: {
					type: DataTypes.ENUM('Boeing 787', 'Airbus A380'),
					allowNull: false,
					defaultValue: 'Airbus A380',
					field: 'flight_type',
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
				modelName: 'flight',
				tableName: 'sft_flight',
				timestamps: true,
				underscored: true,
			}
		);
	}
}
