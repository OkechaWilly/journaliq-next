"use client";

import { supabaseBrowser } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      className="w-full flex items-center gap-2 justify-start"
      onClick={async () => {
        await supabaseBrowser.auth.signOut();
        router.push("/auth/sign-in");
      }}
    >
      Log Out
    </Button>
  );
}
