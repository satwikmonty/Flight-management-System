import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { searchSchema, type SearchFormValues } from '@/components/schemas/search.schema';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select';

type Route = {
  id: number;
  source: string;
  destination: string;
};

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState<Route[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [routeError, setRouteError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      from: '',
      to: '',
      departure: '',
      return: '',
      passengers: '1'
    }
  });

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const res = await fetch('http://localhost:3000/routes/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({})
        });
        const response = await res.json();
        const routesArray: Route[] = response.data.data; 
        setRoutes(routesArray);
        const uniqueCities = [...new Set(routesArray.flatMap(r => [r.source, r.destination]))];
        setCities(uniqueCities);
      } catch (err) {
        console.error('Error fetching routes:', err);
      }
    };

    fetchRoutes();
  }, []);

  const onSubmit = (data: SearchFormValues) => {
    const match = routes.find(r => r.source === data.from && r.destination === data.to);
    if (!match) {
      setRouteError('No flights on this path exist');
      return;
    }
    setRouteError(null);
    const query = new URLSearchParams(data).toString();
    navigate(`/search?${query}`);
  };

  const handleSearchClick = handleSubmit(onSubmit);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="font-bold text-2xl">XYZ Air Travels</h1>
          <nav className="flex items-center gap-3">
            <Button variant="outline" onClick={() => navigate("/login")}>Login</Button>
            <Button onClick={() => navigate("/userAuth")}>Register</Button>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="max-w-4xl mx-auto mb-12 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Find Your Flight</h2>
              <div className="grid gap-6 items-end">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">From</label>
                    <Select onValueChange={val => setValue('from', val)} value={watch('from')}>
                      <SelectTrigger className='w-full'><SelectValue placeholder="Select departure city" /></SelectTrigger>
                      <SelectContent>
                        {cities.map(city => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.from && <p className="text-sm text-red-500 mt-1">{errors.from.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">To</label>
                    <Select onValueChange={val => setValue('to', val)} value={watch('to')}>
                      <SelectTrigger className='w-full'><SelectValue placeholder="Select arrival city" /></SelectTrigger>
                      <SelectContent>
                        {cities.map(city => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.to && <p className="text-sm text-red-500 mt-1">{errors.to.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="departure" className="block text-sm font-medium text-gray-700 mb-1">Departure Date</label>
                    <Input type="date" {...register("departure")} className="flex flex-col justify-between p-1.5" />
                    {errors.departure && <p className="text-sm text-red-500 mt-1">{errors.departure.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="return" className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
                    <Input type="date" {...register("return")} className="flex flex-col justify-between p-1.5" />
                  </div>
                  <div>
                    <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 mb-1">Passengers</label>
                    <Select onValueChange={val => setValue('passengers', val)} defaultValue="1">
                      <SelectTrigger className='w-full'><SelectValue placeholder="1" /></SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4].map(n => (
                          <SelectItem key={n} value={n.toString()}>{n}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.passengers && <p className="text-sm text-red-500 mt-1">{errors.passengers.message}</p>}
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-center">
                <Button size="lg" className="w-full md:w-auto" type="submit">Search Flights</Button>
              </div>
              {routeError && (
                <p className="text-red-500 text-center text-sm mt-4">{routeError}</p>
              )}
            </CardContent>
          </Card>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["Domestic Flights", "International Flights", "Special Offers"].map((label, i) => (
            <Card key={i} className="shadow-md hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">{label}</h3>
                <p className="text-gray-600 mb-4">
                  {label === "Domestic Flights"
                    ? "Explore our wide range of domestic flight options."
                    : label === "International Flights"
                      ? "Discover international destinations at great prices."
                      : "Check out our latest deals and special promotions."}
                </p>
                <Button variant="outline" className="w-full">View {label}</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <footer className="bg-gray-100 py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">© 2025 XYZ Air Travels Ltd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
