import React from 'react';
import { ArrowRight } from 'lucide-react';

interface NonStopFlightPathProps {
  departureTime: string;
  departureAirport: string;
  arrivalTime: string;
  arrivalAirport: string;
  flightDuration: string;
}

const NonStopFlightPath: React.FC<NonStopFlightPathProps> = ({
  departureTime,
  departureAirport,
  arrivalTime,
  arrivalAirport,
  flightDuration,
}) => {
  return (
    <div className="flex items-center justify-between w-full  pr-4">
      <div className="flex flex-col items-start">
        <span className="text-lg font-bold text-gray-900">{departureTime}</span>
        <span className="text-sm text-gray-600 ">{departureAirport}</span>
      </div>

      <div className="flex flex-col items-center flex-grow mx-4">
        <span className="text-sm text-gray-700 text-s">{flightDuration}</span>

        <div className="relative flex items-center w-full">
          <hr className="flex-grow border-b border-gray-400 " />
          <ArrowRight className="text-gray-500 w-5 h-5  justify-center" />
                    <hr className="flex-grow border-b border-gray-400 " />
        </div>

        <span className="text-sm text-gray-700 text-s ">Non-stop</span>
      </div>

      <div className="flex flex-col items-end">
        <span className="text-lg font-bold text-gray-900">{arrivalTime}</span>
        <span className="text-sm text-gray-600">{arrivalAirport}</span>
      </div>
    </div>
  );
};

export default NonStopFlightPath;