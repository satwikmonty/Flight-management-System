import { getRouteById } from "../../../integration/rds/client/routes/route.client";
import type { GetRouteResponse } from "../../../types/dto/routes-response.dto";

export const executeGetRouteById = async (id: number): Promise<GetRouteResponse | null> => {
    console.log(`Get Route Request for ID: ${id}`);

    const route = await getRouteById(id);

    if (!route) {
        console.log('Route not found.');
        return null;
    }

    return {
        id: route.id,
        source: route.source,
        destination: route.destination,
        distance: route.distance,
        fare: route.fare,
        isActive:route.isActive
    }

};