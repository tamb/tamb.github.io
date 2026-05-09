import type { Metadata } from "next";
import { PortfolioEmbedBlock } from "@/components/PortfolioEmbedBlock";
import { loadMusicEmbeds } from "@/lib/portfolio/load";

export const metadata: Metadata = {
  title: "Music",
  description: "Tracks and mixes — SoundCloud embeds.",
};

export default function MusicPage() {
  const embeds = loadMusicEmbeds();
  return (
    <div className="mx-auto max-w-3xl flex-1 px-4 py-14 sm:py-16">
      <header className="mb-10 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
          Portfolio
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl">
          Music
        </h1>
        <p className="text-stone-600 dark:text-stone-400">
          Add a folder under{" "}
          <code className="text-stone-800 dark:text-stone-300">
            public/content/portfolio/music/
          </code>{" "}
          with{" "}
          <code className="text-stone-800 dark:text-stone-300">
            manifest.json
          </code>
          . Use{" "}
          <code className="text-stone-800 dark:text-stone-300">
            type: &quot;soundcloud&quot;
          </code>
          ,{" "}
          <code className="text-stone-800 dark:text-stone-300">
            type: &quot;iframe&quot;
          </code>
          , or{" "}
          <code className="text-stone-800 dark:text-stone-300">
            type: &quot;pdf&quot;
          </code>{" "}
          (with{" "}
          <code className="text-stone-800 dark:text-stone-300">
            00.media.pdf
          </code>{" "}
          /{" "}
          <code className="text-stone-800 dark:text-stone-300">media.pdf</code>
          ).
        </p>
      </header>
      <div className="space-y-8">
        {embeds.map(({ slug, ...item }) => (
          <PortfolioEmbedBlock key={slug} {...item} />
        ))}
      </div>
    </div>
  );
}
