// src/components/ContactForm.tsx
"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    message: "",
    honeypot: "", // simple spam trap
  });
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.honeypot) return; // bot filled hidden field
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.ok === false) throw new Error(data?.error || "Send failed");
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", location: "", message: "", honeypot: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 grid md:grid-cols-2 gap-4">
      {/* Honeypot (hidden) */}
      <input
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        name="company"
        value={form.honeypot}
        onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
      />

      <input
        name="name"
        required
        placeholder="Your Name"
        className="rounded-2xl border p-3 outline-none focus:ring-2 focus:ring-amber-300"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        name="email"
        type="email"
        required
        placeholder="Email"
        className="rounded-2xl border p-3 outline-none focus:ring-2 focus:ring-amber-300"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        name="phone"
        placeholder="Phone"
        className="rounded-2xl border p-3 outline-none focus:ring-2 focus:ring-amber-300"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <input
        name="location"
        placeholder="Postcode / Area"
        className="rounded-2xl border p-3 outline-none focus:ring-2 focus:ring-amber-300"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
      />
      <textarea
        name="message"
        required
        placeholder="Project details (scope, timeline, budget)"
        className="md:col-span-2 rounded-2xl border p-3 min-h-[120px] outline-none focus:ring-2 focus:ring-amber-300"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />

      <div className="md:col-span-2 flex items-center gap-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center rounded-2xl bg-slate-900 text-white px-4 py-2 disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Submit Request"}
        </button>

        {status === "sent" && (
          <span className="text-emerald-600">Thanks! We’ll be in touch shortly.</span>
        )}
        {status === "error" && (
          <span className="text-red-600">Sorry—something went wrong. Please try again.</span>
        )}
      </div>
    </form>
  );
}
