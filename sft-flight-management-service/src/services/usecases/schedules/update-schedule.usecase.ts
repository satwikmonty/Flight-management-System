import { updateScheduleById, getScheduleById } from "../../../integration/rds/client/schedules/schedule.client";
import type { UpdateScheduleResponse } from "../../../types/dto/schedules-response.dto";

export const executeUpdateScheduleById = async (
    id: number,
    updates: Partial<{
        flightId: number;
        travelDuration: number;
        availableDays: string;
        departureTime: Date;
        routeId:number;
        isActive:number;
    }>
): Promise<UpdateScheduleResponse | null> => {
    console.log(`Updating Schedule ID: ${id}`, updates);

    const schedule = await updateScheduleById(id, updates);

    if (!schedule) {
        console.log("Schedule not found or update failed.");
        return null;
    }

    return {
        id: schedule.id,
        flightId: schedule.flightId,
        travelDuration: schedule.travelDuration,
        availableDays: schedule.availableDays,
        departureTime: schedule.departureTime,
        routeId: schedule.routeId,
        isActive: schedule.isActive,
    };
};