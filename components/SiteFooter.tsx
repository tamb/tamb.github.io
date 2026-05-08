import Link from "next/link";
import { openSourceProjects, siteMeta } from "@/lib/site-content";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-stone-200/80 bg-stone-100/60 dark:border-stone-800/80 dark:bg-stone-950/50">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-stone-600 dark:text-stone-500">
          <p>
            © {year} {siteMeta.personName}. Hosted on{" "}
            <a
              className="text-amber-300 underline-offset-2 hover:text-amber-400 hover:underline dark:text-stone-400 dark:hover:text-amber-300"
              href="https://pages.github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Pages
            </a>
            .
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm text-stone-600 sm:items-end dark:text-stone-400">
          <div className="flex flex-wrap gap-4">
            <Link
              className="hover:text-stone-900 dark:hover:text-stone-100"
              href="/about/resume/"
            >
              Resume
            </Link>
            <Link
              className="hover:text-stone-900 dark:hover:text-stone-100"
              href="/games/"
            >
              Games
            </Link>
            <Link
              className="hover:text-emerald-700 dark:hover:text-emerald-400"
              href="/#open-source"
            >
              Open source
            </Link>
          </div>
          <div className="flex max-w-md flex-wrap justify-end gap-x-3 gap-y-1">
            {openSourceProjects.map((p) => (
              <a
                key={p.repoUrl}
                className="text-stone-500 hover:text-emerald-700 hover:underline dark:text-stone-500 dark:hover:text-emerald-400"
                href={p.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {p.name} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
