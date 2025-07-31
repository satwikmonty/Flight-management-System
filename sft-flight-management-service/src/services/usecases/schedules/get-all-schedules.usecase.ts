import { getAllSchedules } from "../../../integration/rds/client/schedules/schedule.client";
import type { GetAllSchedulesResponse } from "../../../types/dto/schedules-response.dto";

export const executeGetAllSchedules = async (
    filters?: { travelDuration?: number; availableDays?: string; departureTime?: Date},
    sortBy?: string | number | Date,
    sortOrder: 'ASC' | 'DESC' = 'ASC'
): Promise<GetAllSchedulesResponse[]> => {
    try {
        console.log(`Executing Schedule Search with Filters: ${filters || 'None'}, Sorting by: ${sortBy || 'None'} (${sortOrder})`);
        const {data} = await getAllSchedules(filters, sortBy, sortOrder);
        return data.map(schedule => ({
            id: schedule.id,
            flightId: schedule.flightId,
            travelDuration: schedule.travelDuration,
            availableDays: schedule.availableDays,
            departureTime: schedule.departureTime,
            routeId: schedule.routeId,
            isActive: schedule.isActive,
        }));
    } catch (err) {
        console.error(`Error fetching schedules! Error => ${err}`);
        throw err;
    }
};