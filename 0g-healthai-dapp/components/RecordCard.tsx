"use client";

import { useState } from "react";

interface RecordCardProps {
  id: number;
  date: string;
  type: string;
  details: string;
}

export default function RecordCard({ id, date, type, details }: RecordCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{type}</h3>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="text-blue-600 hover:text-blue-800"
        >
          View
        </button>
      </div>
      {isOpen && (
        <div className="mt-2 p-2 bg-gray-50 rounded">
          <p className="text-gray-700">{details}</p>
          <button
            onClick={() => setIsOpen(false)}
            className="mt-2 text-red-600 hover:text-red-800"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}