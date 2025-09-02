"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LineChart, BookOpen, Upload } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-indigo-50 to-white py-24 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900"
        >
          JournalIQ
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
        >
          Smarter trading starts here. Track, analyze, and refine your edge with
          the all-in-one trading journal.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Button size="lg" className="px-10 py-6 text-lg rounded-2xl shadow-lg">
            Get Started Free
          </Button>
        </motion.div>
      </section>

      {/* Features */}
      <section className="w-full max-w-6xl py-24 grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {[
          {
            title: "Import Trades",
            desc: "Upload trades from your broker or platform instantly.",
            icon: <Upload className="w-8 h-8 text-indigo-600" />,
          },
          {
            title: "Analyze Performance",
            desc: "Deep insights into P&L, win rate, drawdowns, and more.",
            icon: <LineChart className="w-8 h-8 text-indigo-600" />,
          },
          {
            title: "Build Playbooks",
            desc: "Document and refine your trading strategies with data.",
            icon: <BookOpen className="w-8 h-8 text-indigo-600" />,
          },
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="p-8 bg-white shadow-xl rounded-2xl hover:shadow-2xl transition-shadow"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Pricing */}
      <section className="w-full bg-gray-50 py-24 px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-12"
        >
          Pricing
        </motion.h2>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="p-10 bg-white rounded-2xl shadow-xl hover:shadow-2xl"
          >
            <h3 className="text-2xl font-semibold mb-4">Free</h3>
            <p className="mb-6 text-gray-600">
              Essential journaling features to kickstart your trading journey.
            </p>
            <Button variant="outline" className="rounded-xl px-8 py-5">
              Start Free
            </Button>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="p-10 bg-white rounded-2xl shadow-xl border-2 border-indigo-500 hover:shadow-2xl"
          >
            <h3 className="text-2xl font-semibold mb-4">Pro</h3>
            <p className="mb-6 text-gray-600">
              Unlock AI insights, advanced analytics, and strategy playbooks.
            </p>
            <Button className="rounded-xl px-8 py-5">Coming Soon</Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 bg-gray-900 text-gray-400 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          © {new Date().getFullYear()} JournalIQ. All rights reserved.
        </motion.p>
      </footer>
    </main>
  );
}
