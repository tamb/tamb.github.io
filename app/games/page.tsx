import type { Metadata } from "next";
import Link from "next/link";
import { hostedGames } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Games",
  description: "Hosted web games and experiments.",
};

export default function GamesIndexPage() {
  return (
    <div className="mx-auto max-w-4xl flex-1 px-4 py-14 sm:py-16">
      <header className="mb-12 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-400">
          Play
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          Games
        </h1>
        <p className="max-w-2xl text-zinc-400">
          Each route is static — add your builds under{" "}
          <code className="text-zinc-300">public/games/&lt;slug&gt;/</code> or
          mount a canvas in the slug page when you are ready.
        </p>
      </header>
      <ul className="space-y-4">
        {hostedGames.map((g) => (
          <li key={g.slug}>
            <Link
              href={`/games/${g.slug}/`}
              className="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/35 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-fuchsia-500/50 hover:shadow-lg hover:shadow-fuchsia-950/20 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold text-zinc-50">
                  {g.title}
                </h2>
                <p className="mt-1 text-sm text-zinc-400">{g.summary}</p>
              </div>
              <span className="mt-4 inline-flex items-center rounded-full bg-fuchsia-500/15 px-3 py-1 text-xs font-medium uppercase tracking-wide text-fuchsia-300 sm:mt-0">
                {g.status === "live" ? "Live" : "Coming soon"}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
