/**
 * Central place for site meta, external URLs, and non-portfolio copy.
 * Portfolio media (drawings, photography, music embeds) lives in
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

export type OpenSourceProject = {
  /** Display name (often matches the repo) */
  name: string;
  /** One line for the list; keep it short */
  description: string;
  /** GitHub repository URL */
  repoUrl: string;
};

/** Public repos you want featured on the home page and footer */
export const openSourceProjects: OpenSourceProject[] = [
  {
    name: "tocada",
    description: "Your project — edit this line and the repo URL below.",
    repoUrl: "https://github.com/tamb/tocada",
  },
  {
    name: "simple-mcp-manager",
    description:
      "MCP server manager: TUI and web UI to monitor, restart, and kill servers across Cursor, VS Code, Claude, Copilot, and more.",
    repoUrl: "https://github.com/tamb/simple-mcp-manager",
  },
  {
    name: "tamb.github.io",
    description: "This portfolio: Next.js static export for GitHub Pages.",
    repoUrl: "https://github.com/tamb/tamb.github.io",
  },
];

export type GalleryItem = {
  src: string;
  alt: string;
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
