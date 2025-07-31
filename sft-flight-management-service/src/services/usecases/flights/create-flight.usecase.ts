import { create } from '../../../integration/rds/client/flights/flight.client';
import type { CreateFlightRequest } from '../../../types/dto/flights-request.dto.js';
import type { CreateFlightResponse } from '../../../types/dto/flights-response.dto.js';
import type { FlightAttributes } from '../../../types/rds/flight-attributes.type';

export const execute = async (createFlightRequest: CreateFlightRequest): Promise<CreateFlightResponse> => {
	console.log(`Create Flight Request ${JSON.stringify(createFlightRequest, null, 4)}`);
	const newFlight = await create(createFlightRequest as Omit<FlightAttributes, 'id'>);
	return {
		id: newFlight.id,
	};
};
