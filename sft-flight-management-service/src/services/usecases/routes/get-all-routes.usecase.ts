import { getAllRoutes } from "../../../integration/rds/client/routes/route.client";
import type { GetAllRoutesResponse } from "../../../types/dto/routes-response.dto";

export const executeGetAllRoutes = async (
    filters?: { source?: string; destination?: string; distance?: number; fare?: number },
    sortBy?: string | number,
    sortOrder: 'ASC' | 'DESC' = 'ASC',
    limit = 10,
    page = 1
): Promise<{ rows: GetAllRoutesResponse[]; count: number }> => {
    try {
        console.log("Using page:", page, "limit:", limit);
        console.log(`Executing Paginated Route Search - Filters: ${JSON.stringify(filters) || 'None'}, Sort: ${sortBy || 'None'} (${sortOrder}), Limit: ${limit}, Page: ${page}`);
        console.log(" Calling getAllRoutes with:", filters, limit, page);
        const { count, rows } = await getAllRoutes(filters, sortBy, sortOrder, limit, page);
        console.log(" Result received:", count,rows);

        const mapped = rows.map(route => ({
            id: route.id,
            source: route.source,
            destination: route.destination,
            distance: route.distance,
            fare: route.fare,
            isActive: route.isActive,
        }));
        return { rows: mapped, count };
    } catch (err) {
        console.error(`Error fetching route! Error => ${err}`);
        throw err;
    }
};