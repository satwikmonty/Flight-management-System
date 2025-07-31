import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { flightApi } from '../services/flight.service';
import type {
  Flight,
  Route,
  Schedule,
  // Booking,
  // BookingFormData,
} from '../services/flight.service';
//import type { FlightSearchParams } from '@/types/flight';

type EnrichedFlight = Schedule & { flight: Flight; route: Route };

interface FlightState {
  enrichedFlights: EnrichedFlight[];
  selectedFlight: EnrichedFlight | null;
  // bookings: Booking[];
  isLoading: boolean;
  error: string | null;

  searchAction: {
    isPending: boolean;
    error: string | null;
  };

  // bookingAction: {
  //   isPending: boolean;
  //   error: string | null;
  //   data: Booking | null;
  // };

  // Actions
  loadEnrichedFlights: () => Promise<void>;
  selectFlight: (flight: EnrichedFlight) => void;
  // bookFlight: (bookingData: BookingFormData) => Promise<Booking | null>;
  // loadBookings: (userId: string) => Promise<void>;
  // cancelBooking: (bookingId: string) => Promise<void>;
  clearError: () => void;
  // clearBookingResult: () => void;
}

export const useFlightStore = create<FlightState>()(
  devtools((set, get) => ({
    enrichedFlights: [],
    selectedFlight: null,
    // bookings: [],
    isLoading: false,
    error: null,
    searchAction: { isPending: false, error: null },
    // bookingAction: { isPending: false, error: null, data: null },

    loadEnrichedFlights: async () => {
      set((state) => ({
        ...state,
        isLoading: true,
        error: null,
        enrichedFlights: [],
      }));

      try {
        const schedules = await flightApi.getSchedules();

        const enriched: EnrichedFlight[] = await Promise.all(
          schedules.map(async (s) => {
            const [flight, route] = await Promise.all([
              flightApi.getFlightById(s.flightId),
              flightApi.getRouteById(s.routeId),
            ]);
            return { ...s, flight, route };
          })
        );

        set((state) => ({
          ...state,
          enrichedFlights: enriched,
          isLoading: false,
        }));
      } catch (err) {
        set((state) => ({
          ...state,
          isLoading: false,
          error:
            err instanceof Error && 'status' in err
              ? err.message
              : 'Failed to load flights',
        }));
      }
    },

    selectFlight: (flight) => {
      set({ selectedFlight: flight });
    },

    clearError: () => set({ error: null }),

    // Booking logic commented out until backend is ready:
    /*
    bookFlight: async (bookingData) => { ... },
    loadBookings: async (userId) => { ... },
    cancelBooking: async (bookingId) => { ... },
    clearBookingResult: () => { ... },
    */
  }))
);
