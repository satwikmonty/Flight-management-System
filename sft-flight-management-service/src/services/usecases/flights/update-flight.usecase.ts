import { updateFlightById, getFlightById } from "../../../integration/rds/client/flights/flight.client";
import type {  UpdateFlightResponse } from "../../../types/dto/flights-response.dto";
import { FlightType } from "../../../utils/enums/flight-type.enum";

export const executeUpdateFlightById = async (
    id: number,
    updates: Partial<{
        flightNumber: string;
        flightName: string;
        economySeatingCapacity: number;
        businessSeatingCapacity: number;
        economyReservationCapacity: number;
        businessReservationCapacity: number;
        flightType: FlightType;
    }>
): Promise<UpdateFlightResponse | null> => {
    console.log(`Updating Flight ID: ${id}`, updates);

    const flight = await updateFlightById(id, updates);

    if (!flight) {
        console.log("Flight not found or update failed.");
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
        flightType: FlightType[flight.flightType as keyof typeof FlightType] ?? FlightType.AIRBUS_A380,
    };
};