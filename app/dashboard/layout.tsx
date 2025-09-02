// app/dashboard/layout.tsx
"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { BarChart3, BookOpen, Settings, LogOut } from "lucide-react";
import { SignOutButton } from "@/components/SignOutButton";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r shadow-sm flex flex-col">
        <div className="px-6 py-6 border-b">
          <h2 className="text-xl font-bold text-indigo-600">JournalIQ</h2>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-indigo-50"
          >
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            Overview
          </Link>
          <Link
            href="/dashboard/trades"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-indigo-50"
          >
            <BookOpen className="w-5 h-5 text-indigo-600" />
            Trades
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-indigo-50"
          >
            <Settings className="w-5 h-5 text-indigo-600" />
            Settings
          </Link>
        </nav>
        <div className="px-4 py-4 border-t">
            <SignOutButton />
        </div>
      </aside>

      {/* MAIN AREA */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
