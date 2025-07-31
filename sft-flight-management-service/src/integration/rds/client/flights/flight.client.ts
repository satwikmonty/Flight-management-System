import type { Transaction } from 'sequelize';
import type { FlightAttributes } from '../../../../types/rds/flight-attributes.type';
import { Flight } from '../../models/flight.model';
import { sequelize } from '../../index';
import { Op, Sequelize } from 'sequelize';

/**
 * This method helps insert a flight entry into the DB
 *
 * @param flightDetails
 * @returns Instance of newly created flight
 */
export const create = async (flightDetails: Omit<FlightAttributes, 'id'>): Promise<Flight> => {
	const transaction: Transaction = await sequelize.transaction();
	try {
		console.log('Creating Flight in DB...');
		const newFlight: Flight = await Flight.create(flightDetails);
		console.log(`Created Flight in DB with Id: ${newFlight.id}`);
		await transaction.commit();
		return newFlight;
	} catch (err) {
		await transaction.rollback();
		console.error(`Error creating Flight in DB! Error => ${err}`);
		throw err;
	}
};

export const getFlightById = async (id: number): Promise<Flight | null> => {
	try {
		console.log(`Fetching Flight with Id: ${id}`);
		const flight = await Flight.findByPk(id);
		if (flight) {
			console.log('Flight found:', flight);
		}
		else { console.log('Flight not found.'); }
		return flight;
	}
	catch (err) {
		console.error(`Error fetching Flight from DB! Error => ${err}`);
		throw err;
	}
};

export const getAllFlights = async (
	filters?: { flightName?: string; flightNumber?: string; flightType?: string },
	sortBy?: string,
	sortOrder: 'ASC' | 'DESC' = 'ASC',
	page: number = 1
): Promise<Flight[]> => {
	try {
		console.log('Fetching flights with filters:', filters || 'Fetching all flights', `Sorting by: ${sortBy || 'None'} (${sortOrder})`);
		const whereClause: any = {};
		if (filters?.flightName) {
			whereClause.flightName = { [Op.like]: `%${filters.flightName}%` };
		}
		if (filters?.flightNumber) {
			whereClause.flightNumber = { [Op.like]: `%${filters.flightNumber}%` };
		}
		if (filters?.flightType) {
			whereClause.flightType = filters.flightType;
		}

		const pageSize = 10;
		const offset = (page - 1) * pageSize

		console.log('>>>>>sortBy ', sortBy)
		console.log('>>>>>sortOrder', sortOrder)

		const flights = await Flight.findAll({ where: whereClause, ...(sortBy && { order: [[`${sortBy}`, sortOrder]] }),
		offset,
		limit:pageSize
	});


		return flights;
	} catch (err) {
		console.error(`Error fetching flights from DB! Error => ${err}`);
		throw err;
	}
};

export const updateFlightById = async (
    id: number,
    updates: Partial<Flight>
): Promise<Flight | null> => {
    try {
        console.log(`Updating Flight with ID: ${id}`, updates);

        const [affectedRows] = await Flight.update(updates, {
            where: { id }
        });

        if (affectedRows === 0) {
            console.log('No flight updated. Flight does not exist.');
            return null;
        }

        const updatedFlight = await Flight.findByPk(id);

        if (updatedFlight) {
            console.log('Flight updated successfully:', updatedFlight);
        }

        return updatedFlight;
    } catch (err) {
        console.error(`Error updating Flight in DB! Error => ${err}`);
        throw err;
    }
};

// TODO: Other methods based on operations

