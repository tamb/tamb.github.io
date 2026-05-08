import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hostedGames } from "@/lib/site-content";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return hostedGames.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = hostedGames.find((g) => g.slug === slug);
  if (!game) return { title: "Game" };
  return { title: game.title, description: game.summary };
}

export default async function GameDetailPage({ params }: Props) {
  const { slug } = await params;
  const game = hostedGames.find((g) => g.slug === slug);
  if (!game) notFound();

  return (
    <div className="mx-auto max-w-4xl flex-1 px-4 py-14 sm:py-16">
      <nav className="mb-8 text-sm text-zinc-500">
        <Link
          href="/games/"
          className="text-violet-300 hover:text-violet-200 hover:underline"
        >
          ← All games
        </Link>
      </nav>
      <header className="mb-8 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-400">
          {game.status === "live" ? "Now playing" : "Work in progress"}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          {game.title}
        </h1>
        <p className="text-lg text-zinc-400">{game.summary}</p>
      </header>

      <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/40 p-10 text-center">
        <p className="max-w-md text-sm text-zinc-400">
          Mount your game here: load a script from{" "}
          <code className="text-zinc-300">/games/{game.slug}/</code>, drop in an{" "}
          <code className="text-zinc-300">&lt;iframe&gt;</code>, or render a
          canvas component in this file.
        </p>
      </div>
    </div>
  );
}
