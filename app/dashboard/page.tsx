// app/dashboard/page.tsx
"use client";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import KpiCard from "@/components/KpiCard";
import LineChartCard from "@/components/LineChartCard";
import BarChartCard from "@/components/BarChartCard";
import TradeTable from "@/components/TradeTable";
import CalendarView from "@/components/CalendarView";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-6">
        <Topbar />

        {/* KPI cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <KpiCard label="Net P&L" value="$2,743.63" />
          <KpiCard label="Win %" value="68.42%" />
          <KpiCard label="Profit Factor" value="8.71" />
          <KpiCard label="Avg Win/Loss" value="4.02" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <LineChartCard />
          <BarChartCard />
        </div>

        {/* Recent trades + calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-3">Recent Trades</h2>
            <TradeTable />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">P&L Calendar</h2>
            <CalendarView />
          </div>
        </div>
      </main>
    </div>
  );
}
