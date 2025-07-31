import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFlightStore } from '../store/flight.store';
import { useNavigate } from 'react-router-dom';
import { flightSearchSchema, type FlightSearchFormData  } from '../components/schemas/flight.search.schema';

interface Props {
  redirectToSearchPage?: boolean;
  cities: string[];
  routeError?: string | null;
  onSearchParams?: (params: URLSearchParams) => void;
  onError?: (msg: string | null) => void;
}


export const FlightSearchForm: React.FC<Props> = ({ redirectToSearchPage = false }) => {
  const navigate = useNavigate();
  const { searchAction } = useFlightStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FlightSearchFormData>({
    resolver: zodResolver(flightSearchSchema),
    defaultValues: {
      from: '',
      to: '',
      departure: '',
      return: '',
      passengers: 1,
    },
  });

  const onSubmit = async (data: FlightSearchFormData) => {
    if (redirectToSearchPage) {
      const searchParams = new URLSearchParams({
        from: data.from,
        to: data.to,
        departure: data.departure,
        return: data.return || '',
        passengers: String(data.passengers),
      });
      navigate(`/search?${searchParams.toString()}`);
    } else {
      // optionally call Zustand logic for in-place filtering
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded shadow-md w-full max-w-xl">
      <div className="flex gap-4">
        <input {...register('from')} placeholder="From" className="input" />
        <input {...register('to')} placeholder="To" className="input" />
      </div>

      <div className="flex gap-4">
        <input {...register('departure')} type="date" className="input" />
        <input {...register('return')} type="date" className="input" />
      </div>

      <select {...register('passengers', { valueAsNumber: true })} className="input w-full">
        {[1, 2, 3, 4, 5].map(n => (
          <option key={n} value={n}>{n} Passenger{n > 1 ? 's' : ''}</option>
        ))}
      </select>

      <div className="flex gap-4">
        <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-600 text-white rounded">
          {isSubmitting ? 'Searching...' : 'Search Flights'}
        </button>
        <button type="button" onClick={() => reset()} className="px-4 py-2 border rounded">
          Clear
        </button>
      </div>

      {searchAction.error && (
        <p className="text-red-600 text-sm">Error: {searchAction.error}</p>
      )}
    </form>
  );
};
