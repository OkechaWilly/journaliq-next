"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";

export default function AddTradeForm({ onTradeAdded }: { onTradeAdded: () => void }) {
  const [symbol, setSymbol] = useState("");
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const [entryPrice, setEntryPrice] = useState<number>(0);
  const [exitPrice, setExitPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);

    const user = (await supabaseBrowser.auth.getUser()).data.user;
    if (!user) {
      setErr("User not logged in");
      setLoading(false);
      return;
    }

    const { error } = await supabaseBrowser.from("trades").insert([
      {
        user_id: user.id,
        symbol,
        trade_type: tradeType,
        entry_price: entryPrice,
        exit_price: exitPrice,
        quantity,
        notes,
        trade_date: new Date().toISOString(), // 👈 add timestamp here
      },
    ]);

    setLoading(false);

    if (error) {
      setErr(error.message);
    } else {
      // Clear form
      setSymbol("");
      setTradeType("buy");
      setEntryPrice(0);
      setExitPrice(0);
      setQuantity(0);
      setNotes("");
      onTradeAdded();
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3 border p-4 rounded-lg">
      {err && <p className="text-red-600">{err}</p>}
      <input
        type="text"
        placeholder="Symbol (e.g., AAPL)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        required
        className="w-full border rounded p-2"
      />
      <select
        value={tradeType}
        onChange={(e) => setTradeType(e.target.value as "buy" | "sell")}
        className="w-full border rounded p-2"
      >
        <option value="buy">Buy</option>
        <option value="sell">Sell</option>
      </select>
      <input
        type="number"
        placeholder="Entry Price"
        value={entryPrice}
        onChange={(e) => setEntryPrice(parseFloat(e.target.value))}
        required
        className="w-full border rounded p-2"
      />
      <input
        type="number"
        placeholder="Exit Price"
        value={exitPrice}
        onChange={(e) => setExitPrice(parseFloat(e.target.value))}
        required
        className="w-full border rounded p-2"
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(parseFloat(e.target.value))}
        required
        className="w-full border rounded p-2"
      />
      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full border rounded p-2"
      />
      <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white p-2 rounded">
        {loading ? "Saving..." : "Add Trade"}
      </button>
    </form>
  );
}
