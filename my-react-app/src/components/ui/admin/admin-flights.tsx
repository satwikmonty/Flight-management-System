import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useFlightStore } from "../../../store/useFlight.store";


interface Flight {
    id: number;
    flightNo: string;
    aircraft: string;
    from: string;
    to: string;
    departure: string;
    arrival: string;
    status: 'On-Time' | 'Delayed' | 'Cancelled' | 'Boarding' | 'Departed';
}


const getStatusClass = (status: Flight['status']) => {
    switch (status) {
        case 'On-Time':
            return 'text-green-600 bg-green-100 border rounded-lg';
        case 'Delayed':
            return 'text-yellow-600 bg-yellow-100 border rounded-lg';
        case 'Cancelled':
            return 'text-red-600 bg-red-100 border rounded-lg';
        case 'Boarding':
            return 'text-blue-600 bg-blue-100 border rounded-lg';
        case 'Departed':
            return 'text-purple-600 bg-purple-100 border rounded-lg';
        default:
            return '';
    }
};

const AdminFlights: React.FC = () => {

    const { flights, setFlights, removeFlight } = useFlightStore();
    const [searchTerm, setSearchTerm] = useState("");
    const filteredFlights = useMemo(() => {
        return flights.filter((flight) =>
            flight.flightNo.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, flights]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);


    const navigate = useNavigate();
    const handleAddNewFlight = () => {
        navigate("/admin/addflight")
    };

    const handleEditFlight = (scheduleId: number) => {
        console.log("Navigating with scheduleId:", scheduleId);
        navigate(`/admin/flights/edit/${scheduleId}`);
    };

    const handleDeleteFlight = async (scheduleId: number) => {
        try {
            const res = await fetch(`http://localhost:3000/schedules/${scheduleId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ is_active: 0 }),
            });
            if (res.ok) {
                setFlights(flights.filter((flight) => flight.id !== scheduleId));
            } else {
                console.error("Failed to deactivate schedule");
            }

        } catch (err) {
            console.error("Failed to delete flight:", err);
        }
    };


    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const res = await fetch("http://localhost:3000/schedules/search", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        paginated: false
                    }),
                });

                const json = await res.json();
                const scheduleArray = Array.isArray(json)
                    ? json
                    : json.data?.data || json.data || [];

                const mappedFlights = scheduleArray.map((schedule: any) => {
                    const departure = new Date(schedule.departureTime);
                    const arrival = new Date(departure.getTime() + schedule.travelDuration * 60000);

                    return {
                        id: schedule.id,
                        flightId: schedule.Flight?.id ?? schedule.flightId,
                        flightNo: schedule.Flight?.flightNumber ?? `#${schedule.flightId}`,
                        aircraft: schedule.Flight?.flightType ?? "Unknown",
                        from: schedule.Route?.source ?? "N/A",
                        to: schedule.Route?.destination ?? "N/A",
                        departure: departure.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                        arrival: arrival.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                        status: "On-Time"
                    };
                });

                const uniqueFlights = Array.from(
                    new Map(mappedFlights.map((f: Flight) => [f.id, f])).values()
                ) as Flight[];

                setFlights(uniqueFlights);
            } catch (err) {
                console.error("Failed to fetch schedules:", err);
            }
        };

        fetchSchedules();
    }, []);


    const [currentPage, setCurrentPage] = useState(1);
    const flightsPerPage = 10;

    const totalFlights = filteredFlights.length;
    const totalPages = Math.ceil(totalFlights / flightsPerPage);


    const paginatedFlights = useMemo(() => {
        const start = (currentPage - 1) * flightsPerPage;
        const end = currentPage * flightsPerPage;
        return filteredFlights.slice(start, end);
    }, [filteredFlights, currentPage]);

    console.log("filteredFlights:", filteredFlights.length);
    console.log("paginatedFlights:", paginatedFlights.length);
    console.log("currentPage:", currentPage);


    return (
        <div className="min-h-screen p-4">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Flights</h1>
                <Button onClick={handleAddNewFlight} className="bg-black hover:bg-grey-700 text-white flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add New Flight
                </Button>
            </header>

            <Card className="p-6 shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Flight Management</h2>
                <div className="flex justify-between items-center mb-6 gap-4">
                    <div className="relative flex-grow">
                        <Input
                            type="text"
                            placeholder="Search flights..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                    {/* <div className="flex gap-2">
                        <Button variant="outline">Filter</Button>
                        <Button variant="outline">Export</Button>
                    </div> */}
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full leading-normal bg-white border border-gray-200 rounded-lg">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Flight No.
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Aircraft
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    From
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    To
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Departure
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Arrival
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedFlights.map((flight) => (
                                <tr key={flight.id}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {flight.flightNo}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {flight.aircraft}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {flight.from}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {flight.to}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {flight.departure}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {flight.arrival}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <span className={`relative inline-block px-3 py-1 font-semibold text-xs rounded-full ${getStatusClass(flight.status)}`}>
                                            {flight.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div className="flex gap-2">
                                            <Button variant="link" className="p-0 h-auto text-black" onClick={() => handleEditFlight(flight.id)}>
                                                Edit
                                            </Button>
                                            <Button variant="link" size="sm" className="p-0 h-auto text-red-600 " onClick={() => handleDeleteFlight(flight.id)}>
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {paginatedFlights.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="text-center text-gray-500">
                                        No flights found on this page.
                                    </td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
                    <span>
                        Showing {Math.min((currentPage - 1) * flightsPerPage + 1, totalFlights)}–
                        {Math.min(currentPage * flightsPerPage, totalFlights)} of {totalFlights} flights
                    </span>

                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        >
                            Previous
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            disabled={currentPage === totalPages}
                            onClick={() =>
                                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                            }
                        >
                            Next
                        </Button>

                    </div>
                </div>
            </Card>
        </div>
    );
};

export default AdminFlights; 