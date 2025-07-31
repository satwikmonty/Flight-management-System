import { create} from "../../../integration/rds/client/routes/route.client";
import type { CreateRouteRequest } from "../../../types/dto/routes-request.dto";
import type { CreateRouteResponse } from "../../../types/dto/routes-response.dto";
import type { RouteAttributes } from "../../../types/rds/route-attributes.type";

export const execute = async (createRouteRequest: CreateRouteRequest): Promise<CreateRouteResponse> => {
    console.log(`Create Route Request ${JSON.stringify(createRouteRequest, null, 4)}`);

    const newRoute = await create(createRouteRequest as Omit<RouteAttributes, 'id'>);
    return {
        id: newRoute.id,
    };
};