import { API_BASE_URL } from "@/constants";

export interface Schedule {
  id: number;
  flightId: number;
  routeId: number;
  departureTime: string;
  travelDuration: number;
}

export interface Flight {
  id: number;
  flightName: string;
  flightNumber: string;
  flightType: string;
}

export interface Route {
  id: number;
  source: string;
  destination: string;
  distance: number;
  fare: number;
}


export interface FlightApiError extends Error {
  status?: number;
  code?: string;
}

export const createFlightApiError = (
  message: string,
  status?: number,
  code?: string
): FlightApiError => {
  const error = new Error(message) as FlightApiError;
  error.name = "FlightApiError";
  error.status = status;
  error.code = code;
  return error;
};

const handleApiResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw createFlightApiError(
      errorData.message || `HTTP Error: ${response.status}`,
      response.status,
      errorData.code
    );
  }
  return response.json();
};

export const flightApi = {
  getSchedules: async (): Promise<Schedule[]> => {
    const response = await fetch(`${API_BASE_URL}/schedules/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({})
    });
    const data = await handleApiResponse(response);
    return data.data;
  },

  getFlightById: async (flightId: number): Promise<Flight> => {
    const response = await fetch(`${API_BASE_URL}/flights/${flightId}`);
    const data = await handleApiResponse(response);
    return data.data;
  },

  getRouteById: async (routeId: number): Promise<Route> => {
    const response = await fetch(`${API_BASE_URL}/routes/${routeId}`);
    const data = await handleApiResponse(response);
    return data.data;
  },

   searchRoutes: async (filters: Partial<Route>): Promise<Route[]> => {
    const response = await fetch(`${API_BASE_URL}/routes/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filters)
    });
    const data = await handleApiResponse(response);
    return data.data;
  }
 
};
