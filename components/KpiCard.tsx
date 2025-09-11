// components/KpiCard.tsx
import React from "react";

export default function KpiCard({ label, value, small }: { label: string; value: string | number; small?: boolean }) {
  return (
    <div className="bg-white border rounded-lg p-4">
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`font-bold ${small ? "text-lg" : "text-2xl"} mt-1`}>{value}</p>
    </div>
  );
}
