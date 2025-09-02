// app/ClientLayout.tsx
"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@/components/SignOutButton";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="text-2xl font-bold text-indigo-600">
            JournalIQ
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/#features" className="hover:text-indigo-600">
              Features
            </Link>
            <Link href="/#pricing" className="hover:text-indigo-600">
              Pricing
            </Link>
            <Link href="/dashboard" className="hover:text-indigo-600">
              Dashboard
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/auth">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth">
              <Button>Get Started</Button>
            </Link>
            <div className="px-4 py-4 border-t">
              <SignOutButton />
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="min-h-[80vh]">{children}</main>

      {/* FOOTER */}
      <footer className="bg-gray-50 border-t mt-16">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-bold text-indigo-600">JournalIQ</h3>
            <p className="text-sm text-gray-500 mt-2">
              Smarter trading starts with better journaling.
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold">Resources</h4>
            <ul className="mt-2 space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/#features">Features</Link>
              </li>
              <li>
                <Link href="/#pricing">Pricing</Link>
              </li>
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold">Company</h4>
            <ul className="mt-2 space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-gray-500 py-4 border-t">
          © {new Date().getFullYear()} JournalIQ. All rights reserved. TatenoPictures
        </div>
      </footer>
    </>
  );
}