"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";

export default function TradeList() {
  const [trades, setTrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTrades();
  }, []);

  const fetchTrades = async () => {
    setLoading(true);
    setError(null);

    const {
      data: { user },
    } = await supabaseBrowser.auth.getUser();

    if (!user) {
      setError("Not logged in");
      setLoading(false);
      return;
    }

    const { data, error } = await supabaseBrowser
      .from("trades")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setTrades(data || []);
    }
    setLoading(false);
  };

  if (loading) return <p>Loading trades...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (trades.length === 0) return <p>No trades yet. Add your first one above.</p>;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-3">Your Trades</h2>
      <ul className="space-y-2">
        {trades.map((trade) => (
          <li key={trade.id} className="border p-3 rounded-md">
            <div className="flex justify-between">
              <span className="font-medium">{trade.symbol}</span>
              <span className={trade.trade_type === "buy" ? "text-green-600" : "text-red-600"}>
                {trade.trade_type.toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-gray-700">
              Entry: {trade.entry_price} | Exit: {trade.exit_price} | Qty: {trade.quantity}
            </p>
            {trade.notes && <p className="text-gray-600 text-sm mt-1">{trade.notes}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
