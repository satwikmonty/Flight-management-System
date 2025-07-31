import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Plane, Clock } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import NonStopFlightPath from "@/components/ui/NonStopFlightPath";

export function Search() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [flights, setFlights] = useState<any[]>([]);
  const [returnFlights, setReturnFlights] = useState<any[]>([]);
  const [maxPrice, setMaxPrice] = useState(45000);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const departure = searchParams.get("departure") || "";
  const returnDate = searchParams.get("return") || "";

  useEffect(() => {
    const fetchFlights = async () => {
      const res = await fetch("http://localhost:3000/schedules/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to,
          departure,
          maxFare: maxPrice,
          flightName: selectedAirlines.length === 1 ? selectedAirlines[0] : undefined,
        }),
      });
      const response = await res.json();
      const flightsArray = Array.isArray(response.data?.data) ? response.data.data : [];
      setFlights(flightsArray);
    };

    const fetchReturnFlights = async () => {
      if (!returnDate) return;
      const res = await fetch("http://localhost:3000/schedules/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: to,
          to: from,
          departure: returnDate,
          maxFare: maxPrice,
        }),
      });
      const response = await res.json();
      const returnArray = Array.isArray(response.data?.data) ? response.data.data : [];
      setReturnFlights(returnArray);
    };

    fetchFlights();
    fetchReturnFlights();
  }, [from, to, departure, returnDate, maxPrice, selectedAirlines]);

  const getTimeCategory = (time: string) => {
    const hour = new Date(time).getHours();
    if (hour >= 5 && hour < 12) return "Morning";
    if (hour >= 12 && hour < 17) return "Afternoon";
    if (hour >= 17 && hour < 21) return "Evening";
    return "Night";
  };

  const filterByTime = (flight: any) => {
    const category = getTimeCategory(flight.departureTime);
    return selectedTimes.length === 0 || selectedTimes.includes(category);
  };

  const safeFlights = Array.isArray(flights) ? flights : [];
  const safeReturns = Array.isArray(returnFlights) ? returnFlights : [];

  const uniqueAirlines = Array.from(
    new Set([...safeFlights, ...safeReturns].map(f => f.Flight.flightName))
  );


  return (
    <div className="min-h-screen flex flex-col ml-auto">
      <header className='border-b'>
        <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
          <h1 className='font-extrabold text-2xl'>XYZ Air Travels</h1>
          <Button onClick={() => navigate("/login")}>Login</Button>
        </div>
      </header>
      <div className="">
        <main className="flex-1">
          <div className="container mx-auto px-4 py-20">
            <div className="flex flex-col md:flex-row gap-6 h-full">
              <aside className="w-full md:w-80">
                <Card className="p-4">
                  <h2 className="text-xl font-semibold mb-3">Filter Results</h2>
                  <p className="font-medium">Price Range</p>
                  <Slider
                    defaultValue={[maxPrice]}
                    min={5000}
                    max={45000}
                    step={500}
                    onValueChange={(val) => setMaxPrice(val[0])}
                  />
                  <div className="flex justify-between text-sm mt-1">
                    <span>₹5000</span>
                    <span>₹{maxPrice}</span>
                  </div>

                  <div className="mt-5">
                    <h3 className="font-medium text-xl mb-2">Airlines</h3>
                    {uniqueAirlines.map((airline) => (
                      <div key={airline} className="flex items-center gap-2 mb-1 text-lg">
                        <Checkbox
                          checked={selectedAirlines.includes(airline)}
                          onCheckedChange={(checked) =>
                            setSelectedAirlines((prev) =>
                              checked ? [...prev, airline] : prev.filter((a) => a !== airline)
                            )
                          }
                        />
                        <Label className="text-base">{airline}</Label>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5">
                    <h3 className="font-medium text-xl mb-2">Departure Time</h3>
                    {["Morning", "Afternoon", "Evening", "Night"].map((label) => (
                      <div key={label} className="flex items-center gap-2 mb-1">
                        <Checkbox
                          checked={selectedTimes.includes(label)}
                          onCheckedChange={(checked) =>
                            setSelectedTimes((prev) =>
                              checked ? [...prev, label] : prev.filter((t) => t !== label)
                            )
                          }
                        />
                        <Label>{label}</Label>
                      </div>
                    ))}
                  </div>
                </Card>
              </aside>

              <section className='flex-1'>
                <div className={`grid gap-6 ${returnDate ? "md:grid-cols-2" : "grid-cols-1"}`}>
                  <div className="flex flex-col space-y-6">
                    <h3 className="text-xl font-bold mb-2">Departure Flights</h3>
                    {flights.filter(filterByTime).length > 0 ? (
                      flights.filter(filterByTime).map((flight, i) => (
                        <Card key={i} className="p-4 mb-4">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                              <div className="bg-gray-200 w-10 h-10 p-2 rounded">
                                <Plane />
                              </div>
                              <h2 className="font-semibold text-lg">{flight.Flight.flightName}</h2>
                            </div>
                            <div className="text-right">
                              <h3 className="font-bold text-xl">₹{flight.Route.fare}</h3>
                              <p className="text-sm text-gray-500">per person</p>
                            </div>
                          </div>

                          <NonStopFlightPath
                            departureTime={new Date(flight.departureTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            departureAirport={flight.Route.source}
                            arrivalTime={new Date(new Date(flight.departureTime).getTime() + flight.travelDuration * 60000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            arrivalAirport={flight.Route.destination}
                            flightDuration={`${flight.travelDuration} min`}
                          />

                          <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
                            <span className="flex gap-1 items-center text-base">
                              <Clock size={16} /> On time • {flight.Flight.flightType} • Wifi available • Power outlets • In-flight Entertainment
                            </span>
                            <Button className="bg-black text-white h-8 px-4">Select</Button>
                          </div>
                        </Card>
                      ))
                    ) : (
                      <p className="text-gray-500">No departure flights found.</p>
                    )}
                  </div>


                  {returnDate && flights.filter(filterByTime).length > 0 && (
                    <div className="flex flex-col space-y-6">
                      <h3 className="text-xl font-bold mb-2">Return Flights</h3>
                      <div className="flex flex-col space-y-6">
                        {returnFlights.filter(filterByTime).length > 0 ? (
                          returnFlights.filter(filterByTime).map((flight, i) => (
                            <Card key={`r-${i}`} className="p-4 mb-4">
                              <div className="flex justify-between items-start">
                                <div className="flex items-center gap-2">
                                  <div className="bg-gray-200 w-10 h-10 p-2 rounded">
                                    <Plane />
                                  </div>
                                  <h2 className="font-semibold text-lg">{flight.Flight.flightName}</h2>
                                </div>
                                <div className="text-right">
                                  <h3 className="font-bold text-xl">₹{flight.Route.fare}</h3>
                                  <p className="text-sm text-gray-500">per person</p>
                                </div>
                              </div>

                              <NonStopFlightPath
                                departureTime={new Date(flight.departureTime).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                                departureAirport={flight.Route.source}
                                arrivalTime={new Date(
                                  new Date(flight.departureTime).getTime() + flight.travelDuration * 60000
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                                arrivalAirport={flight.Route.destination}
                                flightDuration={`${flight.travelDuration} min`}
                              />

                              <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
                                <span className="flex gap-1 items-center text-base">
                                  <Clock size={16} /> On time • {flight.Flight.flightType} • Wifi available • Power outlets • In-flight Entertainment
                                </span>
                                <Button className="bg-black text-white h-8 px-4">Select</Button>
                              </div>
                            </Card>
                          ))
                        ) : (
                          <p className="text-gray-500">No return flights found.</p>
                        )}
                      </div>
                    </div>
                  )}

                </div>
              </section>
            </div>
          </div>
        </main>
        <footer className='flex bg-gray-200 items-center justify-center h-17'>
          © 2025 XYZ Air Travels Ltd. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
