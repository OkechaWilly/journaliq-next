"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const { error } = await supabaseBrowser.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setErr(error.message);
      return;
    }
    router.push("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto py-16 px-6">
      <h1 className="text-2xl font-bold mb-6">Sign in to JournalIQ</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="email"
          className="w-full border rounded-xl p-3"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <input
          type="password"
          className="w-full border rounded-xl p-3"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <Button type="submit" className="w-full rounded-xl" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <p className="text-sm text-gray-600 mt-4">
        Don’t have an account?{" "}
        <Link href="/auth/sign-up" className="text-indigo-600 underline">
          Create one
        </Link>
      </p>
    </div>
  );
}
