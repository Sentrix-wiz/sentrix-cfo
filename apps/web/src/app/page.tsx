"use client";
import { useState } from "react";

export default function Page() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setDone(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow">
        <h1 className="text-3xl font-bold text-center">Sentrix CFO</h1>
        <p className="text-center text-gray-600 mt-2">
          Your AI CFO — automate invoices, reconciliation, and GST.
        </p>

        {!done ? (
          <form onSubmit={handleSubmit} className="mt-6 grid gap-3">
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone / WhatsApp"
              value={form.phone}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <button
              disabled={loading}
              className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
            >
              {loading ? "Submitting..." : "Join Pilot – 3 Months Free"}
            </button>
          </form>
        ) : (
          <p className="text-center text-green-600 font-semibold mt-6">
            ✅ You're on the waitlist! We'll reach out soon.
          </p>
        )}
      </div>
    </main>
  );
}
