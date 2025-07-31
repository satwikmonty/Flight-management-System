import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { loadSequelize } from '../../integration/rds/index';
import { loadModels } from '../../integration/rds/load-model';
import { execute } from '../../services/usecases/flights/create-flight.usecase.js';
import type { CreateFlightRequest } from '../../types/dto/flights-request.dto.js';
import type { CreateFlightResponse, GetAllFlightsResponse, GetFlightResponse } from '../../types/dto/flights-response.dto.js';
import { ERROR_MSG, SUCCESS_MSG } from '../../utils/constants/message.constant.js';
import { handleErrorResponse, handleSuccessResponse } from '../../utils/helpers/response.helper.js';
import { CreateFlightRequestSchema } from '../../utils/schemas/flights/create-flight.schema.js';
import { executeGetAllFlights } from '../../services/usecases/flights/get-all-flight.usecase';
import { executeGetFlightById } from '../../services/usecases/flights/get-flight.usecase';
import { executeUpdateFlightById } from '../../services/usecases/flights/update-flight.usecase';

const flightRoutes = new Hono();

flightRoutes.post(
	'/',
	zValidator('json', CreateFlightRequestSchema, (result, c) => {
		if (!result.success) {
			return handleErrorResponse(c, 400, 'Invalid Flight Request Body', result.error.toString());
		}
	}),
	async (c) => {
		try {
			await loadSequelize(loadModels); // TODO: move to middlewares
			const newFlightDetails = await c.req.json<CreateFlightRequest>();
			const newFlightResponse: CreateFlightResponse = await execute(newFlightDetails);
			return handleSuccessResponse<CreateFlightResponse>(c, 201, newFlightResponse, SUCCESS_MSG.CREATE_FLIGHT);
		} catch (err: any) {
			return handleErrorResponse(c, 500, ERROR_MSG.CREATE_FLIGHT, err as any);
		}
	}
);

flightRoutes.post(
    '/search',
    async (c) => {
        try {
            await loadSequelize(loadModels);
            const filters = await c.req.json();
			console.log("Filters", filters)
            const flights = await executeGetAllFlights(Object.keys(filters).length ? filters : undefined, filters.sortBy, filters.sortOrder);

            return handleSuccessResponse<GetAllFlightsResponse[]>(c, 200, flights, SUCCESS_MSG.GET_ALL_FLIGHTS);
        } catch (err: any) {
            return handleErrorResponse(c, 500, ERROR_MSG.GET_ALL_FLIGHTS, err as any);
        }
    }
);

flightRoutes.get(
    '/:id',
    async (c) => {
        try {
            await loadSequelize(loadModels); 
            const flightId = Number(c.req.param('id'));
            if (isNaN(flightId)) {
                return handleErrorResponse(c, 400, 'Invalid Flight ID');
            }
            const flight = await executeGetFlightById(flightId);
            if (!flight) {
                return handleErrorResponse(c, 404, 'Flight not found');
            }
            return handleSuccessResponse<GetFlightResponse>(c, 200, flight, SUCCESS_MSG.GET_FLIGHT);
        } catch (err: any) {
            return handleErrorResponse(c, 500, ERROR_MSG.GET_FLIGHT, err as any);
        }
    }
);

flightRoutes.patch(
    '/:id',
    async(c) => {
        try{
            await loadSequelize(loadModels);
            const flightId = Number(c.req.param('id'));
            if(isNaN(flightId)){
                return handleErrorResponse(c, 400, 'Invalid Flight ID');
            }
            const updates = await c.req.json();

            const updatedFlight = await executeUpdateFlightById(flightId, updates);
            if (!updatedFlight) {
                return handleErrorResponse(c, 404, 'Flight not found or not updated');
            }

            return handleSuccessResponse(c, 200, updatedFlight, SUCCESS_MSG.UPDATE_FLIGHT);
        } catch (err: any) {
            return handleErrorResponse(c, 500, ERROR_MSG.UPDATE_FLIGHT, err);
        }
    }
)




export default flightRoutes;
