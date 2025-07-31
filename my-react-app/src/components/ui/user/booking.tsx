import React from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { LucidePlane, ArrowRight, CircleSmall, CreditCard } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export function Booking() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/dashboard');
    };

    const clicks = () => {
        navigate('/dashboard');
    };


    const clicked = () => {
        navigate('/login');
    };

    const clicker = () => {
        navigate('/login');
    };


    const [date, setDate] = React.useState<Date | undefined>(new Date())

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
                <div>
                    <h1 className="font-bold text-2xl mb-2">Complete Your Booking</h1>
                    <p className="text-gray-600">New York to London • May 25, 2025 • 1 Passenger</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="rounded-lg border-hidden shadow-sm mt-5">
                            <h1 className="p-5 text-xl font-bold">Flight Details</h1>
                            <div className="pt-0 p-6">
                                <div className="rounded-lg border-hidden shadow-sm pl-5">
                                    <div className="flex items-center gap-2 mb-2 pt-4">
                                        <LucidePlane />
                                        <span className="font-medium">XYZ Airways • Flight XY123</span>
                                    </div>

                                    <div className="flex items-center gap-4 mb-4 p-4">
                                        <div>
                                            <h1 className="text-lg font-medium">10:30 AM</h1>
                                            <p className="text-sm text-gray-600">JFK, New York</p>
                                            <p className="text-xs text-gray-600">May 25, 2025</p>
                                        </div>
                                        <div className="flex-1 flex flex-col items-center">
                                            <div className="text-xs text-gray-500">7h 15m</div>
                                            <div className="w-full flex items-center">
                                                <div className="h-0.5 flex-1 bg-gray-300"></div>
                                                <ArrowRight />
                                                <div className="h-0.5 flex-1 bg-gray-300"></div>
                                            </div>
                                        </div>
                                        <div>
                                            <h1 className="text-lg font-medium">05:45 PM</h1>
                                            <p className="text-sm text-gray-600">LHR, London</p>
                                            <p className="text-xs text-gray-600">May 25, 2025</p>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        <p>Boeing 787 • Economy Class</p>
                                        <p>Baggage allowance: 1 x 23kg checked, 1 x 7kg cabin</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Card className="rounded-lg border-hidden shadow-sm">
                            <CardHeader className="p-5">
                                <CardTitle className='tracking-tight text-2xl font-bold'>Passenger Information</CardTitle>
                                <CardDescription className='text-sm text-muted-foreground text-gray-500'>
                                    Please enter details for all passengers
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2 mb-4">
                                        <Label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">First Name</Label>
                                        <Input
                                            id="name"
                                            type="name"
                                            placeholder="First Name"
                                            required
                                            className="flex h-10 w-full rounded-md border-hidden shadow-sm border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        />
                                        <div className="space-y-2"></div>
                                    </div>
                                    <div className="space-y-2 mb-4">
                                        <Label htmlFor="name">Last Name</Label>
                                        <Input
                                            id="name"
                                            type="name"
                                            placeholder="Last Name"
                                            required
                                            className="flex h-10 w-full rounded-md border-hidden shadow-sm border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        />
                                        <div className="space-y-2"></div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2 mb-4">
                                        <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="dob" >Date Of Birth</Label>
                                        <Input
                                            id="dob"
                                            type='date'
                                            className="rounded-md border-hidden shadow-sm">
                                        </Input>
                                        <div className="space-y-2"></div>
                                    </div>
                                    <div className="space-y-2 mb-4">
                                        <Label htmlFor="gender">Gender</Label>
                                        <select name="gender" id="gender" className="w-full rounded-lg border-hidden shadow-sm">
                                            <option value="" disabled selected>Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="trans">Transgender</option>
                                        </select>
                                        <div className="space-y-2"></div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2 mb-4">
                                        <Label htmlFor="pnum" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Passport Number</Label>
                                        <Input
                                            id="pnumber"
                                            type="number"
                                            placeholder="XXXXXXXX"
                                            required
                                            className="flex h-10 w-full rounded-md border-hidden shadow-sm border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        />
                                        <div className="space-y-2"></div>
                                    </div>
                                    <div className="space-y-2 mb-4">
                                        <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="pex" >Passport Expiry</Label>
                                        <Input
                                            id="pex"
                                            type='date'
                                            className="rounded-md border-hidden shadow-sm">
                                        </Input>
                                        <div className="space-y-2"></div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2 mb-4">
                                        <Label htmlFor="nationality">Nationality</Label>
                                        <select name="nationality" id="nationality" className="w-full rounded-lg border-hidden shadow-sm">
                                            <option value="" disabled selected>Select Nationality</option>
                                            <option value="indian">Indian</option>
                                            <option value="us">United States of America</option>
                                            <option value="uk">United Kingdom</option>
                                            <option value="aus">Australia</option>
                                        </select>
                                        <div className="space-y-2"></div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="rounded-lg border-hidden shadow-sm">
                            <CardHeader >
                                <h1 className="font-bold text-2xl">Payment Information</h1>
                                <div className="flex items-center gap-2 mb-2 pt-4">
                                    <CircleSmall />
                                    <CreditCard />
                                    <span >Credit/Debit Card</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2 mb-4">
                                    <Label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name on Card</Label>
                                    <Input
                                        id="cname"
                                        type="name"
                                        placeholder="Name"
                                        required
                                        className="flex h-10 w-full rounded-md border-hidden shadow-sm border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                </div>
                                <div className="space-y-2 mb-4">
                                    <Label htmlFor="cnum" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Card Number</Label>
                                    <Input
                                        id="cnumber"
                                        type="number"
                                        placeholder="XXXX XXXX XXXX XXXX"
                                        required
                                        className="flex h-10 w-full rounded-md border-hidden shadow-sm border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                    <div className="space-y-2"></div>
                                </div>
                                <div className="grid grid-cols-3">
                                    <div className="space-y-2 mb-4">
                                        <Label htmlFor="emonth">Expiry Month</Label>
                                        <select name="emonth" id="emonth" className="w-full rounded-lg border-hidden shadow-sm">
                                            <option value="" disabled selected>MM</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                        </select>
                                        <div className="space-y-2"></div>
                                    </div>
                                    <div className="space-y-2 mb-4">
                                        <Label htmlFor="eyear">Expiry Year</Label>
                                        <select name="eyear" id="eyear" className="w-full rounded-lg border-hidden shadow-sm">
                                            <option value="" disabled selected>YYYY</option>
                                            <option value="2025">2025</option>
                                            <option value="2026">2026</option>
                                            <option value="2027">2027</option>
                                            <option value="2028">2028</option>
                                            <option value="2029">2029</option>
                                            <option value="2030">2030</option>
                                            <option value="2031">2031</option>
                                            <option value="2032">2032</option>
                                            <option value="2033">2033</option>
                                            <option value="2034">2034</option>
                                        </select>
                                        <div className="space-y-2"></div>
                                    </div>
                                    <div className="space-y-2 mb-4">
                                    <Label htmlFor="cvv" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">CVV</Label>
                                    <Input
                                        id="cvv"
                                        type="number"
                                        placeholder="XXX"
                                        required
                                        className="flex h-10 w-full rounded-md border-hidden shadow-sm border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                    <div className="space-y-2"></div>
                                </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="lg:col-span-1">
                        <Card className="rounded-lg border-hidden shadow-sm">
                            <CardHeader className="font-bold text-2xl">
                                Booking Summary
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between text-xl p-2">
                                    <div>Base Fare</div>
                                    <div>$649.00</div>
                                </div>
                                <div className="flex justify-between text-xl p-2">
                                    <div>Taxes & fees</div>
                                    <div>$100.00</div>
                                </div>
                                <div className="flex justify-between text-xl p-2 mb-5">
                                    <div>Baggage Fees</div>
                                    <div>$0.00</div>
                                </div>
                                <div className="h-0.5 flex-1 bg-gray-300 mb-5"></div>
                                <CardFooter className="flex-col">
                                    <Button type='submit'
                                    className="w-full text-white bg-black"
                                    onClick={clicker}>
                                        Complete Booking
                                    </Button>
                                </CardFooter>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            <footer className='flex bg-gray-200 items-center justify-center h-17'>
                © 2025 XYZ Air Travels Ltd. All rights reserved.
            </footer>
        </div>
    )
}