"use client"
import React, { useEffect, useState } from "react";


const navLinks: { href: string; label: string }[] = [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/waitlist", label: "Waitlist" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
];

type SubmitState = "idle" | "sending" | "success" | "error";

export default function Footer() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [interest, setInterest] = useState("general");
    const [submitState, setSubmitState] = useState<SubmitState>("idle");
    const [message, setMessage] = useState<string | null>(null);
    const [waitlistCount, setWaitlistCount] = useState<number | null>(null);
    const [subscribed, setSubscribed] = useState<boolean>(() =>
        typeof window !== "undefined" ? Boolean(localStorage.getItem("wl_subscribed")) : false
    );

    

    const isValidEmail = (e: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim().toLowerCase());

    const handleSubmit = async (ev?: React.FormEvent) => {
        ev?.preventDefault();
        setMessage(null);

        if (!isValidEmail(email)) {
            setMessage("Please enter a valid email address.");
            setSubmitState("error");
            return;
        }

        if (subscribed) {
            setMessage("You're already on the waitlist. Thank you!");
            setSubmitState("success");
            return;
        }

        setSubmitState("sending");

        try {
            // Optimistic UI: increment displayed waitlist count immediately
            setWaitlistCount((c) => (typeof c === "number" ? c + 1 : c));

            const payload = {
                email: email.trim().toLowerCase(),
                name: name.trim() || undefined,
                interest,
                timestamp: new Date().toISOString(),
            };

            // Your backend endpoint should accept this POST and return { ok: true } or error
            const res = await fetch("/api/waitlist/join", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                // rollback optimistic update
                setWaitlistCount((c) => (typeof c === "number" ? Math.max(0, c - 1) : c));
                const errText = await res.text().catch(() => null);
                setMessage(errText || "Failed to join waitlist. Try again later.");
                setSubmitState("error");
                return;
            }

            // success
            setSubmitState("success");
            setMessage("You're on the waitlist! We'll email you updates.");
            setSubscribed(true);
            try {
                localStorage.setItem("wl_subscribed", "1");
            } catch {
                // ignore
            }
            setEmail("");
            setName("");
        } catch (err) {
            setWaitlistCount((c) => (typeof c === "number" ? Math.max(0, c - 1) : c));
            setMessage("Network error. Please try again.");
            setSubmitState("error");
        }
    };

    return (
        <footer className="bg-slate-900 text-slate-100">
            <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Brand + short pitch */}
                    <div className="space-y-4">
                        <a href="/" aria-label="Homepage" className="inline-flex items-center gap-3">
                            <div className="w-10 h-10 rounded-md bg-gradient-to-br from-indigo-500 to-emerald-400 flex items-center justify-center ring-1 ring-white/10">
                                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 12h18M12 3v18" />
                                </svg>
                            </div>
                            <span className="text-lg font-semibold tracking-wide">LaunchWait</span>
                        </a>
                        <p className="text-slate-300">
                            Join the waitlist for the smartest way to discover product features, get early access,
                            and receive prioritized invites. We keep launches simple and delightful.
                        </p>

                        <div className="flex items-center gap-4">
                            <div className="text-sm text-slate-400">
                                2,347
                                people on the waitlist
                            </div>
                            <a
                                href="/waitlist"
                                className="inline-flex items-center px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-sm transition"
                            >
                                Join the Waitlist
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <nav aria-label="Footer navigation" className="md:col-span-1">
                        <h3 className="text-slate-200 font-semibold mb-3">Explore</h3>
                        <ul className="space-y-2 text-slate-300">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="hover:text-white transition-colors text-sm"
                                        onClick={(e) => {
                                            /* keep default anchor behavior — adapt for client routing if needed */
                                        }}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Waitlist form / Newsletter */}
                    <div className="md:col-span-1">
                        <h3 className="text-slate-200 font-semibold mb-3">Get Early Access</h3>
                        <p className="text-slate-300 text-sm mb-4">
                            Sign up for the waitlist and be the first to try new features and receive occasional
                            product updates.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-3" aria-label="Waitlist signup form">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <label className="sr-only" htmlFor="wl-name">
                                    Name
                                </label>
                                <input
                                    id="wl-name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Your name (optional)"
                                />
                                <label className="sr-only" htmlFor="wl-email">
                                    Email
                                </label>
                                <input
                                    id="wl-email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    aria-required
                                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="name@company.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="wl-interest" className="sr-only">
                                    Interest
                                </label>
                                <select
                                    id="wl-interest"
                                    value={interest}
                                    onChange={(e) => setInterest(e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="general">General waitlist</option>
                                    <option value="beta">Beta features</option>
                                    <option value="partnership">Partnerships / Integrations</option>
                                    <option value="early-access">Early Access Program</option>
                                </select>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    disabled={submitState === "sending" || subscribed}
                                    className="inline-flex items-center justify-center px-4 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 rounded-md text-sm font-medium text-white transition"
                                    aria-disabled={submitState === "sending" || subscribed}
                                >
                                    {submitState === "sending" ? "Joining..." : subscribed ? "Joined" : "Join Waitlist"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setEmail("");
                                        setName("");
                                        setMessage(null);
                                        setSubmitState("idle");
                                    }}
                                    className="inline-flex items-center px-3 py-2 border border-slate-700 rounded-md text-sm text-slate-200 hover:border-slate-600"
                                >
                                    Reset
                                </button>
                            </div>

                            {message && (
                                <p
                                    role="status"
                                    className={`text-sm ${submitState === "error" ? "text-rose-400" : "text-emerald-300"}`}
                                >
                                    {message}
                                </p>
                            )}
                        </form>
                    </div>
                </div>

                <div className="border-t border-slate-800 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 text-slate-400 text-sm">
                        <span>© {new Date().getFullYear()} LaunchWait</span>
                        <a href="/terms" className="hover:text-white">
                            Terms
                        </a>
                        <a href="/privacy" className="hover:text-white">
                            Privacy
                        </a>
                        <a href="/security" className="hover:text-white">
                            Security
                        </a>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                            <a
                                href="https://twitter.com"
                                aria-label="Twitter"
                                className="p-2 rounded-md hover:bg-slate-800"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-slate-300">
                                    <path d="M22 5.92c-.63.28-1.3.47-2 .56.72-.43 1.28-1.1 1.54-1.9-.67.4-1.42.7-2.22.86A3.5 3.5 0 0015.5 4c-1.96 0-3.55 1.6-3.55 3.57 0 .28.03.55.09.81-2.95-.15-5.57-1.6-7.33-3.8-.31.54-.49 1.18-.49 1.86 0 1.28.65 2.4 1.64 3.07-.6-.02-1.17-.18-1.66-.46v.05c0 1.8 1.28 3.3 2.98 3.64-.31.08-.64.12-.98.12-.24 0-.48-.02-.71-.06.48 1.5 1.86 2.6 3.5 2.63A7.02 7.02 0 013 19.54a9.9 9.9 0 005.36 1.57c6.43 0 9.95-5.44 9.95-10.15v-.46c.68-.5 1.28-1.12 1.75-1.82-.63.28-1.3.47-2 .56.72-.43 1.28-1.1 1.54-1.9z" />
                                </svg>
                            </a>

                            <a href="https://github.com" aria-label="GitHub" className="p-2 rounded-md hover:bg-slate-800">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-slate-300">
                                    <path d="M12 .5C5.7.5.9 5.3.9 11.6c0 4.7 3.1 8.7 7.4 10.1.54.1.74-.24.74-.53 0-.26-.01-1-.02-1.96-3.01.65-3.64-1.46-3.64-1.46-.49-1.24-1.2-1.57-1.2-1.57-.98-.67.07-.66.07-.66 1.08.07 1.64 1.12 1.64 1.12.96 1.65 2.51 1.17 3.12.9.1-.7.38-1.17.69-1.44-2.4-.27-4.92-1.2-4.92-5.33 0-1.18.42-2.15 1.12-2.91-.11-.27-.49-1.36.11-2.82 0 0 .92-.29 3.02 1.11a10.5 10.5 0 012.75-.37c.93 0 1.86.13 2.74.37 2.1-1.4 3.02-1.11 3.02-1.11.61 1.46.23 2.55.12 2.82.7.76 1.12 1.73 1.12 2.91 0 4.14-2.53 5.05-4.94 5.32.39.34.73 1.02.73 2.06 0 1.49-.01 2.7-.01 3.06 0 .29.2.64.75.53 4.27-1.37 7.38-5.38 7.38-10.08C23.1 5.3 18.3.5 12 .5z" />
                                </svg>
                            </a>

                            <a href="https://linkedin.com" aria-label="LinkedIn" className="p-2 rounded-md hover:bg-slate-800">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-slate-300">
                                    <path d="M4.98 3.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM3 9h4v12H3zM9 9h3.8v1.6h.1c.5-.9 1.8-1.9 3.6-1.9 3.8 0 4.5 2.5 4.5 5.7V21H17v-5.2c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H9z" />
                                </svg>
                            </a>
                        </div>

                        <div className="text-slate-400 text-xs">
                            Built with ♥ and TailwindCSS
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}