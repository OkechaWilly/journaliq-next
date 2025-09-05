"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import AddTradeForm from "@/components/AddTradeForm";
import TradeList from "@/components/TradeList";

export default function DashboardPage() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const { data: listener } = supabaseBrowser.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    supabaseBrowser.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading && !session) {
      router.push("/auth/sign-in");
    }
  }, [session, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to JournalIQ Dashboard</h1>

      {/* Trade form */}
      <AddTradeForm onTradeAdded={() => setRefresh(!refresh)} />

      {/* Trade list */}
      <div className="mt-6">
        <TradeList key={refresh ? "r1" : "r0"} />
      </div>
    </div>
  );
}
