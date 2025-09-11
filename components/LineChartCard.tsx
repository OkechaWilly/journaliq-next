// components/LineChartCard.tsx
"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function LineChartCard({ data, title }: { data?: any[]; title?: string }) {
  const sample = data ?? [
    { date: "08-01", value: 0 },
    { date: "08-02", value: 200 },
    { date: "08-03", value: 500 },
    { date: "08-04", value: 900 },
    { date: "08-05", value: 1200 },
  ];

  return (
    <div className="bg-white border rounded-lg p-4">
      <h3 className="font-medium mb-3">{title ?? "Net P&L (sample)"}</h3>
      <div style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sample}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
