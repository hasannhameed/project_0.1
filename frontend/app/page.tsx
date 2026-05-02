"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { API_BASE } from "@/lib/apiClient";

export default function Home() {
  const [status, setStatus] = useState<"loading" | "online" | "offline">("loading");

  useEffect(() => {
    fetch(`${API_BASE}/hello`)
      .then((res) => (res.ok ? setStatus("online") : setStatus("offline")))
      .catch(() => setStatus("offline"));
  }, []);

  const dot =
    status === "online"
      ? "bg-emerald-400 shadow-emerald-400/60"
      : status === "offline"
        ? "bg-rose-400 shadow-rose-400/60"
        : "bg-slate-400 shadow-slate-400/40";

  const label =
    status === "online" ? "Backend online" : status === "offline" ? "Backend offline" : "Checking backend…";

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.22),transparent_60%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
          <span className={`h-1.5 w-1.5 rounded-full shadow-[0_0_8px] ${dot}`} />
          {label}
        </span>

        <h1 className="mb-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Next.js + Express CRUD
        </h1>
        <p className="mb-10 max-w-xl text-balance text-slate-400">
          A simple users dashboard wired to your Express API — create, read, update and delete with a clean, modern UI.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/users"
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 transition hover:from-indigo-400 hover:to-violet-400"
          >
            Manage users →
          </Link>
          <a
            href={`${API_BASE}/users`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/10"
          >
            View raw API
          </a>
        </div>
      </div>
    </main>
  );
}
