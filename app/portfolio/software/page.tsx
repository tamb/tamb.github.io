import type { Metadata } from "next";
import { ProjectPortfolioGrid } from "@/components/ProjectPortfolioGrid";
import { loadProjectSection } from "@/lib/portfolio/load";

export const metadata: Metadata = {
  title: "Software",
  description: "Selected proprietary or client-facing software work.",
};

export default function SoftwarePortfolioPage() {
  const items = loadProjectSection("software");
  return (
    <div className="mx-auto max-w-6xl flex-1 px-4 py-14 sm:py-16">
      <header className="mb-12 max-w-2xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
          Portfolio
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl">
          Software
        </h1>
        <p className="text-stone-600 dark:text-stone-400">
          Showcase builds you can describe publicly (no confidential internals).
          Same layout as open source:{" "}
          <code className="text-stone-800 dark:text-stone-300">
            public/content/portfolio/software/&lt;slug&gt;/manifest.json
          </code>{" "}
          with{" "}
          <code className="text-stone-800 dark:text-stone-300">
            type: &quot;software&quot;
          </code>
          , optional{" "}
          <code className="text-stone-800 dark:text-stone-300">
            NN.media.&lt;ext&gt;
          </code>{" "}
          files, and a{" "}
          <code className="text-stone-800 dark:text-stone-300">links</code>{" "}
          array (demo, case study, product page, …).
        </p>
      </header>
      <ProjectPortfolioGrid items={items} />
    </div>
  );
}
