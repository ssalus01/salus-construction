"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = { companyName: string };

export default function SiteHeader({ companyName }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <div>
          <Link href="/" className="font-bold text-lg md:text-xl tracking-wide">
            {companyName}
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/#projects">Projects</Link>
          <Link href="/#process">Process</Link>
          <Link href="/#about">About</Link>
          <Link href="/#trust">Trust</Link>
          <Link href="/#contact">Contact</Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button asChild className="rounded-2xl">
            <Link href="/#contact" className="flex items-center">
              Request a Quote <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-slate-100"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-white">
          <nav className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-3 text-base">
            <Link href="/" onClick={() => setMobileOpen(false)} className="py-2">Home</Link>
            <Link href="/services" onClick={() => setMobileOpen(false)} className="py-2">Services</Link>
            <Link href="/#process" onClick={() => setMobileOpen(false)} className="py-2">Process</Link>
            <Link href="/#about" onClick={() => setMobileOpen(false)} className="py-2">About</Link>
            <Link href="/#trust" onClick={() => setMobileOpen(false)} className="py-2">Trust</Link>
            <Link href="/#contact" onClick={() => setMobileOpen(false)} className="py-2">Contact</Link>
            <Button asChild className="mt-2 rounded-2xl">
              <Link href="/#contact" onClick={() => setMobileOpen(false)}>
                Request a Quote
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
