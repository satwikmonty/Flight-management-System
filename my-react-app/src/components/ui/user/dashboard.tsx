import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import {
    Card
} from "@/components/ui/card"
import { LucideCalendarDays, LucideClock3, LucidePlane, LucideCreditCard, LucideTicket } from 'lucide-react';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"


export function Dashboard() {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/dashboard');
    };

    const clicks = () => {
        navigate('/profile');
    };


    const clicked = () => {
        navigate('/login');
    };

    const fclick = () => {
        navigate('/');
    };

    const tclick = () => {
        navigate('/login');
    };

    const pclick = () => {
        navigate('/login');
    };


    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [activeTab, setActiveTab] = useState("upcoming-book");

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [userName, setUserName] = useState("");

    useEffect(() => {
        const storedName = sessionStorage.getItem("fullName");
        if (storedName) {
            setUserName(storedName);
        }
    }, []);


    return (
        <div className='min-h-screen flex flex-col ml-auto' >
            <header className='border-b'>
                <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
                    <h1 className='font-extrabold text-2xl'>XYZ Air Travels</h1>
                    <div className='flex gap-4 items-center'>
                        <Button variant="link"
                            onClick={handleClick}
                            className='text-[16px]'
                        >Dashboard</Button>
                        <Button variant="link"
                            onClick={clicks}
                            className='text-[16px]'
                        >Profile</Button>
                        <Button variant="link"
                            onClick={clicked}
                            className='border rounded-lg'
                        >Logout</Button>
                    </div>
                </div>
            </header>
            <main className='flex-1 container mx-auto px-4 py-8'>
                <h1 className='font-extrabold text-4xl mb-5'>Welcome, {userName}</h1>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
                    <Card className='rounded-lg border-hidden shadow-sm'>
                        <div className='p-4 pt-2'>
                            <div className='flex items-center gap-4'>
                                <div className='bg-blue-100 rounded-full p-2'>
                                    <LucidePlane />
                                </div>
                                <div>
                                    <p className='text-base text-gray-500'>Total Bookings</p>
                                    <p className='text-2xl font-bold'>17</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card className='rounded-lg border-hidden shadow-sm'>
                        <div className='p-4 pt-2'>
                            <div className='flex items-center gap-4'>
                                <div className='bg-green-200 rounded-full p-2'>
                                    <LucideCalendarDays />
                                </div>
                                <div>
                                    <p className='text-base text-gray-500'>Upcoming Trips</p>
                                    <p className='text-2xl font-bold'>3</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card className='rounded-lg border-hidden shadow-sm'>
                        <div className='p-4 pt-2'>
                            <div className='flex items-center gap-4'>
                                <div className='bg-purple-100 rounded-full p-2'>
                                    <LucideClock3 />
                                </div>
                                <div>
                                    <p className='text-base text-gray-500'>Past Trips</p>
                                    <p className='text-2xl font-bold'>14</p>
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
                                    <p className='text-base text-gray-500'>Saved Cards</p>
                                    <p className='text-2xl font-bold'>2</p>
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
                            <p>Book a flight</p>
                        </div>
                    </Button>
                    <Button variant="link"
                        onClick={tclick}
                        className='box-content size h-20 rounded-lg border-hidden shadow-sm'
                    >
                        <div className='flex flex-col items-center justify-center'>
                            <LucideTicket className='rounded-lg size-5' />
                            <p>View Tickets</p>
                        </div>
                    </Button>
                    <Button variant="link"
                        onClick={pclick}
                        className='box-content size h-20 rounded-lg border-hidden shadow-sm'
                    >
                        <div className='flex flex-col items-center justify-center'>
                            <LucideCreditCard className='rounded-lg size-5' />
                            <p>Manage Payment Methods</p>
                        </div>
                    </Button>
                </div>


                <Tabs defaultValue={activeTab} value={activeTab} onValueChange={(value) => setActiveTab(value)}>
                    {isMobile ? (
                        <select onChange={(e) => setActiveTab(e.target.value)} value={activeTab}>
                            <option value="upcoming-book">Upcoming Bookings</option>
                            <option value="past-book">Past Bookings</option>
                            <option value="cancel-book">Cancelled Bookings</option>
                        </select>
                    ) : (
                        <TabsList className="bg-gray-300 h-10 w-full">
                            <TabsTrigger value="upcoming-book">Upcoming Bookings</TabsTrigger>
                            <TabsTrigger value="past-book">Past Bookings</TabsTrigger>
                            <TabsTrigger value="cancel-book">Cancelled Bookings</TabsTrigger>
                        </TabsList>
                    )}
                    <TabsContent value="upcoming-book">
                        <div className='border rounded-lg border-gray-200 shadow-sm w-full'>
                            <div className='flex flex-col space-y-1.5 p-8'>
                                <h1 className='font-bold text-2xl'>Upcoming Bookings</h1>
                                <p className='text-sm text-gray-500'>Your upcoming flight reservations</p>
                            </div>
                            <div className='p-4'>
                                <div className='border rounded-lg border-gray-200 shadow-sm p-4'>
                                    <div className='flex justify-between items-start mb-2'>
                                        <div>
                                            <h1 className='font-medium'>New York to London</h1>
                                            <p className='text-gray-500'>Flight XY123 • May 25, 2025</p>
                                        </div>
                                        <Button variant='link'
                                            onClick={pclick}
                                            className='border rounded-lg'>
                                            Manage
                                        </Button>
                                    </div>
                                    <div className='flex justify-between items-start text-sm'>
                                        <span>Departure: 5:00 AM</span>
                                        <span>Arrival: 10:30 AM</span>
                                        <span>Passengers: 3</span>
                                    </div>
                                </div>
                            </div>
                            <div className='p-4'>
                                <div className='border rounded-lg border-gray-200 shadow-sm p-4'>
                                    <div className='flex justify-between items-start mb-2'>
                                        <div>
                                            <h1 className='font-medium'>Tokyo to Paris</h1>
                                            <p className='text-gray-500'>Flight AB789 • May 14, 2025</p>
                                        </div>
                                        <Button variant='link'
                                            onClick={pclick}
                                            className='border rounded-lg'>
                                            Manage
                                        </Button>
                                    </div>
                                    <div className='flex justify-between items-start text-sm'>
                                        <span>Departure: 5:00 AM</span>
                                        <span>Arrival: 00:30 AM</span>
                                        <span>Passengers: 1</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="past-book">
                        <div className='border rounded-lg border-gray-200 shadow-sm w-full'>
                            <div className='flex flex-col space-y-1.5 p-8'>
                                <h1 className='font-bold text-2xl'>Past Bookings</h1>
                                <p className='text-sm text-gray-500'>Your previous flight reservations</p>
                            </div>
                            <div className='p-4'>
                                <div className='border rounded-lg border-gray-200 shadow-sm p-4'>
                                    <div className='flex justify-between items-start mb-2'>
                                        <div>
                                            <h1 className='font-medium'>New York to London</h1>
                                            <p className='text-gray-500'>Flight XY123 • May 25, 2025</p>
                                        </div>
                                        <Button variant='link'
                                            onClick={pclick}
                                            className='border rounded-lg'>
                                            View Details
                                        </Button>
                                    </div>
                                    <div className='flex justify-between items-start text-sm'>
                                        <span>Departure: 5:00 AM</span>
                                        <span>Arrival: 10:30 AM</span>
                                        <span>Passengers: 3</span>
                                    </div>
                                </div>
                            </div>
                            <div className='p-4'>
                                <div className='border rounded-lg border-gray-200 shadow-sm p-4'>
                                    <div className='flex justify-between items-start mb-2'>
                                        <div>
                                            <h1 className='font-medium'>Tokyo to Paris</h1>
                                            <p className='text-gray-500'>Flight AB789 • May 14, 2025</p>
                                        </div>
                                        <Button variant='link'
                                            onClick={pclick}
                                            className='border rounded-lg'>
                                            View Details
                                        </Button>
                                    </div>
                                    <div className='flex justify-between items-start text-sm'>
                                        <span>Departure: 5:00 AM</span>
                                        <span>Arrival: 00:30 AM</span>
                                        <span>Passengers: 1</span>
                                    </div>
                                </div>
                            </div>
                            <div className='p-4'>
                                <div className='border rounded-lg border-gray-200 shadow-sm p-4'>
                                    <div className='flex justify-between items-start mb-2'>
                                        <div>
                                            <h1 className='font-medium'>Tokyo to Paris</h1>
                                            <p className='text-gray-500'>Flight AB789 • May 14, 2025</p>
                                        </div>
                                        <Button variant='link'
                                            onClick={pclick}
                                            className='border rounded-lg'>
                                            View Details
                                        </Button>
                                    </div>
                                    <div className='flex justify-between items-start text-sm'>
                                        <span>Departure: 5:00 AM</span>
                                        <span>Arrival: 00:30 AM</span>
                                        <span>Passengers: 1</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="cancel-book">
                        <div className='border rounded-lg border-gray-200 shadow-sm w-full'>
                            <div className='flex flex-col space-y-1.5 p-8'>
                                <h1 className='font-bold text-2xl'>Cancelled Bookings</h1>
                                <p className='text-sm text-gray-500'>Your cancelled flight reservations</p>
                            </div>
                            <div className='p-4'>
                                <div className='border rounded-lg border-gray-200 shadow-sm p-4'>
                                    <div className='flex justify-between items-start mb-2'>
                                        <div>
                                            <h1 className='font-medium'>New York to London</h1>
                                            <p className='text-gray-500'>Flight XY123 • May 25, 2025</p>
                                        </div>
                                        <Button variant='link'
                                            onClick={pclick}
                                            className='border rounded-lg'>
                                            View Details
                                        </Button>
                                    </div>
                                    <div className='flex justify-between items-start text-sm'>
                                        <span>Departure: 5:00 AM</span>
                                        <span>Arrival: 10:30 AM</span>
                                        <span>Passengers: 3</span>
                                    </div>
                                </div>
                            </div>
                            <div className='p-4'>
                                <div className='border rounded-lg border-gray-200 shadow-sm p-4'>
                                    <div className='flex justify-between items-start mb-2'>
                                        <div>
                                            <h1 className='font-medium'>Tokyo to Paris</h1>
                                            <p className='text-gray-500'>Flight AB789 • May 14, 2025</p>
                                        </div>
                                        <Button variant='link'
                                            onClick={pclick}
                                            className='border rounded-lg'>
                                            View Details
                                        </Button>
                                    </div>
                                    <div className='flex justify-between items-start text-sm'>
                                        <span>Departure: 5:00 AM</span>
                                        <span>Arrival: 00:30 AM</span>
                                        <span>Passengers: 1</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </main>
            <footer className='flex bg-gray-200 items-center justify-center h-17'>
                © 2025 XYZ Air Travels Ltd. All rights reserved.
            </footer>
        </div>
    )
}
