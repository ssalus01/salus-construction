// app/services/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, Leaf, Ruler, Hammer, Wrench, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

type Service = {
  slug: string;
  title: string;
  kicker: string;
  image: string; // /public/services/...
  icon: React.ReactNode;
  summary: string;
  bullets: string[];
};

const SERVICES: Service[] = [
  {
    slug: "extensions-lofts",
    title: "Extensions & Loft Conversions",
    kicker: "Add space without moving",
    image: "/services/extensions.jpg",
    icon: <Home className="h-5 w-5" />,
    summary:
      "From single‑storey rear extensions to dormer lofts, we handle design coordination, structural works, utilities and finishes — delivering the extra space your home needs.",
    bullets: [
      "Planning support & structural engineering",
      "Steelwork, roofing, insulation & glazing",
      "Kitchens, bathrooms and bespoke storage",
      "Building control & sign‑off",
    ],
  },
  {
    slug: "kitchens-bathrooms",
    title: "Kitchens & Bathrooms",
    kicker: "High‑impact refurbishments",
    image: "/services/kitchens.jpg",
    icon: <Wrench className="h-5 w-5" />,
    summary:
      "Precision plumbing and electrics with meticulous tiling, joinery and stonework. We create durable rooms that feel great to use every day.",
    bullets: [
      "Full strip‑out & first/second fix",
      "Cabinetry, worktops & appliances",
      "Wet rooms, underfloor heating & ventilation",
      "Lighting design & smart controls",
    ],
  },
  {
    slug: "full-refurbishments",
    title: "Full Home Refurbishments",
    kicker: "End‑to‑end project delivery",
    image: "/services/refurb.jpg",
    icon: <Hammer className="h-5 w-5" />,
    summary:
      "A managed programme that coordinates all trades with clear scopes, timelines and budgets. One team accountable from start to finish.",
    bullets: [
      "Programme planning & supervision",
      "Joinery, flooring, decoration & finishes",
      "MEP upgrades & compliance",
      "Snagging, handover & warranty",
    ],
  },
  {
    slug: "green-construction",
    title: "Green Construction",
    kicker: "Build for performance",
    image: "/services/green.jpg",
    icon: <Leaf className="h-5 w-5" />,
    summary:
      "Practical sustainability integrated into your project: better insulation, airtightness and systems that lower bills and raise comfort.",
    bullets: [
      "Fabric‑first insulation & airtightness",
      "Heat pumps, MVHR & solar readiness",
      "Low‑VOC materials & waste reduction",
      "SAP coordination & Part L compliance",
    ],
  },
  {
    slug: "project-management",
    title: "Project Management",
    kicker: "Clarity from day one",
    image: "/services/management.jpg",
    icon: <Ruler className="h-5 w-5" />,
    summary:
      "We plan, budget and schedule your build, coordinate trades, and communicate proactively — so you always know what’s happening next.",
    bullets: [
      "Scopes, drawings & CDM documentation",
      "Cost tracking & change control",
      "Site H&S & quality assurance",
      "Weekly updates & milestone sign‑offs",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/services/hero.jpg"
            alt="Construction services hero"
            className="h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-slate-900/50" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-24 md:py-32 text-white">
          <p className="uppercase tracking-widest text-xs md:text-sm opacity-90">
            Salus Constructions Ltd • London & UK
          </p>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold">Services</h1>
          <p className="mt-4 max-w-2xl text-slate-100 text-lg">
            Renovations, extensions, lofts, kitchens, bathrooms and full refurbishments — delivered
            with clear scopes, dependable timelines and tidy sites.
          </p>

          {/* Sticky mini‑nav */}
          <div className="mt-8 bg-white/10 backdrop-blur rounded-2xl p-2 w-full max-w-3xl">
            <nav className="flex flex-wrap gap-2">
              {SERVICES.map((s) => (
                <a
                  key={s.slug}
                  href={`#${s.slug}`}
                  className="text-sm px-3 py-1 rounded-2xl bg-white/20 hover:bg-white/30"
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 space-y-16 md:space-y-24">
          {SERVICES.map((s, i) => (
            <article
              id={s.slug}
              key={s.slug}
              className="grid lg:grid-cols-2 gap-8 items-center scroll-mt-24"
            >
              {/* Image */}
              <div
                className={`group relative overflow-hidden rounded-3xl ring-1 ring-slate-200 shadow-sm ${
                  i % 2 ? "order-last lg:order-first" : ""
                }`}
              >
                <Image
                  src={s.image}
                  alt={s.title}
                  width={1600}
                  height={1200}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                {/* subtle gradient */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Copy */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-3 py-1 text-slate-600 text-sm">
                  {s.icon}
                  <span>{s.kicker}</span>
                </div>
                <h2 className="mt-3 text-2xl md:text-3xl font-bold">{s.title}</h2>
                <p className="mt-3 text-slate-600">{s.summary}</p>

                <ul className="mt-5 space-y-2">
                  {s.bullets.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-700">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-emerald-600" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild className="rounded-2xl">
                    <a href="/#contact">
                      Request a Quote <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="secondary" className="rounded-2xl">
                    <a href="/#about">About Us</a>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16 text-white flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl md:text-2xl font-semibold">Ready to start your project?</h3>
            <p className="text-slate-300">Free site visit and a fixed, itemised quote.</p>
          </div>
          <Button asChild size="lg" className="rounded-2xl">
            <a href="/#contact">Book a Site Visit</a>
          </Button>
        </div>
      </section>
    </div>
  );
}
