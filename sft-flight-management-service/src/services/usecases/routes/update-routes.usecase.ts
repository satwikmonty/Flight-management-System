import { updateRouteById, getRouteById } from "../../../integration/rds/client/routes/route.client";
import type { UpdateRouteResponse } from "../../../types/dto/routes-response.dto";

export const executeUpdateRouteById = async (
    id: number,
    updates: Partial<{
        source: string;
        destination: string;
        distance: number;
        fare: number;
        isActive:number;
    }>
): Promise<UpdateRouteResponse | null> => {
    console.log(`Updating Route ID: ${id}`, updates);

    const route = await updateRouteById(id, updates);

    if (!route) {
        console.log("Route not found or update failed.");
        return null;
    }

    return {
        id: route.id,
        source: route.source,
        destination: route.destination,
        distance: route.distance,
        fare: route.fare,
        isActive:route.isActive
    };
};