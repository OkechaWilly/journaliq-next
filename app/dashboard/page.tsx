// app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth/sign-in");
  }

  // (You can also fetch user-specific data here server-side if needed)
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Welcome to your Dashboard</h1>
      <p className="text-gray-600">
        Here’s a quick snapshot of your trading performance. 🚀
      </p>
      {/* Charts and stats coming next */}
    </div>
  );
}
