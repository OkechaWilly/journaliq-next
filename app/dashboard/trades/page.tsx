"use client";

import { useState } from "react";
import AddTradeForm from "@/components/AddTradeForm";
import TradeList from "@/components/TradeList";

export default function TradesPage() {
  const [refresh, setRefresh] = useState(false);

  const handleTradeAdded = () => {
    // Toggle refresh to re-render TradeList
    setRefresh(!refresh);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold mb-6">My Trades</h1>
      <AddTradeForm onTradeAdded={handleTradeAdded} />
      {/* Key forces re-mount when refresh changes */}
      <TradeList key={refresh.toString()} />
    </div>
  );
}
