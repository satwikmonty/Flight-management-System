import { getScheduleById } from "../../../integration/rds/client/schedules/schedule.client";
import type { GetScheduleResponse } from "../../../types/dto/schedules-response.dto";

export const executeGetScheduleById = async (id: number): Promise<GetScheduleResponse | null> => {
    console.log(`Get Schedule Request for ID: ${id}`);

    const schedule = await getScheduleById(id);

    if (!schedule) {
        console.log('Schedule not found.');
        return null;
    }

    return {
        id: schedule.id,
        flightId: schedule.flightId,
        travelDuration: schedule.travelDuration,
        availableDays: schedule.availableDays,
        departureTime: schedule.departureTime,
        routeId: schedule.routeId,
        isActive:schedule.isActive
    }

};