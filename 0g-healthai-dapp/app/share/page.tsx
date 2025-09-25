"use client";

import { useState } from "react";
import ShareModal from "@/components/ShareModal";

export default function Share() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Share Records</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
      >
        Share a Record
      </button>
      <ShareModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}