"use client";

import { useState } from "react";

export default function ScheduleCallModal({ open, onClose }) {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      company: form.get("company"),
      phone: form.get("phone"),
      need: form.get("need"),
      message: form.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to send");

      setSent(true);
      e.currentTarget.reset();
      setTimeout(() => {
        setSent(false);
        onClose?.();
      }, 900);
    } catch (err) {
      setError(err.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">
      {/* Backdrop */}
      <button
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/70"
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-black/60 backdrop-blur p-6 md:p-8 shadow-[0_30px_120px_rgba(0,0,0,0.65)]">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-slate-400">
              Schedule a Call
            </div>
            <h3 className="mt-2 text-2xl md:text-3xl font-semibold text-slate-100">
              Tell us what you need.
            </h3>
            <p className="mt-2 text-sm text-slate-300 max-w-xl">
              We’ll review your request and respond with next steps. (Telegram alerts will be added later.)
            </p>
          </div>

          <button
            onClick={onClose}
            className="px-3 py-2 rounded-xl border border-white/10 bg-black/40 text-slate-200 hover:bg-black/55 transition"
          >
            Close
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-xs text-slate-400">Name</label>
              <input
                name="name"
                required
                className="mt-1 w-full rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-slate-100 outline-none focus:border-white/20"
                placeholder="John Smith"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400">Email</label>
              <input
                name="email"
                type="email"
                required
                className="mt-1 w-full rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-slate-100 outline-none focus:border-white/20"
                placeholder="john@company.com"
              />
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-xs text-slate-400">Company</label>
              <input
                name="company"
                className="mt-1 w-full rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-slate-100 outline-none focus:border-white/20"
                placeholder="Acme Inc."
              />
            </div>

            <div>
              <label className="text-xs text-slate-400">Phone (optional)</label>
              <input
                name="phone"
                className="mt-1 w-full rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-slate-100 outline-none focus:border-white/20"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400">What do you need?</label>
            <select
              name="need"
              className="mt-1 w-full rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-slate-100 outline-none focus:border-white/20"
              defaultValue="managed-it"
            >
              <option value="managed-it">Managed IT / Support</option>
              <option value="security">Cybersecurity</option>
              <option value="backup">Backup & Recovery</option>
              <option value="web">Website Design & Development</option>
              <option value="app">App Development (MVP)</option>
              <option value="combo">Combination (IT + Web/App)</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-400">Message</label>
            <textarea
              name="message"
              required
              className="mt-1 w-full min-h-[120px] rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-slate-100 outline-none focus:border-white/20"
              placeholder="Briefly describe your goals, timeline, and current setup..."
            />
          </div>

          {error ? (
            <div className="text-sm text-red-300 border border-red-500/20 bg-red-500/10 rounded-xl px-4 py-3">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 rounded-xl bg-bf-primary text-black font-semibold shadow-lg shadow-emerald-500/25 disabled:opacity-60"
          >
            {sent ? "Sent" : loading ? "Sending..." : "Send Request"}
          </button>
        </form>
      </div>
    </div>
  );
}
