"use client";

import React, { useState, useRef } from "react";

type Project = {
  id: string;
  title: string;
  cover: string;
  images: string[];
};

const PROJECTS: Project[] = [
  {
    id: "refurb-01",
    title: "Full House Refurbishment — Wren Avenue",
    cover: "/projects/refurb-01/cover.jpg",
    images: [
      "/projects/refurb-01/wren-avenue-1.jpg",
      "/projects/refurb-01/wren-avenue-2.jpg",
      "/projects/refurb-01/wren-avenue-3.jpg",
      "/projects/refurb-01/wren-avenue-4.jpg",
      "/projects/refurb-01/wren-avenue-5.jpg",
      "/projects/refurb-01/wren-avenue-6.jpg",
    ],
  },
  {
    id: "west-hampstead",
    title: "Full House Refurbishment — Hampstead",
    cover: "/projects/west-hampstead/cover.jpg",
    images: [
        "/projects/west-hampstead/cover.jpg",
        "/projects/west-hampstead/hampstead-1.jpg",
        "/projects/west-hampstead/hampstead-2.jpg",
        "/projects/west-hampstead/hampstead-3.jpg",
        "/projects/west-hampstead/hampstead-4.jpg",
        "/projects/west-hampstead/hampstead-5.jpg",
    ],
  },
  {
    id: "holland-park",
    title: "Embassy Restoration — Holland Park",
    cover: "/projects/holland-park/holland-park-cover.jpg",
    images: [
      "/projects/holland-park/holland-park-cover.jpg",
      "/projects/holland-park/holland-park-cover-1.jpg",
      "/projects/holland-park/holland-park-cover-2.jpg",
    ],
  },
  {
    id: "front-north-london",
    title: "Front Elevation — North London",
    cover: "/projects/front-north-london/cover.jpg",
    images: ["/projects/front-north-london/cover.jpg"],
  },
  {
    id: "extension-ealing",
    title: "Rear Extension — Ealing",
    cover: "/projects/extension-ealing/cover.jpg",
    images: ["/projects/extension-ealing/cover.jpg"],
  },
];

export default function ProjectsSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [imgIdx, setImgIdx] = useState(0);

  // swipe support in modal
  const startX = useRef<number | null>(null);
  const deltaX = useRef(0);

  const open = (i: number) => { setOpenIdx(i); setImgIdx(0); };
  const close = () => { setOpenIdx(null); setImgIdx(0); };

  const next = () => {
    if (openIdx === null) return;
    const imgs = PROJECTS[openIdx].images;
    setImgIdx((n) => (n + 1) % imgs.length);
  };
  const prev = () => {
    if (openIdx === null) return;
    const imgs = PROJECTS[openIdx].images;
    setImgIdx((n) => (n - 1 + imgs.length) % imgs.length);
  };

  return (
    <section id="projects" className="py-16 bg-white scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold">Selected Projects</h2>
        <p className="mt-2 text-slate-600">
          A small selection of recent work. More references and details available on request.
        </p>

        {/* Mobile: horizontal scroll */}
        <div className="mt-8 md:hidden flex overflow-x-auto gap-4 snap-x snap-mandatory pb-2">
          {PROJECTS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => open(i)}
              className="snap-start shrink-0 w-[80%] rounded-2xl overflow-hidden border bg-white text-left"
            >
              <div className="aspect-[4/3] w-full bg-slate-100">
                <img src={p.cover} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{p.title}</h3>
              </div>
            </button>
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="mt-8 hidden md:grid grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => open(i)}
              className="rounded-2xl overflow-hidden border bg-white text-left group"
            >
              <div className="aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                <img
                  src={p.cover}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{p.title}</h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {openIdx !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={close}
          onPointerDown={(e) => { startX.current = e.clientX; deltaX.current = 0; }}
          onPointerMove={(e) => { if (startX.current !== null) deltaX.current = e.clientX - startX.current; }}
          onPointerUp={(e) => {
            e.stopPropagation();
            if (Math.abs(deltaX.current) > 50) { deltaX.current < 0 ? next() : prev(); }
            startX.current = null; deltaX.current = 0;
          }}
        >
          <div
            className="relative w-full max-w-5xl max-h-[90vh] bg-black rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={PROJECTS[openIdx].images[imgIdx]}
              alt={PROJECTS[openIdx].title}
              className="w-full h-[70vh] md:h-[80vh] object-contain bg-black"
            />
            <div className="absolute left-0 right-0 top-0 p-3 md:p-4 flex items-center justify-between text-white text-sm md:text-base">
              <span className="font-medium">{PROJECTS[openIdx].title}</span>
              <span>{imgIdx + 1}/{PROJECTS[openIdx].images.length}</span>
            </div>
            <button
              aria-label="Previous"
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 text-white"
            >‹</button>
            <button
              aria-label="Next"
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 text-white"
            >›</button>
            <button
              aria-label="Close"
              onClick={close}
              className="absolute right-2 bottom-2 h-10 px-4 rounded-full bg-white/20 hover:bg-white/30 text-white"
            >Close</button>
          </div>
        </div>
      )}
    </section>
  );
}
