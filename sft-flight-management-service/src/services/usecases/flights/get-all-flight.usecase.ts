import { getAllFlights } from "../../../integration/rds/client/flights/flight.client";
import type { GetAllFlightsResponse } from "../../../types/dto/flights-response.dto";
import { FlightType } from "../../../utils/enums/flight-type.enum";

export const executeGetAllFlights = async (
    filters?: { flightName?: string; flightNumber?: string; flightType?: string },
    sortBy?: string,
    sortOrder: 'ASC' | 'DESC' = 'ASC'
): Promise<GetAllFlightsResponse[]> => {
    try {
        console.log(`Executing Flight Search with Filters: ${filters || 'None'}, Sorting by: ${sortBy || 'None'} (${sortOrder})`);
        const flights = await getAllFlights(filters, sortBy, sortOrder);
        return flights.map(flight => ({
            id: flight.id,
            flightNumber: flight.flightNumber,
            flightName: flight.flightName,
            economySeatingCapacity: flight.economySeatingCapacity,
            businessSeatingCapacity: flight.businessSeatingCapacity,
            economyReservationCapacity: flight.economyReservationCapacity,
            businessReservationCapacity: flight.businessReservationCapacity,
            flightType: FlightType[flight.flightType as keyof typeof FlightType] || FlightType.AIRBUS_A380,
        }));
    } catch (err) {
        console.error(`Error fetching flights! Error => ${err}`);
        throw err;
    }
};