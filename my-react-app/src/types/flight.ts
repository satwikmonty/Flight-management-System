export interface FlightSearchParams {
  from?: string;
  to?: string;
  departure?: string;   
  return?: string;
  passengers?: number; 
  maxFare?: number;
  flightNames?: string[];
  timeSlots?: string[]; 
}
