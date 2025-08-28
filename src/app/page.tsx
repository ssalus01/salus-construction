"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Phone,
  Home,
  Wrench,
  Ruler,
  Clock,
  CheckCircle,
  ArrowRight,
  Shield,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";

// --- Company details ---
const COMPANY = {
  name: "Salus Constructions Ltd",
  phone: "+44 7965 365717",
  phoneHref: "+447956365717",
  email: "info@salusconstruction.co.uk",
  address: "London, UK",
  companyNo: "10902774",
  founded: "1990",
};

// --- Services (icons only) ---
const SERVICES = [
  {
    icon: <Home className="h-6 w-6" />,
    title: "Residential Construction",
    desc: "Bespoke homes, renovations, extensions and full refurbishments delivered to the highest standards.",
  },
  {
    icon: <Wrench className="h-6 w-6" />,
    title: "Commercial Construction",
    desc: "Offices, retail, hospitality and specialist facilities — on time, on budget, to specification.",
  },
  {
    icon: <Ruler className="h-6 w-6" />,
    title: "Green Construction",
    desc: "Environmentally sustainable, energy-efficient builds that meet modern performance targets.",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Project Management",
    desc: "End-to-end planning, budgeting, scheduling and oversight for smooth delivery.",
  },
];

// --- Process ---
const PROCESS = [
  { step: "1", title: "Site Visit", desc: "Free consultation to understand scope, budget and timings." },
  { step: "2", title: "Fixed Quote", desc: "Transparent, itemised pricing. No surprises." },
  { step: "3", title: "Build & Manage", desc: "Vetted subcontractors, daily oversight, tidy and safe sites." },
  { step: "4", title: "Sign-off", desc: "Snag list resolved and warranty provided." },
];

// --- Hero slides ---
const SLIDES = [
  {
    src: "/hero/slide-1.jpg",
    kicker: "Since 1990 • London & UK",
    heading: "Trusted residential & commercial construction",
    sub: "Quality, reliability and innovation — delivering projects on time and on budget.",
  },
  {
    src: "/hero/slide-2.jpg",
    kicker: "Embassies • Government • Private",
    heading: "Confidential, complex projects handled with care",
    sub: "Long-standing relationships with diplomatic and institutional clients.",
  },
  {
    src: "/hero/slide-3.jpg",
    kicker: "Sustainable & Energy-Efficient",
    heading: "Green construction that performs",
    sub: "Practical sustainability integrated into design, materials and build processes.",
  },
  {
    src: "/hero/slide-4.jpg",
    kicker: "End-to-End Delivery",
    heading: "Project management that just works",
    sub: "Planning, budgeting, scheduling and oversight for smooth handovers.",
  },
];

export default function Page() {
  // --- Carousel state ---
  const [current, setCurrent] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef<number | null>(null);
  const deltaXRef = useRef(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const slideCount = SLIDES.length;

  const next = () => setCurrent((c) => (c + 1) % slideCount);
  const prev = () => setCurrent((c) => (c - 1 + slideCount) % slideCount);

  // Autoplay
  useEffect(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    if (!isHovering && !isDragging) {
      autoplayRef.current = setInterval(next, 5000);
    }
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isHovering, isDragging]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-slate-900 min-h-[80vh] md:min-h-[95vh] flex items-center"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Slides */}
        <div className="absolute inset-0">
          {SLIDES.map((s, i) => (
            <img
              key={i}
              src={s.src}
              alt={s.heading}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                i === current ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-slate-900/60" />
        </div>

        {/* Drag for swipe */}
        <div
          className="absolute inset-0"
          onPointerDown={(e) => { startXRef.current = e.clientX; setIsDragging(true); }}
          onPointerMove={(e) => { if (startXRef.current !== null) deltaXRef.current = e.clientX - startXRef.current; }}
          onPointerUp={() => {
            if (Math.abs(deltaXRef.current) > 50) { deltaXRef.current < 0 ? next() : prev(); }
            startXRef.current = null; deltaXRef.current = 0; setIsDragging(false);
          }}
        />

        {/* Content */}
        <div className="relative mx-auto max-w-4xl px-4 text-center text-white">
          <div className="backdrop-blur-none bg-white/20 rounded-2xl p-8 shadow-lg ring-1 ring-white/10">
            <p className="text-xs md:text-sm uppercase">{SLIDES[current].kicker}</p>
            <h1 className="mt-3 text-4xl md:text-6xl font-bold">{SLIDES[current].heading}</h1>
            <p className="mt-4 text-slate-200">{SLIDES[current].sub}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild className="rounded-2xl">
                <a href={`tel:${COMPANY.phoneHref}`}><Phone className="mr-2 h-4 w-4" /> Call {COMPANY.phone}</a>
              </Button>
              <Button asChild variant="secondary" className="rounded-2xl">
                <a href="#contact">Get a Free Quote <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
            </div>
          </div>
        </div>

        {/* Arrows */}
        <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/20 text-white">
          <ArrowRight className="rotate-180" />
        </button>
        <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/20 text-white">
          <ArrowRight />
        </button>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`h-3 w-3 rounded-full ${i === current ? "bg-white" : "bg-white/50"}`} />
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div><p className="text-2xl font-bold">Established</p><p>{COMPANY.founded}</p></div>
          <div><p className="text-2xl font-bold">30+ Years</p><p>Proven experience</p></div>
          <div><p className="text-2xl font-bold">Embassies & Govt</p><p>Trusted clients</p></div>
          <div><p className="text-2xl font-bold">Sustainable</p><p>Green practices</p></div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold">Services</h2>
          <div className="mt-8 grid md:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => (
              <Card key={i} className="rounded-3xl">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">{s.icon}</div>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="text-slate-600 mt-2 text-sm">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-16 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold">Our Process</h2>
          <div className="mt-8 grid md:grid-cols-4 gap-6">
            {PROCESS.map((p, i) => (
              <div key={i} className="rounded-3xl border bg-white p-6">
                <div className="h-8 w-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-semibold">{p.step}</div>
                <h3 className="mt-4 font-semibold">{p.title}</h3>
                <p className="text-slate-600 mt-2 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold">About {COMPANY.name}</h2>
          <p className="mt-3 text-slate-600">
            Fayeq Salus, the owner and director of the company, has over 30 years&rsquo; experience in the
            construction industry. The company, under his direction, has consistently focussed on London
            and the surrounding area. He is intimately familiar with the needs in the sectors that the
            company serves, and with the requirements of clients.
          </p>
        </div>
      </section>

      {/* Embassies & High Commissions */}
      <section id="embassies" className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold">Embassies & High Commissions</h2>
          <p className="mt-3 text-slate-600">
            We have extensive experience in renovation and modernization work for Embassies and High Commissions,
            as well as for the residences of Ambassadors and High Commissioners. For work on these properties,
            we have developed excellent working relationships with our clients, who are assured of our confidentiality
            and security — essential for this sector.
          </p>
          <p className="mt-3 text-slate-600">
            This has become one of our fastest-growing areas of business, thanks to strong recommendations from
            existing ambassadorial clients. Salus Constructions maintains an excellent level of project delivery,
            offering competitive prices, and engaging consistently with clients at every stage. The referrals
            we receive from diplomatic clients continue to be of great value in both retaining relationships
            and attracting new custom.
          </p>
          <p className="mt-3 text-slate-600 italic">
          References available on request.
        </p>
        </div>
      </section>
     

      {/* Contact */}
      <section id="contact" className="py-16 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold">Request a Free Quote</h2>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
