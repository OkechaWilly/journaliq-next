// components/BarChartCard.tsx
"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function BarChartCard({ data, title }: { data?: any[]; title?: string }) {
  const sample = data ?? [
    { date: "08-07", value: 600 },
    { date: "08-08", value: 343 },
    { date: "08-12", value: 1080 },
  ];

  return (
    <div className="bg-white border rounded-lg p-4">
      <h3 className="font-medium mb-3">{title ?? "Daily P&L"}</h3>
      <div style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sample}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
