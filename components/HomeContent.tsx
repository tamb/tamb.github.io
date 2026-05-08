"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CompanyDemoCards } from "@/components/CompanyDemoCards";
import type { CompanyDemo, HostedGame } from "@/lib/site-content";

type Site = {
  personName: string;
  tagline: string;
  description: string;
};

export function HomeContent({
  siteMeta,
  companyDemos: demos,
  games,
  tocadaUrl: openSourceUrl,
}: {
  siteMeta: Site;
  companyDemos: CompanyDemo[];
  games: HostedGame[];
  tocadaUrl: string;
}) {
  return (
    <div className="mx-auto max-w-6xl flex-1 px-4 py-14 sm:py-20">
      <motion.section
        className="mb-20 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400/90">
          {siteMeta.personName}
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
          {siteMeta.tagline}
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-zinc-400">
          {siteMeta.description}
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/portfolio/music/"
            className="rounded-full bg-violet-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-900/40 transition hover:bg-violet-500"
          >
            Listen
          </Link>
          <Link
            href="/about/resume/"
            className="rounded-full border border-zinc-700 bg-zinc-900/50 px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-800/50"
          >
            View resume
          </Link>
          <a
            href={openSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-emerald-900/60 bg-emerald-950/30 px-5 py-2.5 text-sm font-medium text-emerald-200/90 transition hover:border-emerald-600/60"
          >
            Open source (tocada) ↗
          </a>
        </div>
      </motion.section>

      <section className="mb-20">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Work & demos
        </h2>
        <p className="mb-8 max-w-2xl text-zinc-400">
          Replace the samples with companies you are proud to showcase — product
          tours, archived marketing builds, or anonymized case studies.
        </p>
        <CompanyDemoCards demos={demos} />
      </section>

      <section className="mb-20 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Studios
          </h2>
          <ul className="space-y-3 text-zinc-300">
            <li>
              <Link
                className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/30 px-4 py-3 transition hover:border-violet-500/40"
                href="/portfolio/drawings/"
              >
                <span>Drawings</span>
                <span className="text-zinc-500 transition group-hover:translate-x-0.5 group-hover:text-violet-300">
                  →
                </span>
              </Link>
            </li>
            <li>
              <Link
                className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/30 px-4 py-3 transition hover:border-violet-500/40"
                href="/portfolio/photography/"
              >
                <span>Photography</span>
                <span className="text-zinc-500 transition group-hover:translate-x-0.5 group-hover:text-violet-300">
                  →
                </span>
              </Link>
            </li>
            <li>
              <Link
                className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/30 px-4 py-3 transition hover:border-violet-500/40"
                href="/portfolio/music/"
              >
                <span>Music & SoundCloud</span>
                <span className="text-zinc-500 transition group-hover:translate-x-0.5 group-hover:text-violet-300">
                  →
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Play
          </h2>
          <ul className="space-y-3">
            {games.slice(0, 3).map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/games/${g.slug}/`}
                  className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/30 px-4 py-3 transition hover:border-fuchsia-500/40"
                >
                  <span className="text-zinc-200">{g.title}</span>
                  <span className="text-xs uppercase tracking-wider text-zinc-500 group-hover:text-fuchsia-300">
                    {g.status === "live" ? "Play" : "Soon"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/games/"
            className="mt-4 inline-block text-sm font-medium text-fuchsia-300/90 underline-offset-4 hover:underline"
          >
            All games
          </Link>
        </div>
      </section>
    </div>
  );
}
