import type { Transaction } from 'sequelize';
import { sequelize } from '../../index';
import { Op, Sequelize } from 'sequelize';
import type { RouteAttributes } from '../../../../types/rds/route-attributes.type';
import { Route } from '../../models/route.model';

export const create = async (routeDetails: Omit<RouteAttributes, 'id'>): Promise<Route> => {
    const transaction: Transaction = await sequelize.transaction();

    try {
        console.log('Creating route in DB...');
        const newroute: Route = await Route.create(routeDetails);
        console.log(`Created route in DB with Id: ${newroute.id}`);
        await transaction.commit();
        return newroute;
    } catch (err) {
        await transaction.rollback();
        console.error(`Error creating route in DB! Error => ${err}`);
        throw err;
    }
};

export const getRouteById = async (id: number): Promise<Route | null> => {
    try {
        console.log(`Fetching route with Id: ${id}`);
        const route = await Route.findByPk(id);
        if (route) {
            console.log('Route found:', route);
        }
        else { console.log('Route not found.'); }
        return route;
    }
    catch (err) {
        console.error(`Error fetching route from DB! Error => ${err}`);
        throw err;
    }
};

export const getAllRoutes = async (
    filters?: { source?: string; destination?: string; distance?: number; fare?: number },
    sortBy?: string | number,
    sortOrder: 'ASC' | 'DESC' = 'ASC',
    limit: number = 10,
    page: number = 1
): Promise<{ rows: Route[]; count: number }> => {
    try {
        console.log('Fetching routes with filters:', filters || 'Fetching all routes', `Sorting by: ${sortBy || 'None'} (${sortOrder})`);
        const whereClause: any = {};
        if (filters?.source) {
            whereClause.source = { [Op.like]: `%${filters.source}%` };
        }
        if (filters?.destination) {
            whereClause.destination = { [Op.like]: `%${filters.destination}%` };
        }
        if (filters?.distance) {
            whereClause.distance = filters.distance;
        }
        if (filters?.fare) {
            whereClause.fare = filters.fare;
        }

        const offset = (page - 1) * limit;

        console.log('>>>>>sortBy ', sortBy)
        console.log('>>>>>sortOrder', sortOrder)
        console.log('>>>>>page', page)
        if (!Number.isInteger(limit) || !Number.isInteger(page) || limit <= 0 || page <= 0) {
            throw new Error(`Invalid pagination values. limit: ${limit}, page: ${page}`);
        }
        
        const { rows, count } = await Route.findAndCountAll({
            where: whereClause, ...(sortBy && { order: [[`${sortBy}`, sortOrder]] }),
            limit,
            offset
        });


        return { rows, count };
    } catch (err) {
        console.error(`Error fetching routes from DB! Error => ${err}`);
        throw err;
    }
};

export const updateRouteById = async (
    id: number,
    updates: Partial<Route>
): Promise<Route | null> => {
    try {
        console.log(`Updating Route with ID: ${id}`, updates);

        const [affectedRows] = await Route.update(updates, {
            where: { id }
        });

        if (affectedRows === 0) {
            console.log('No Route updated. Route does not exist.');
            return null;
        }

        const updatedRoute = await Route.findByPk(id);

        if (updatedRoute) {
            console.log('Route updated successfully:', updatedRoute);
        }

        return updatedRoute;
    } catch (err) {
        console.error(`Error updating Route in DB! Error => ${err}`);
        throw err;
    }
};