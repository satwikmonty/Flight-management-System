import { create } from "zustand";
import type { FlightFormData } from "../components/schemas/flight.schema";

interface FlightStore {
  flights: FlightFormData[];
  setFlights: (flights: FlightFormData[]) => void;
  addFlight: (flight: FlightFormData) => void;
  removeFlight: (flightNo: string) => void;
  currentFlight: FlightFormData | null;
  setCurrentFlight: (flight: FlightFormData | null) => void;
}

export const useFlightStore = create<FlightStore>((set) => ({
  flights: [],
  setFlights: (flights) => set({ flights }),
  addFlight: (flight) =>
    set((state) => ({ flights: [...state.flights, flight] })),
  removeFlight: (flightNo) =>
    set((state) => ({
      flights: state.flights.filter((f) => f.flightNo !== flightNo),
    })),
  currentFlight: null,
  setCurrentFlight: (flight) => set({ currentFlight: flight }),
}));
