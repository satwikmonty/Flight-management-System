import dotenv from 'dotenv';
import { Sequelize, type Options } from 'sequelize';

dotenv.config();

const sequelizeOptions: Options = {
	host: process.env.DB_HOST!,
	port: Number(process.env.DB_PORT!),
	database: process.env.DB_NAME!,
	username: process.env.DB_USER!,
	password: process.env.DB_PASSWORD!,
	dialect: 'mysql',
	logging: console.log,
	retry: {
		max: 2,
	},
	pool: {
		min: 0,
		max: 5,
		acquire: 3000,
		idle: 0,
	},
};

let init = false;

export const loadSequelize = async (loadModels: Function): Promise<Sequelize | undefined> => {
	if (!init) {
		try {
			console.log('Initializing database connection...');
			await sequelize.authenticate();
			loadModels(sequelize);
			console.log('Connection established successfully.');
			init = true;
			return sequelize;
		} catch (error) {
			console.error('Error syncing database:', error);
			throw error;
		}
	}

	sequelize.connectionManager.initPools();

	if (Object.prototype.hasOwnProperty.call(sequelize.connectionManager, 'getConnection')) {
		delete (sequelize.connectionManager as any).getConnection;
	}
	return sequelize;
};

export const sequelize = new Sequelize(sequelizeOptions);
