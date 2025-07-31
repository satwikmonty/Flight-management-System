import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { loadSequelize } from '../../integration/rds/index';
import { loadModels } from '../../integration/rds/load-model';
import { execute } from '../../services/usecases/routes/create-routes.usecase';
import type { CreateRouteRequest } from '../../types/dto/routes-request.dto';
import type { CreateRouteResponse, GetAllRoutesResponse, GetRouteResponse } from '../../types/dto/routes-response.dto';
import { ERROR_MSG, SUCCESS_MSG } from '../../utils/constants/message.constant.js';
import { handleErrorResponse, handleSuccessResponse } from '../../utils/helpers/response.helper.js';
import { CreateRouteRequestSchema } from '../../utils/schemas/routes/create-route.schema.js';
import { executeGetAllRoutes } from '../../services/usecases/routes/get-all-routes.usecase';
import { executeGetRouteById } from '../../services/usecases/routes/get-routes.usecase';
import { executeUpdateRouteById } from '../../services/usecases/routes/update-routes.usecase';

const routeRoutes = new Hono();

routeRoutes.post(
    '/',
    zValidator('json', CreateRouteRequestSchema, (result, c) => {
        if (!result.success) {
            return handleErrorResponse(c, 400, 'Invalid route Request Body', result.error.toString());
        }
    }),
    async (c) => {
        try {
            await loadSequelize(loadModels);
            const newrouteDetails = await c.req.json<CreateRouteRequest>();
            const newrouteResponse: CreateRouteResponse = await execute(newrouteDetails);
            return handleSuccessResponse<CreateRouteResponse>(c, 201, newrouteResponse, SUCCESS_MSG.CREATE_ROUTE);
        } catch (err: any) {
            return handleErrorResponse(c, 500, ERROR_MSG.CREATE_ROUTE, err as any);
        }
    }
);

routeRoutes.post(
    '/search',
    async (c) => {
        try {
            await loadSequelize(loadModels);
            const {
                page = 1,
                limit = 10,
                sortBy,
                sortOrder = 'ASC',
                ...filters
            } = await c.req.json();

            const { rows, count } = await executeGetAllRoutes(filters, sortBy, sortOrder, limit, page);

            return handleSuccessResponse(c, 200, {
                data: rows,
                totalCount: count
            }, SUCCESS_MSG.GET_ALL_ROUTES);
        } catch (err: any) {
            return handleErrorResponse(c, 500, ERROR_MSG.GET_ALL_ROUTES, err as any);
        }
    }
);

routeRoutes.get(
    '/:id',
    async (c) => {
        try {
            await loadSequelize(loadModels);
            const routeId = Number(c.req.param('id'));
            if (isNaN(routeId)) {
                return handleErrorResponse(c, 400, 'Invalid route ID');
            }
            const route = await executeGetRouteById(routeId);
            if (!route) {
                return handleErrorResponse(c, 404, 'route not found');
            }
            return handleSuccessResponse<GetRouteResponse>(c, 200, route, SUCCESS_MSG.GET_ROUTE);
        } catch (err: any) {
            return handleErrorResponse(c, 500, ERROR_MSG.GET_ROUTE, err as any);
        }
    }
);

routeRoutes.patch(
    '/:id',
    async (c) => {
        try {
            await loadSequelize(loadModels);
            const routeId = Number(c.req.param('id'));
            if (isNaN(routeId)) {
                return handleErrorResponse(c, 400, 'Invalid Route ID');
            }
            const updates = await c.req.json();

            if ("is_active" in updates) {
                updates.isActive = updates.is_active;
                delete updates.is_active;
            };

            const updatedRoute = await executeUpdateRouteById(routeId, updates);
            if (!updatedRoute) {
                return handleErrorResponse(c, 404, 'Route not found or not updated');
            }

            return handleSuccessResponse(c, 200, updatedRoute, SUCCESS_MSG.UPDATE_FLIGHT);
        } catch (err: any) {
            return handleErrorResponse(c, 500, ERROR_MSG.UPDATE_FLIGHT, err);
        }
    }
);


export default routeRoutes;