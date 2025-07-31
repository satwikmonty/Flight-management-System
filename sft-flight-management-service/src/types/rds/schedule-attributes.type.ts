export interface ScheduleAttributes {
	id: number;
	flightId: number;
	travelDuration: number;
	availableDays: string;
	departureTime: Date;
	routeId: number;
	isActive:number;
}
