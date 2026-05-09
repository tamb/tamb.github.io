import type { Metadata } from "next";
import { ProjectPortfolioGrid } from "@/components/ProjectPortfolioGrid";
import { loadProjectSection } from "@/lib/portfolio/load";

export const metadata: Metadata = {
  title: "Open source",
  description:
    "Repositories and libraries maintained or contributed in public.",
};

export default function OpenSourcePortfolioPage() {
  const items = loadProjectSection("open-source");
  return (
    <div className="mx-auto max-w-6xl flex-1 px-4 py-14 sm:py-16">
      <header className="mb-12 max-w-2xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
          Portfolio
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl">
          Open source
        </h1>
        <p className="text-stone-600 dark:text-stone-400">
          Add a folder under{" "}
          <code className="text-stone-800 dark:text-stone-300">
            public/content/portfolio/open-source/
          </code>{" "}
          with{" "}
          <code className="text-stone-800 dark:text-stone-300">
            manifest.json
          </code>{" "}
          (
          <code className="text-stone-800 dark:text-stone-300">
            type: &quot;open-source&quot;
          </code>
          , <code className="text-stone-800 dark:text-stone-300">title</code>,{" "}
          <code className="text-stone-800 dark:text-stone-300">
            description
          </code>
          , and{" "}
          <code className="text-stone-800 dark:text-stone-300">links</code>
          ). Optional screenshots use{" "}
          <code className="text-stone-800 dark:text-stone-300">
            00.media.&lt;ext&gt;
          </code>
          ,{" "}
          <code className="text-stone-800 dark:text-stone-300">
            01.media.&lt;ext&gt;
          </code>
          , … plus manifest{" "}
          <code className="text-stone-800 dark:text-stone-300">alt</code>.
        </p>
      </header>
      <ProjectPortfolioGrid items={items} />
    </div>
  );
}
