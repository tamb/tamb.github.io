"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CompanyDemoCards } from "@/components/CompanyDemoCards";
import type {
  CompanyDemo,
  HostedGame,
  OpenSourceProject,
} from "@/lib/site-content";

type Site = {
  personName: string;
  tagline: string;
  description: string;
};

export function HomeContent({
  siteMeta,
  companyDemos: demos,
  games,
  openSourceProjects,
}: {
  siteMeta: Site;
  companyDemos: CompanyDemo[];
  games: HostedGame[];
  openSourceProjects: OpenSourceProject[];
}) {
  return (
    <div className="mx-auto max-w-6xl flex-1 px-4 py-14 sm:py-20">
      <motion.section
        className="mb-20 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400/90">
          {siteMeta.personName}
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 sm:text-5xl">
          {siteMeta.tagline}
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-stone-600 dark:text-stone-400">
          {siteMeta.description}
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/portfolio/music/"
            className="rounded-full bg-amber-700 px-5 py-2.5 text-sm font-semibold text-amber-50 shadow-md shadow-amber-950/25 ring-1 ring-amber-500/40 transition hover:bg-amber-600 dark:shadow-amber-950/40"
          >
            Listen
          </Link>
          <Link
            href="/about/resume/"
            className="rounded-full border border-stone-300 bg-white/80 px-5 py-2.5 text-sm font-medium text-stone-800 transition hover:border-stone-400 hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-900/50 dark:text-stone-200 dark:hover:border-stone-500 dark:hover:bg-stone-800/50"
          >
            View resume
          </Link>
        </div>
      </motion.section>

      <section
        id="open-source"
        className="mb-20 scroll-mt-24"
        aria-labelledby="open-source-heading"
      >
        <h2
          id="open-source-heading"
          className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-stone-600 dark:text-stone-500"
        >
          Open source
        </h2>
        <p className="mb-8 max-w-2xl text-stone-600 dark:text-stone-400">
          Repositories I maintain or contribute to — each row opens the GitHub
          project.
        </p>
        <ul className="space-y-3">
          {openSourceProjects.map((p) => (
            <li key={p.repoUrl}>
              <a
                href={p.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-1 rounded-xl border border-stone-200 bg-white/70 px-4 py-3 transition hover:border-emerald-500/45 hover:shadow-md hover:shadow-emerald-900/10 sm:flex-row sm:items-center sm:justify-between dark:border-stone-800 dark:bg-stone-900/30 dark:hover:border-emerald-600/35 dark:hover:shadow-emerald-950/15"
              >
                <div>
                  <span className="font-medium text-stone-900 dark:text-stone-100">
                    {p.name}
                  </span>
                  <p className="mt-0.5 text-sm text-stone-600 dark:text-stone-400">
                    {p.description}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-medium text-emerald-700 transition group-hover:text-emerald-600 dark:text-emerald-400 dark:group-hover:text-emerald-300">
                  Repository ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-20">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-stone-600 dark:text-stone-500">
          Work & demos
        </h2>
        <p className="mb-8 max-w-2xl text-stone-600 dark:text-stone-400">
          Replace the samples with companies you are proud to showcase — product
          tours, archived marketing builds, or anonymized case studies.
        </p>
        <CompanyDemoCards demos={demos} />
      </section>

      <section className="mb-20 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-stone-600 dark:text-stone-500">
            Studios
          </h2>
          <ul className="space-y-3 text-stone-800 dark:text-stone-300">
            <li>
              <Link
                className="group flex items-center justify-between rounded-xl border border-stone-200 bg-white/70 px-4 py-3 transition hover:border-amber-400/55 dark:border-stone-800 dark:bg-stone-900/30 dark:hover:border-amber-500/40"
                href="/portfolio/drawings/"
              >
                <span>Drawings</span>
                <span className="text-stone-500 transition group-hover:translate-x-0.5 group-hover:text-amber-300">
                  →
                </span>
              </Link>
            </li>
            <li>
              <Link
                className="group flex items-center justify-between rounded-xl border border-stone-200 bg-white/70 px-4 py-3 transition hover:border-amber-400/55 dark:border-stone-800 dark:bg-stone-900/30 dark:hover:border-amber-500/40"
                href="/portfolio/photography/"
              >
                <span>Photography</span>
                <span className="text-stone-500 transition group-hover:translate-x-0.5 group-hover:text-amber-300">
                  →
                </span>
              </Link>
            </li>
            <li>
              <Link
                className="group flex items-center justify-between rounded-xl border border-stone-200 bg-white/70 px-4 py-3 transition hover:border-amber-400/55 dark:border-stone-800 dark:bg-stone-900/30 dark:hover:border-amber-500/40"
                href="/portfolio/music/"
              >
                <span>Music & SoundCloud</span>
                <span className="text-stone-500 transition group-hover:translate-x-0.5 group-hover:text-amber-300">
                  →
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-stone-600 dark:text-stone-500">
            Play
          </h2>
          <ul className="space-y-3">
            {games.slice(0, 3).map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/games/${g.slug}/`}
                  className="group flex items-center justify-between rounded-xl border border-stone-200 bg-white/70 px-4 py-3 transition hover:border-amber-400/55 dark:border-stone-800 dark:bg-stone-900/30 dark:hover:border-amber-500/40"
                >
                  <span className="text-stone-900 dark:text-stone-200">
                    {g.title}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-stone-500 group-hover:text-amber-300">
                    {g.status === "live" ? "Play" : "Soon"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/games/"
            className="mt-4 inline-block text-sm font-medium text-amber-400 underline-offset-4 hover:underline"
          >
            All games
          </Link>
        </div>
      </section>
    </div>
  );
}
