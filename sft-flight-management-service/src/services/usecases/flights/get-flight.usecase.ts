import { getFlightById } from "../../../integration/rds/client/flights/flight.client";
import type {  GetFlightResponse } from "../../../types/dto/flights-response.dto";
import { FlightType } from "../../../utils/enums/flight-type.enum";

export const executeGetFlightById = async (id: number): Promise<GetFlightResponse | null> => {
    console.log(`Get Flight Request for ID: ${id}`);
    
    const flight = await getFlightById(id);
    
    if (!flight) {
        console.log('Flight not found.');
        return null;
    }

    return {
        id: flight.id,
        flightNumber: flight.flightNumber,
        flightName: flight.flightName,
        economySeatingCapacity: flight.economySeatingCapacity,
        businessSeatingCapacity: flight.businessSeatingCapacity,
        economyReservationCapacity: flight.economyReservationCapacity,
        businessReservationCapacity: flight.businessReservationCapacity,
        flightType: FlightType[flight.flightType as keyof typeof FlightType] || FlightType.AIRBUS_A380,
        isActive:flight.isActive
    };
};
