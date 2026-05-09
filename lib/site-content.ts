/**
 * Central place for site meta, external URLs, and non-portfolio copy.
 * Portfolio content (drawings, photography, music, open source, software) lives in
 * `public/content/portfolio/<section>/<item-folder>/` — see `lib/portfolio/load.ts`.
 */

export const siteMeta = {
  title: "Portfolio",
  /** Used for metadata; GitHub Pages user site */
  siteUrl: "https://tamb.github.io",
  personName: "Tamb",
  tagline: "Engineer · maker · audio & visual tinkerer",
  description:
    "Personal portfolio: open source, employers, music, photography, drawings, and playable experiments.",
};

/** External link attached to a portfolio project (repo, docs, demo, …) */
export type PortfolioLink = {
  label: string;
  href: string;
};

/** Open-source / software rows loaded from `public/content/portfolio/<section>/` */
export type PortfolioProjectItem = {
  folder: string;
  title: string;
  description: string;
  links: PortfolioLink[];
  images: { src: string; alt: string }[];
  /** Optional note shown under images (manifest `caption`) */
  imageCaption?: string;
};

export type GalleryImage = { src: string; alt: string };

export type GalleryItem = {
  images: GalleryImage[];
  caption: string;
};

export type CompanyDemo = {
  name: string;
  role: string;
  years: string;
  blurb: string;
  demoUrl: string;
  demoLabel: string;
};

export const companyDemos: CompanyDemo[] = [
  {
    name: "Aurora Labs (sample)",
    role: "Senior frontend engineer",
    years: "20xx — 20xx",
    blurb:
      "Built customer-facing dashboards and design systems. Replace with real narrative and link out to a redacted demo or case study.",
    demoUrl: "https://example.com",
    demoLabel: "Product tour (dummy)",
  },
  {
    name: "Northwind Studio (sample)",
    role: "Full-stack contractor",
    years: "20xx — 20xx",
    blurb:
      "Shipped marketing sites and lightweight CMS flows. Swap for employers you are allowed to showcase.",
    demoUrl: "https://example.com",
    demoLabel: "Launch site (dummy)",
  },
];

export type HostedGame = {
  slug: string;
  title: string;
  summary: string;
  status: "live" | "coming-soon";
};

export const hostedGames: HostedGame[] = [
  {
    slug: "asteroid-tap",
    title: "Asteroid tap (sample)",
    summary:
      "Place your first wasm/canvas build here — this page is ready for an iframe or full-screen canvas mount.",
    status: "coming-soon",
  },
  {
    slug: "rhythm-garden",
    title: "Rhythm garden",
    summary:
      "Slot for a second experiment — update the summary when the build exists.",
    status: "coming-soon",
  },
];

export const resumePdfPath = "/content/resume/resume.pdf";
