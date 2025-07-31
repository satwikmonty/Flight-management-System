import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectTrigger, SelectValue, SelectItem, SelectContent
} from "@/components/ui/select";

const AIRPORT_CODES = [
  "DEL", "BOM", "BLR", "MAA", "HYD", "CCU", "GOI", "COK", "IXC", "PNQ",
  "LKO", "IXB", "PAT", "JAI", "TRV", "VNS", "IXR", "RPR", "JDH", "UDR",
  "BDQ", "NAG", "IXJ", "BHU", "IXZ", "VTZ", "IMF", "GAU", "IXL", "DIB",
  "TEZ", "SHL", "RJA", "IXM", "IXE", "IXS", "ATQ", "GAY", "JLR", "IXW",
  "BBI", "BHO", "IXH", "SLV", "IXU", "SXR", "JRH", "IXN", "RUP", "LDA",
  "PBD", "HJR", "GWL", "PNY", "IDR", "JGB", "BEP", "NDC", "TNI", "HSS",
  "COH", "VGA", "IXY", "LUH", "KUU", "MZU", "IXV", "IXD", "DXB"
];

export function EditFlight() {
  const { scheduleId } = useParams();
  const scheduleIdNum = Number(scheduleId);
  const navigate = useNavigate();

  const [flightId, setFlightId] = useState<number | null>(null);
  const [routeId, setRouteId] = useState<number | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const parseTime = (timeStr: string): Date => {
    const [hh, mm] = timeStr.split(":").map(Number);
    return new Date(1970, 0, 1, hh, mm);
  };

  useEffect(() => {
    if (!scheduleIdNum) return;

    (async () => {
      try {
        const scheduleRes = await fetch(`http://localhost:3000/schedules/${scheduleIdNum}`);
        const scheduleData = await scheduleRes.json();
        const schedule = scheduleData.data;
        if (!schedule) throw new Error("Schedule not found");

        const dep = new Date(schedule.departureTime);
        setValue("departureTime", `${String(dep.getHours()).padStart(2, "0")}:${String(dep.getMinutes()).padStart(2, "0")}`);
        setValue("arrivalTime", "00:00");

        setFlightId(schedule.flightId);
        setRouteId(schedule.routeId);

        const flightRes = await fetch(`http://localhost:3000/flights/${schedule.flightId}`);
        const flightJson = await flightRes.json();
        const flight = flightJson.data;

        if (!flight) throw new Error("Flight not found");

        setValue("flightNumber", flight.flightNumber);
        setValue("aircraftType", flight.flightType);
        setValue("economySeats", flight.economySeatingCapacity);
        setValue("businessSeats", flight.businessSeatingCapacity);

        const routeRes = await fetch("http://localhost:3000/routes/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: schedule.routeId }),
        });
        const routeJson = await routeRes.json();
        const route = Array.isArray(routeJson?.data) ? routeJson.data[0] : routeJson.data;
        if (!route) throw new Error("Route not found");

        setValue("origin", route.source);
        setValue("destination", route.destination);
        setValue("distance", parseFloat(route.distance));
        setValue("fare", parseFloat(route.fare));
      } catch (e) {
        console.error("Error loading flight details:", e);
      }
    })();
  }, [scheduleIdNum, setValue]);

  const onSubmit = async (data: any) => {
    const dep = parseTime(data.departureTime);
    const arr = parseTime(data.arrivalTime);
    let duration = (arr.getTime() - dep.getTime()) / 60000;
    if (duration < 0) duration += 24 * 60;

    const depDate = new Date("2025-06-30T00:00:00");
    depDate.setHours(dep.getHours(), dep.getMinutes());

    try {
      if (scheduleIdNum) {
        await fetch(`http://localhost:3000/schedules/${scheduleIdNum}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            travelDuration: duration,
            departureTime: depDate.toISOString(),
            availableDays: "MON WED FRI"
          }),
        });
      }

      if (flightId !== null) {
        await fetch(`http://localhost:3000/flights/${flightId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            flightNumber: data.flightNumber,
            flightName: data.flightNumber,
            flightType: data.aircraftType,
            economySeatingCapacity: data.economySeats,
            businessSeatingCapacity: data.businessSeats,
          }),
        });
      }

      if (routeId !== null) {
        await fetch(`http://localhost:3000/routes/${routeId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source: data.origin,
            destination: data.destination,
            distance: data.distance,
            fare: data.fare,
          }),
        });
      }
      setSuccessMsg("Flight updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-5">
      <a href="/admin/flights" className="text-blue-500 mb-4">🡠 Back to Flights</a>
      <h1 className="text-3xl font-bold mb-6">Edit Flight</h1>

      <div className="flex justify-center items-center">
        <Card className="w-full max-w-4xl p-6 bg-card">
          <CardHeader>
            <CardTitle className="text-2xl">Flight Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm mb-1 block">Flight Number</label>
                  <Input {...register("flightNumber")} autoComplete="off" />
                </div>
                <div>
                  <label className="text-sm mb-1 block">Aircraft Type</label>
                  <Select onValueChange={(v) => setValue("aircraftType", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Boeing 787">Boeing 787</SelectItem>
                      <SelectItem value="Airbus A380">Airbus A380</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm mb-1 block">Origin</label>
                  <Select onValueChange={(v) => setValue("origin", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select origin" />
                    </SelectTrigger>
                    <SelectContent>
                      {AIRPORT_CODES.map((code) => (
                        <SelectItem key={code} value={code}>{code}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm mb-1 block">Destination</label>
                  <Select onValueChange={(v) => setValue("destination", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {AIRPORT_CODES.map((code) => (
                        <SelectItem key={code} value={code}>{code}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm mb-1 block">Distance (km)</label>
                  <Input type="number" {...register("distance")} />
                </div>
                <div>
                  <label className="text-sm mb-1 block">Fare (INR)</label>
                  <Input type="number" {...register("fare")} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm mb-1 block">Departure Time</label>
                  <Input type="time" {...register("departureTime")} />
                </div>
                <div>
                  <label className="text-sm mb-1 block">Arrival Time</label>
                  <Input type="time" {...register("arrivalTime")} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm mb-1 block">Economy Seats</label>
                  <Input type="number" {...register("economySeats")} />
                </div>
                <div>
                  <label className="text-sm mb-1 block">Business Seats</label>
                  <Input type="number" {...register("businessSeats")} />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button type="reset" onClick={() => navigate("/admin/flights")} className=" border">Cancel</Button>
                <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                  Update Flight
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
  );
}
