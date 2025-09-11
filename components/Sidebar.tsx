// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { BarChart3, List, Calendar as CalIcon, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r p-5 flex flex-col min-h-screen">
      <div className="mb-8">
        <Link href="/" className="text-xl font-extrabold text-indigo-600">
          JournalIQ
        </Link>
      </div>

      <nav className="flex-1 space-y-1">
        <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50">
          <BarChart3 className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium">Overview</span>
        </Link>

        <Link href="/dashboard/trades" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50">
          <List className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium">Trades</span>
        </Link>

        <Link href="/journal" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50">
          <CalIcon className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium">Journal</span>
        </Link>

        <Link href="/settings" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50">
          <Settings className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium">Settings</span>
        </Link>
      </nav>

      <div className="mt-6">
        <Link href="/auth/sign-in" className="block text-sm text-gray-500 hover:underline">
          Sign out
        </Link>
      </div>
    </aside>
  );
}
