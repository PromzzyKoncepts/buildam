"use client"
import Link from "next/link";
import React, { useState } from "react";

export default function NavBar() {
    const [open, setOpen] = useState<boolean>(false);

    const links = [
        { href: "#home", label: "Home" },
        { href: "#features", label: "Features" },
        { href: "#pricing", label: "Pricing" },
        { href: "#docs", label: "Docs" },
    ];

    return (
        <header className="w-[60%] z-[999] fixed left-1/2 bg-[#ffffff11] backdrop-blur-sm -translate-x-1/2 top-5 text-white py-4  px-14 rounded-full">
            <div className="max-w-3xl mx-auto   flex items-center justify-between gap-6">
                <a href="#home" className="text-lg font-bold text-gray-200">
                    Buildam
                </a>

                <nav className="hidden md:flex items-center gap-6">
                    <ul className="flex items-center gap-4 list-none m-0 p-0">
                        {links.map((l) => (
                            <li key={l.href}>
                                <a
                                    href={l.href}
                                    className="text-gray-200 hover:text-gray-900 px-2 py-1 rounded-md text-sm"
                                >
                                    {l.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                            <Link
                                href="#waitlist"
                                className="inline-block bg-amber-900 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold text-sm"
                            >
                                Be the first!
                            </Link>

                {/* Mobile: burger */}
                <div className="md:hidden flex items-center">
                    <button
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        onClick={() => setOpen((s) => !s)}
                        className="p-2 rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {open ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                                <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        ) : (
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                                <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile menu panel */}
            {open && (
                <div id="mobile-menu" className="md:hidden px-4 pb-4">
                    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-4 flex flex-col gap-2">
                        {links.map((l) => (
                            <a
                                key={l.href}
                                href={l.href}
                                onClick={() => setOpen(false)}
                                className="text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-md"
                            >
                                {l.label}
                            </a>
                        ))}
                        <a
                            href="#waitlist"
                            onClick={() => setOpen(false)}
                            className="mt-1 inline-block bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md font-semibold text-center"
                        >
                            Join Waitlist
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}
