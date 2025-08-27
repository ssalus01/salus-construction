// src/data/projects.ts
export type ProjectCategory = "Residential" | "Commercial" | "Green";
export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  location: string;
  year: number;
  summary: string;
  cover: string;      // /projects/xxx.jpg
  gallery: string[];  // array of /projects/xxx.jpg
  tags?: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "victorian-terrace-loft-south-london",
    title: "Victorian Terrace Loft Conversion",
    category: "Residential",
    location: "South London",
    year: 2024,
    summary:
      "Dormer addition with ensuite and bespoke storage. Delivered with minimal disruption and a tidy site.",
    cover: "/projects/loft.jpg",
    gallery: ["/projects/loft.jpg", "/projects/loft-2.jpg", "/projects/loft-3.jpg"],
    tags: ["Loft", "Dormer", "Ensuite"],
  },
  {
    slug: "west-london-open-plan-kitchen",
    title: "Open‑Plan Kitchen Renovation",
    category: "Residential",
    location: "West London",
    year: 2023,
    summary:
      "Structural opening, new electrics and bespoke cabinetry with energy‑efficient appliances.",
    cover: "/projects/kitchen.jpg",
    gallery: ["/projects/kitchen.jpg", "/projects/kitchen-2.jpg"],
    tags: ["Kitchen", "Joinery"],
  },
  {
    slug: "north-london-bathroom-remodel",
    title: "Contemporary Bathroom Remodel",
    category: "Residential",
    location: "North London",
    year: 2023,
    summary:
      "Walk‑in shower with large‑format tiles and underfloor heating for an elegant, durable finish.",
    cover: "/projects/bathroom.jpg",
    gallery: ["/projects/bathroom.jpg", "/projects/bathroom-2.jpg"],
    tags: ["Bathroom", "UFH"],
  },
  {
    slug: "embassy-fitout-westminster",
    title: "Embassy Office Fit‑Out",
    category: "Commercial",
    location: "Westminster",
    year: 2022,
    summary:
      "Confidential refurbishment with phased works, security coordination and strict programme.",
    cover: "/projects/embassy.jpg",
    gallery: ["/projects/embassy.jpg"],
    tags: ["Embassy", "Fit‑Out"],
  },
  {
    slug: "low-energy-extension-ealing",
    title: "Low‑Energy Rear Extension",
    category: "Green",
    location: "Ealing",
    year: 2022,
    summary:
      "High‑performance glazing, airtightness detailing and insulation upgrades for year‑round comfort.",
    cover: "/projects/green-extension.jpg",
    gallery: ["/projects/green-extension.jpg", "/projects/green-extension-2.jpg"],
    tags: ["Green", "Extension"],
  },
];
