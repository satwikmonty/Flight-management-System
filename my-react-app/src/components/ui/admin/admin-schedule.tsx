import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Button } from "../button";
import { useNavigate } from "react-router-dom"

type Schedule = {
  id: number;
  flightId: number;
  routeId: number;
  departureTime: string;
  travelDuration: number;
  availableDays: string;
  isActive: number;
  Flight?: {
    flightNumber: string;
  };
  Route?: {
    source: string;
    destination: string;
  };
};


export function AdminSchedules() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const navigate = useNavigate()

  const paginatedSchedules = schedules.slice(startIndex, endIndex);
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const fetchAndSetSchedules = async (page = 1) => {
    try {
      const res = await fetch("http://localhost:3000/schedules/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filters: {
            travelDuration: undefined,
            availableDays: undefined,
            departureTime: undefined
          },
          sortBy: undefined,
          sortOrder: "ASC",
          page
        })
      });

      const json = await res.json();
      setSchedules(json.data?.data || []);
      setTotalCount(json.data?.totalCount || 0);


    } catch (err) {
      console.error("Failed to fetch schedules:", err);
    }
  };

  useEffect(() => {
    fetchAndSetSchedules(currentPage);
  }, [currentPage]);


  const rows = schedules.map((s) => {
    const dep = new Date(s.departureTime);
    const arr = new Date(dep.getTime() + s.travelDuration * 60000);

    return {
      id: s.id,
      flightNumber: s.Flight?.flightNumber ?? `#${s.flightId}`,
      route: `${s.Route?.source} – ${s.Route?.destination}`,
      depDate: dep.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      depTime: dep.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      arrTime: arr.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "On-Time",
    };
  });

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3000/schedules/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: 0 })
      });

      if (res.ok) {
        setSchedules((prev) => prev.filter((s) => s.id !== id));
      } else {
        console.error("Failed to delete schedule");
      }
    } catch (err) {
      console.error("Delete request failed", err);
    }
  };

  return (
    <>
      <main className='flex-1 container mx-auto px-4 py-8'>
        <div className="flex justify-between">
          <h2 className='text-2xl font-bold mb-5'>Schedules</h2>
          <button className="inline-flex justify-end gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-search h-4 w-4 mr-2" ><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
            View Schedule Details</button>
        </div>
        <Card>
          <h2 className="text-2xl font-bold mt-2 mb-2">Schedule Management</h2>
          <div className="flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-search absolute left-2.5 top-2.5 h-4 w-4 text-gray-500"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              <div className="flex gap-2.5 mt-1">
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-8"
                  placeholder="Search schedules"
                />
                {/* <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                  Filter
                </button>
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                  Export
                </button> */}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-b-gray-500">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Schedule ID</th>
                      <th className="text-left p-2">Flight</th>
                      <th className="text-left p-2">Route</th>
                      <th className="text-left p-2">Departure Date</th>
                      <th className="text-left p-2">Departure Time</th>
                      <th className="text-left p-2">Arrival Time</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr key={row.id} className="border-b">
                        <td className="p-2">{row.id}</td>
                        <td className="p-2">{row.flightNumber}</td>
                        <td className="p-2">{row.route}</td>
                        <td className="p-2">{row.depDate}</td>
                        <td className="p-2">{row.depTime}</td>
                        <td className="p-2">{row.arrTime}</td>
                        <td className="p-2">
                          <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800">{row.status}</span>
                        </td>
                        <td className="p-2">
                          <div className="flex gap-2">
                            <a href={`/admin/schedules/edit/${row.id}`}>
                              <Button
                                variant="link"
                                className="text-black"
                                onClick={() => navigate(`/admin/schedules/edit/${row.id}`)}
                              >
                                Edit
                              </Button>
                            </a>
                            <button
                              onClick={() => handleDelete(row.id)}
                              className="inline-flex items-center justify-center gap-1 text-sm text-red-500 font-medium rounded-md px-3 py-1"
                            >
                              Delete
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>


                </table>
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-gray-500">
                    Showing {startIndex + 1}–{Math.min(endIndex, totalCount)} of {totalCount} schedules
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => p - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => p + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>


                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </>
  );
}