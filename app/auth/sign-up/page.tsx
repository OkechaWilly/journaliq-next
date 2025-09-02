"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setOk(null);
    setLoading(true);
    const { error } = await supabaseBrowser.auth.signUp({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setErr(error.message);
      return;
    }
    // If email confirmations are on, user must confirm.
    setOk("Check your email to confirm your account.");
    // Optionally: router.push("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto py-16 px-6">
      <h1 className="text-2xl font-bold mb-6">Create your JournalIQ account</h1>
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
          placeholder="Create a strong password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
        {err && <p className="text-red-600 text-sm">{err}</p>}
        {ok && <p className="text-green-700 text-sm">{ok}</p>}
        <Button type="submit" className="w-full rounded-xl" disabled={loading}>
          {loading ? "Creating..." : "Sign Up"}
        </Button>
      </form>

      <p className="text-sm text-gray-600 mt-4">
        Already have an account?{" "}
        <Link href="/auth/sign-in" className="text-indigo-600 underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
