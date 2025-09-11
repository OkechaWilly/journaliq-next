// components/Topbar.tsx
"use client";

import { useState } from "react";

export default function Topbar() {
  const [range, setRange] = useState("This month");

  return (
    <header className="flex items-center justify-between py-4">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-gray-500">Overview of your performance</p>
      </div>

      <div className="flex items-center gap-3">
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        >
          <option>This month</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>

        <button className="px-4 py-2 bg-indigo-600 text-white rounded">+ Add Trade</button>
      </div>
    </header>
  );
}
