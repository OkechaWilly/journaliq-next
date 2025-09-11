// components/TradeTable.tsx
"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";

type Trade = {
  id: string;
  symbol: string;
  trade_type: string;
  entry_price: number;
  exit_price: number;
  quantity: number;
  notes?: string;
  trade_date?: string;
};

export default function TradeTable() {
  const [trades, setTrades] = useState<Trade[] | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchTrades = async () => {
    setLoading(true);
    const userResp = await supabaseBrowser.auth.getUser();
    const user = userResp.data?.user;
    if (!user) {
      setTrades([]);
      setLoading(false);
      return;
    }

    const { data, error } = await supabaseBrowser
      .from("trades")
      .select("*")
      .eq("user_id", user.id)
      .order("trade_date", { ascending: false })
      .limit(10);

    if (error) {
      console.error(error);
      setTrades([]);
    } else {
      setTrades(data as Trade[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTrades();
    // optionally listen for changes using realtime later
  }, []);

  if (loading) return <div className="p-4 text-sm text-gray-500">Loading trades...</div>;
  if (!trades || trades.length === 0) return <div className="p-4 text-sm text-gray-500">No trades yet.</div>;

  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Symbol</th>
            <th className="px-4 py-3 text-left">Type</th>
            <th className="px-4 py-3 text-left">P&L</th>
            <th className="px-4 py-3 text-left">Notes</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((t) => (
            <tr key={t.id} className="border-t">
              <td className="px-4 py-3">{t.trade_date ? new Date(t.trade_date).toLocaleDateString() : "-"}</td>
              <td className="px-4 py-3 font-medium">{t.symbol}</td>
              <td className="px-4 py-3">{t.trade_type}</td>
              <td className="px-4 py-3">
                {/* simple P&L calc: (exit - entry) * qty */}
                {typeof t.entry_price === "number" && typeof t.exit_price === "number"
                  ? `$${((t.exit_price - t.entry_price) * (t.quantity ?? 1)).toFixed(2)}`
                  : "-"}
              </td>
              <td className="px-4 py-3 text-gray-600">{t.notes ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
