"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";

interface Trade {
  id: string;
  symbol: string;
  trade_type: string;
  entry_price: number;
  exit_price: number;
  quantity: number;
  notes: string;
  trade_date: string;
}

export default function TradeList() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTrades = async () => {
    setLoading(true);
    const user = (await supabaseBrowser.auth.getUser()).data.user;
    if (!user) return;

    const { data, error } = await supabaseBrowser
      .from("trades")
      .select("*")
      .eq("user_id", user.id)
      .order("trade_date", { ascending: false });

    if (error) console.error(error.message);
    else setTrades(data as Trade[]);

    setLoading(false);
  };

  useEffect(() => {
    fetchTrades();
  }, []);

  if (loading) return <p>Loading trades...</p>;
  if (trades.length === 0) return <p>No trades yet.</p>;

  return (
    <div className="space-y-2">
      {trades.map((t) => (
        <div key={t.id} className="border p-3 rounded-lg">
          <p>
            <strong>{t.symbol}</strong> ({t.trade_type}) - {t.quantity} units @ {t.entry_price} → {t.exit_price}
          </p>
          {t.notes && <p className="text-gray-600">{t.notes}</p>}
          <p className="text-sm text-gray-500">{new Date(t.trade_date).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
