import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import {
    Card
} from "@/components/ui/card"
import { LucidePlane, LucideCreditCard, Users, CalendarDays, User } from 'lucide-react';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export function AdminDashboard() {

    const navigate = useNavigate();

    const fclick = () => {
        navigate('/admin/flights');
    };

    const tclick = () => {
        navigate('/admin/routes');
    };

    const pclick = () => {
        navigate('/admin/passengers');
    };

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [activeTab, setActiveTab] = useState("recent-flight");

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    const flights = [
        {
            flight_no: "XY101",
            route: "New York to London",
            departure: "10:30 AM",
            arrival: "5:45AM",
            status: "On Time",
            actions: "Edit"
        },
        {
            flight_no: "XY102",
            route: "New York to London",
            departure: "10:30 AM",
            arrival: "5:45AM",
            status: "On Time",
            actions: "Edit"
        },
        {
            flight_no: "XY103",
            route: "New York to London",
            departure: "10:30 AM",
            arrival: "5:45AM",
            status: "Delayed",
            actions: "Edit"
        },
        {
            flight_no: "XY104",
            route: "New York to London",
            departure: "10:30 AM",
            arrival: "5:45AM",
            status: "On Time",
            actions: "Edit"
        },
        {
            flight_no: "XY105",
            route: "New York to London",
            departure: "10:30 AM",
            arrival: "5:45AM",
            status: "Cancelled",
            actions: "Edit"
        }
    ];

    const bookings = [
        {
            booking_id: "B10001",
            user: "John Doe",
            flight: "XY123",
            date: "25 June 2025",
            amount: "$999.00",
            status: "Confirmed"
        },
        {
            booking_id: "B10002",
            user: "John Doe",
            flight: "XY123",
            date: "25 June 2025",
            amount: "$999.00",
            status: "Confirmed"
        },
        {
            booking_id: "B10003",
            user: "John Doe",
            flight: "XY123",
            date: "25 June 2025",
            amount: "$999.00",
            status: "Payment Pending"
        },
        {
            booking_id: "B10004",
            user: "John Doe",
            flight: "XY123",
            date: "25 June 2025",
            amount: "$999.00",
            status: "Confirmed"
        },
        {
            booking_id: "B10005",
            user: "John Doe",
            flight: "XY123",
            date: "25 June 2025",
            amount: "$999.00",
            status: "Cancelled"
        }
    ]

    const users = [
        {
            user_id: "U1001",
            name: "Jane Smith",
            email: "jane.smith@exaple.com",
            registered: "May 10, 2025",
            bookings: "2",
            actions: "View"
        },
        {
            user_id: "U1002",
            name: "Jane Smith",
            email: "jane.smith@exaple.com",
            registered: "May 10, 2025",
            bookings: "2",
            actions: "View"
        },
        {
            user_id: "U1003",
            name: "Jane Smith",
            email: "jane.smith@exaple.com",
            registered: "May 10, 2025",
            bookings: "2",
            actions: "View"
        },
        {
            user_id: "U1004",
            name: "Jane Smith",
            email: "jane.smith@exaple.com",
            registered: "May 10, 2025",
            bookings: "2",
            actions: "View"
        },
        {
            user_id: "U1005",
            name: "Jane Smith",
            email: "jane.smith@exaple.com",
            registered: "May 10, 2025",
            bookings: "2",
            actions: "View"
        }

    ]

    return (
        <div className='min-h-screen flex flex-col ml-auto' >
            <header>
                <div className='container mx-auto pl-8 px-4 py-4 flex justify-between items-center lg:pl-16'>
                    <h1 className='font-bold text-4xl mb-5'>DashBoard</h1>
                </div>
            </header>
            <main className='flex-1 container mx-auto pl-8 px-4 py-8 lg:pl-16'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
                    <Card className='rounded-lg border-hidden shadow-sm'>
                        <div className='p-4 pt-2'>
                            <div className='flex items-center gap-4'>
                                <div className='bg-blue-100 rounded-full p-2'>
                                    <LucidePlane />
                                </div>
                                <div>
                                    <p className='text-base text-gray-500'>Total Flights</p>
                                    <p className='text-2xl font-bold'>124</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card className='rounded-lg border-hidden shadow-sm'>
                        <div className='p-4 pt-2'>
                            <div className='flex items-center gap-4'>
                                <div className='bg-green-200 rounded-full p-2'>
                                    <Users />
                                </div>
                                <div>
                                    <p className='text-base text-gray-500'>Total Users</p>
                                    <p className='text-2xl font-bold'>1245</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card className='rounded-lg border-hidden shadow-sm'>
                        <div className='p-4 pt-2'>
                            <div className='flex items-center gap-4'>
                                <div className='bg-purple-100 rounded-full p-2'>
                                    <CalendarDays />
                                </div>
                                <div>
                                    <p className='text-base text-gray-500'>Routes</p>
                                    <p className='text-2xl font-bold'>56</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card className='rounded-lg border-hidden shadow-sm'>
                        <div className='p-4 pt-2'>
                            <div className='flex items-center gap-4'>
                                <div className='bg-amber-100 rounded-full p-2'>
                                    <LucideCreditCard />
                                </div>
                                <div>
                                    <p className='text-base text-gray-500'>Revenue</p>
                                    <p className='text-2xl font-bold'>$125,430</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                <h1 className='font-bold text-xl mb-3'>Quick Actions</h1>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-3 mb-10'>
                    <Button variant="link"
                        onClick={fclick}
                        className='bg-black box-content size h-20 rounded-lg border-hidden shadow-sm '
                    >
                        <div className='flex flex-col items-center justify-center text-white '>
                            <LucidePlane className='rounded-lg size-5' />
                            <p>View Flights</p>
                        </div>
                    </Button>
                    <Button variant="link"
                        onClick={tclick}
                        className='box-content size h-20 rounded-lg border-hidden shadow-sm'
                    >
                        <div className='flex flex-col items-center justify-center'>
                            <CalendarDays className='rounded-lg size-5' />
                            <p>View Routes</p>
                        </div>
                    </Button>
                    <Button variant="link"
                        onClick={pclick}
                        className='box-content size h-20 rounded-lg border-hidden shadow-sm'
                    >
                        <div className='flex flex-col items-center justify-center'>
                            <User className='rounded-lg size-5' />
                            <p>View Passengers</p>
                        </div>
                    </Button>
                </div>


                <Tabs defaultValue={activeTab} value={activeTab} onValueChange={(value) => setActiveTab(value)}>
                    {isMobile ? (
                        <select onChange={(e) => setActiveTab(e.target.value)} value={activeTab}>
                            <option value="recent-flight">Recent Flights</option>
                            <option value="recent-booking">Recent Bookings</option>
                            <option value="new-user">New Users</option>
                        </select>
                    ) : (
                        <TabsList className="bg-gray-300 h-10 w-full">
                            <TabsTrigger value="recent-flight">Recent Flights</TabsTrigger>
                            <TabsTrigger value="recent-booking">Recent Bookings</TabsTrigger>
                            <TabsTrigger value="new-user">New Users</TabsTrigger>
                        </TabsList>
                    )}
                    <TabsContent value="recent-flight">
                        <div className='border rounded-lg border-gray-200 shadow-sm w-full'>
                            <div className='flex flex-col space-y-1.5 p-8'>
                                <h1 className='font-bold text-2xl'>Recent Flights</h1>
                                <p className='text-sm text-gray-500'>Latest flight information</p>
                            </div>
                            <div className="overflow-x-auto p-8 pt-0">
                                <Table className="border-collapse">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px] font-bold text-[16px] text-left">Flight No.</TableHead>
                                            <TableHead className="font-bold text-[16px] text-left">Route</TableHead>
                                            <TableHead className="font-bold text-[16px] text-left">Departure</TableHead>
                                            <TableHead className="font-bold text-[16px] text-left">Arrival</TableHead>
                                            <TableHead className="font-bold text-[16px] text-left">Status</TableHead>
                                            <TableHead className="font-bold text-[16px] text-left">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {flights.map((flight) => (
                                            <TableRow
                                                key={flight.flight_no}
                                                className="border-b border-gray-300"
                                                style={{ borderBottomWidth: '1px' }}
                                            >
                                                <TableCell className="text-[14px] py-3">{flight.flight_no}</TableCell>
                                                <TableCell className="text-[14px] py-3">{flight.route}</TableCell>
                                                <TableCell className="text-[14px] py-3">{flight.departure}</TableCell>
                                                <TableCell className="text-[14px] py-3">{flight.arrival}</TableCell>
                                                <TableCell className="text-[14px]">
                                                    <span
                                                        className={
                                                            flight.status === "On Time"
                                                                ? "text-green-600 font-semibold rounded-bg bg-green-100"
                                                                : flight.status === "Delayed"
                                                                    ? "text-yellow-600 font-semibold rounded-bg bg-yellow-100"
                                                                    : flight.status === "Cancelled"
                                                                        ? "text-red-600 font-semibold rounded-bg bg-red-100"
                                                                        : ""
                                                        }
                                                    >
                                                        {flight.status}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="py-3">
                                                    <Button onClick={() => navigate(`/flights/edit/${flight.flight_no}`)}
                                                    className="border rounded-lg"
                                                    >Edit</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="recent-booking">
                        <div className='border rounded-lg border-gray-200 shadow-sm w-full'>
                            <div className='flex flex-col space-y-1.5 p-8'>
                                <h1 className='font-bold text-2xl'>Recent Bookings</h1>
                                <p className='text-sm text-gray-500'>Latest Booking Information</p>
                            </div>
                            <div className="overflow-x-auto p-8 pt-0">
                                <Table className="border-collapse">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px] font-bold text-[16px] text-left">Booking ID</TableHead>
                                            <TableHead className="font-bold text-[16px] text-left">User</TableHead>
                                            <TableHead className="font-bold text-[16px] text-left">Flight</TableHead>
                                            <TableHead className="font-bold text-[16px] text-left">Date</TableHead>
                                            <TableHead className="font-bold text-[16px] text-left">Amount</TableHead>
                                            <TableHead className="font-bold text-[16px] text-left">Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {bookings.map((booking) => (
                                            <TableRow
                                                key={booking.booking_id}
                                                className="border-b border-gray-300"
                                                style={{ borderBottomWidth: '1px' }}
                                            >
                                                <TableCell className="text-[14px] py-3">{booking.booking_id}</TableCell>
                                                <TableCell className="text-[14px] py-3">{booking.user}</TableCell>
                                                <TableCell className="text-[14px] py-3">{booking.flight}</TableCell>
                                                <TableCell className="text-[14px] py-3">{booking.date}</TableCell>
                                                <TableCell className="text-[14px] py-3">{booking.amount}</TableCell>
                                                <TableCell className="text-[14px]">
                                                    <span
                                                        className={
                                                            booking.status === "Confirmed"
                                                                ? "text-blue-600 font-semibold rounded-bg bg-blue-100"
                                                                : booking.status === "Payment Pending"
                                                                    ? "text-yellow-600 font-semibold rounded-bg bg-yellow-100"
                                                                    : booking.status === "Cancelled"
                                                                        ? "text-gray-600 font-semibold rounded-bg bg-gray-100"
                                                                        : ""
                                                        }
                                                    >
                                                        {booking.status}
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="new-user">
                        <div className='border rounded-lg border-gray-200 shadow-sm w-full'>
                            <div className='flex flex-col space-y-1.5 p-8'>
                                <h1 className='font-bold text-2xl'>New Users</h1>
                                <p className='text-sm text-gray-500'>Recently registered users</p>
                            </div>
                            <div className="overflow-x-auto p-8 pt-0">
                                <Table className="border-collapse">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px] font-bold text-[16px] text-left">User ID</TableHead>
                                            <TableHead className="font-bold text-[16px] text-left">Name</TableHead>
                                            <TableHead className="font-bold text-[16px] text-left">Email</TableHead>
                                            <TableHead className="font-bold text-[16px] text-left">Registered</TableHead>
                                            <TableHead className="font-bold text-[16px] text-left">Bookings</TableHead>
                                            <TableHead className="font-bold text-[16px] text-left">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {users.map((user) => (
                                            <TableRow
                                                key={user.user_id}
                                                className="border-b border-gray-300"
                                                style={{ borderBottomWidth: '1px' }}
                                            >
                                                <TableCell className="text-[14px] py-3">{user.user_id}</TableCell>
                                                <TableCell className="text-[14px] py-3">{user.name}</TableCell>
                                                <TableCell className="text-[14px] py-3">{user.email}</TableCell>
                                                <TableCell className="text-[14px] py-3">{user.registered}</TableCell>
                                                <TableCell className="text-[14px] py-3">{user.bookings}</TableCell>
                                                <TableCell className="py-3">
                                                    <Button onClick={() => navigate(`/flights/edit/${user.actions}`)}
                                                    className="border rounded-lg"
                                                    >Edit</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>

            </main>
        </div>
    )
}