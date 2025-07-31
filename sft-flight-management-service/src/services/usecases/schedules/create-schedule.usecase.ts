import { create} from "../../../integration/rds/client/schedules/schedule.client";
import type { CreateScheduleRequest } from "../../../types/dto/schedules-request.dto";
import type { CreateScheduleResponse } from "../../../types/dto/schedules-response.dto";
import type { ScheduleAttributes } from "../../../types/rds/schedule-attributes.type";

export const execute = async (createScheduleRequest: CreateScheduleRequest): Promise<CreateScheduleResponse> => {
    console.log(`Create Schedule Request ${JSON.stringify(createScheduleRequest, null, 4)}`);

    const newSchedule = await create(createScheduleRequest as Omit<ScheduleAttributes, 'id'>);
    return {
        id: newSchedule.id,
    };
};