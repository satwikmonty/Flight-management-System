import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const flightSchema = z.object({
    flightNumber: z.string().min(5, "Flight number is required"),
    aircraftType: z.string(),
    origin: z.string(),
    destination: z.string(),
    departureTime: z.string(),
    arrivalTime: z.string(),
    economySeats: z.coerce.number().int().min(1),
    businessSeats: z.coerce.number().int().min(0),
    distance: z.coerce.number().min(1, "Distance must be a positive number"),
    fare: z.coerce.number().min(1, "Fare must be a positive number"),
});

type FlightFormData = z.infer<typeof flightSchema>;

const AIRPORT_CODES = [
    "DEL", "BOM", "BLR", "MAA", "HYD", "CCU", "GOI", "COK", "IXC", "PNQ",
    "LKO", "IXB", "PAT", "JAI", "TRV", "VNS", "IXR", "RPR", "JDH", "UDR",
    "BDQ", "NAG", "IXJ", "BHU", "IXZ", "VTZ", "IMF", "GAU", "IXL", "DIB",
    "TEZ", "SHL", "RJA", "IXM", "IXE", "IXS", "ATQ", "GAY", "JLR", "IXW",
    "BBI", "BHO", "IXH", "SLV", "IXU", "SXR", "JRH", "IXN", "RUP", "LDA",
    "PBD", "HJR", "GWL", "PNY", "IDR", "JGB", "BEP", "NDC", "TNI", "HSS",
    "COH", "VGA", "IXY", "LUH", "KUU", "MZU", "IXV", "IXD", "DXB"
];

export function AddFlight({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm<FlightFormData>({
        resolver: zodResolver(flightSchema),
    });
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    const parseTime = (timeStr: string): Date => {
        const [hours, minutes] = timeStr.split(":").map(Number);
        return new Date(1970, 0, 1, hours, minutes);
    };

    const onSubmit = async (data: FlightFormData) => {
        try {
            const departure = parseTime(data.departureTime);
            const arrival = parseTime(data.arrivalTime);
            let duration = (arrival.getTime() - departure.getTime()) / 60000;
            if (duration < 0) duration += 24 * 60;

            const [depHour, depMin] = data.departureTime.split(":").map(Number);

            const departureDate = new Date("2025-06-30T00:00:00");
            departureDate.setHours(depHour);
            departureDate.setMinutes(depMin);

            const routeRes = await fetch("http://localhost:3000/routes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    source: data.origin,
                    destination: data.destination,
                    distance: data.distance,
                    fare: data.fare,
                }),

            });
            const route = await routeRes.json();

            const flightRes = await fetch("http://localhost:3000/flights", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    flightNumber: data.flightNumber,
                    flightName: data.flightNumber,
                    economySeatingCapacity: data.economySeats,
                    businessSeatingCapacity: data.businessSeats,
                    economyReservationCapacity: 0,
                    businessReservationCapacity: 0,
                    flightType: data.aircraftType,
                }),
            });
            const flight = await flightRes.json();
            if (!flightRes.ok) {
                const errorMessage =
                    flight?.msg?.developerErrorMsg?.errors?.[0]?.message ||
                    flight?.msg?.errorMsg ||
                    "Flight creation failed";

                throw new Error(errorMessage);
            }
            const flightId = flight.data.id;
            const routeId = route.data.id;

            await fetch("http://localhost:3000/schedules", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    flightId,
                    routeId,
                    travelDuration: duration,
                    availableDays: "MON FRI SUN",
                    departureTime: departureDate.toISOString(),
                }),
            });
            setSuccessMsg("Flight added successfully!");
            reset();
        } catch (error) {
            console.error("Failed to add full flight record:", error);
        }
    };

    return (
        <div className={cn("flex flex-col min-h-screen", className)} {...props}>
            <div className="p-5">
                <a href="/admin/flights" className="text-blue-500">🡠 Back to Flights</a>
                <h1 className="text-3xl font-bold mt-5">Add New Flight</h1>
                <div className="flex justify-center items-center p-5">
                    <Card className="flex justify-center rounded-lg bg-card text-card-foreground shadow-sm w-full p-4">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Flight Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                                <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                                    <div>
                                        <label htmlFor="flightNumber" className="block text-sm font-medium mb-1">Flight Number</label>
                                        <Input {...register("flightNumber")} placeholder="e.g. XY123" autoComplete="off" />
                                        {errors.flightNumber && <p className="text-red-600 text-sm">{errors.flightNumber.message}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="aircraftType" className="block text-sm font-medium mb-1">Aircraft Type</label>
                                        <Select onValueChange={(val) => setValue("aircraftType", val)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select aircraft type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Boeing 787">Boeing 787</SelectItem>
                                                <SelectItem value="Airbus A380">Airbus A380</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>


                                <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                                    <div>
                                        <label htmlFor="origin" className="block text-sm font-medium mb-1">Origin</label>
                                        <Select onValueChange={(val) => setValue("origin", val)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select origin airport" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {AIRPORT_CODES.map((code) => (
                                                    <SelectItem key={code} value={code}>{code}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <label htmlFor="destination" className="block text-sm font-medium mb-1">Destination</label>
                                        <Select onValueChange={(val) => setValue("destination", val)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select destination airport" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {AIRPORT_CODES.map((code) => (
                                                    <SelectItem key={code} value={code}>{code}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                                    <div>
                                        <label htmlFor="distance" className="block text-sm font-medium mb-1">Distance (km)</label>
                                        <Input type="number" {...register("distance")} placeholder="e.g. 1500" />
                                        {errors.distance && <p className="text-sm text-red-600">{errors.distance.message}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="fare" className="block text-sm font-medium mb-1">Fare (INR)</label>
                                        <Input type="number" {...register("fare")} placeholder="e.g. 8500" />
                                        {errors.fare && <p className="text-sm text-red-600">{errors.fare.message}</p>}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                                    <div>
                                        <label htmlFor="departureTime" className="block text-sm font-medium mb-1">Departure Time</label>
                                        <Input type="time" {...register("departureTime")} />
                                    </div>
                                    <div>
                                        <label htmlFor="arrivalTime" className="block text-sm font-medium mb-1">Arrival Time</label>
                                        <Input type="time" {...register("arrivalTime")} />
                                    </div>
                                </div>


                                <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                                    <div>
                                        <label htmlFor="economySeats" className="block text-sm font-medium mb-1">Economy Seats</label>
                                        <Input type="number" {...register("economySeats")} placeholder="e.g. 150" />
                                    </div>
                                    <div>
                                        <label htmlFor="businessSeats" className="block text-sm font-medium mb-1">Business Seats</label>
                                        <Input type="number" {...register("businessSeats")} placeholder="e.g. 30" />
                                    </div>
                                </div>


                                <div className="flex justify-end gap-3">
                                    <Button
                                        type="button"
                                        className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        Add Flight
                                    </Button>
                                    {successMsg && (
                                        <p className="mt-2 text-green-600 font-medium">{successMsg}</p>
                                    )}
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

