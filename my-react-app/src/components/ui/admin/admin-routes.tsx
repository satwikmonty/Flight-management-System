import {
    Card,
} from "@/components/ui/card"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { Button } from "../button";

interface Route {
    id: number;
    source: string;
    destination: string;
    distance: number;
    fare: number;
}

interface Schedule {
    id: number;
    routeId: number;
    flightId: number;
    travelDuration: number;
}

export function AdminRoutes() {
    const navigate = useNavigate();
    const handleAddNewRoute = () => {
        navigate("/admin/addroute");
    };

    const [routes, setRoutes] = useState<Route[]>([]);
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [flightCounts, setFlightCounts] = useState<Record<number, number>>({});
    const [averageDurations, setAverageDurations] = useState<Record<number, string>>({});
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const routeRes = await fetch("http://localhost:3000/routes/search", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        page: currentPage,
                        limit: itemsPerPage,
                        sortOrder: "ASC"
                    }),
                });
                const { data } = await routeRes.json();
                setRoutes(data?.data || []);
                setTotalCount(data?.totalCount || 0);


                const scheduleRes = await fetch("http://localhost:3000/schedules/search", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ paginated: false }),
                });
                const scheduleJson = await scheduleRes.json();
                console.log("Schedules received:", scheduleJson);
                const allSchedules: Schedule[] = Array.isArray(scheduleJson.data)
                    ? scheduleJson.data
                    : scheduleJson.data?.data || [];
                setSchedules(allSchedules);

                const flightCounts = allSchedules.reduce((acc: Record<number, number>, sched) => {
                    acc[sched.routeId] = (acc[sched.routeId] || 0) + 1;
                    return acc;
                }, {});

                setFlightCounts(flightCounts);

                const durationGroups: Record<number, number[]> = {};

                for (const sched of allSchedules) {
                    const duration = Number(sched.travelDuration);

                    if (!isNaN(duration)) {
                        if (!durationGroups[sched.routeId]) {
                            durationGroups[sched.routeId] = [];
                        }
                        durationGroups[sched.routeId].push(duration);
                    }
                }

                const averageDurations: Record<number, string> = {};

                for (const routeId in durationGroups) {
                    const durations = durationGroups[+routeId];
                    if (!durations.length) continue;

                    const total = durations.reduce((sum, d) => sum + d, 0);
                    const avg = total / durations.length;

                    if (!isNaN(avg) && avg > 0) {
                        const hrs = Math.floor(avg / 60);
                        const mins = Math.round(avg % 60);
                        averageDurations[+routeId] = `${hrs}h ${mins}m`;
                    } else {
                        averageDurations[+routeId] = "—";
                    }
                }

                setAverageDurations(averageDurations);
                console.log("Schedule sample:", allSchedules.slice(0, 3));
            } catch (err) {
                console.error("Failed to load route or schedule data:", err);
            }
        };
        console.log("currentPage:", currentPage);
        fetchData();

    }, [currentPage, itemsPerPage]);



    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleDeleteRoute = async (routeId: number) => {
        try {
            const res = await fetch(`http://localhost:3000/routes/${routeId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ is_active: 0 }),
            });
            if (res.ok) {
                setRoutes(routes.filter((route) => route.id !== routeId));
            } else {
                console.error("Failed to deactivate Route");
            }

        } catch (err) {
            console.error("Failed to delete Route:", err);
        }
    };

    return (
        <>
            <main className='flex-1 container mx-auto px-4 py-8'>
                <div className="flex justify-between">
                    <h2 className='text-2xl font-bold mb-5'>Routes</h2>
                    <button className="inline-flex justify-end gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                        onClick={handleAddNewRoute}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus-icon lucide-plus mt-0.5"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                        Add New Route
                    </button>
                </div>
                <Card>
                    <h2 className="text-2xl font-bold mt-2 mb-2">Route Management</h2>

                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="lucide lucide-search absolute left-2.5 top-2.5 h-4 w-4 text-gray-500">
                                <path d="m21 21-4.3-4.3"></path>
                            </svg>
                            <div className="flex gap-2.5 mt-1">
                                <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-8" placeholder="Search routes...">
                                </input>
                                {/* <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                                    Filter
                                </button>
                                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                                    Export
                                </button> */}
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left p-2">Route ID</th>
                                            <th className="text-left p-2">Origin</th>
                                            <th className="text-left p-2">Destination</th>
                                            <th className="text-left p-2">Distance (km)</th>
                                            <th className="text-left p-2">Duration</th>
                                            <th className="text-left p-2">Flights</th>
                                            <th className="text-left p-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {routes.map((route) => (
                                            <tr key={route.id} className="border-b">
                                                <td className="p-2">{route.id}</td>
                                                <td className="p-2">{route.source}</td>
                                                <td className="p-2">{route.destination}</td>
                                                <td className="p-2">{route.distance}</td>
                                                <td className="p-2">{averageDurations[route.id] || "—"}</td>
                                                <td className="p-2">{flightCounts[route.id] || 0}</td>
                                                <td className="p-2 flex gap-4">

                                                    <Button onClick={() => navigate(`/admin/routes/edit/${route.id}`)}>
                                                        Edit
                                                    </Button>
                                                    <button className="... text-red-500"
                                                        onClick={() => handleDeleteRoute(route.id)}>Delete</button>

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                                <div className="flex justify-between items-center mt-4">
                                    <div className="text-sm text-gray-500">
                                        Showing {(currentPage - 1) * itemsPerPage + 1}–
                                        {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} routes
                                    </div>

                                    <div className="flex gap-2 justify-end">
                                        <button
                                            onClick={goToPreviousPage}
                                            disabled={currentPage === 1}
                                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                                        >
                                            Previous
                                        </button>
                                        <button
                                            onClick={goToNextPage}
                                            disabled={currentPage === totalPages}
                                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                                        >
                                            Next
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </main>
        </>
    )
}