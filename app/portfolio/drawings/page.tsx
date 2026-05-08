import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import { loadGallerySection } from "@/lib/portfolio/load";

export const metadata: Metadata = {
  title: "Drawings",
  description: "Selected drawings and sketches.",
};

export default function DrawingsPage() {
  const items = loadGallerySection("drawings");
  return (
    <div className="mx-auto max-w-6xl flex-1 px-4 py-14 sm:py-16">
      <header className="mb-12 max-w-2xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
          Portfolio
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          Drawings
        </h1>
        <p className="text-zinc-400">
          Add a folder under{" "}
          <code className="text-zinc-300">
            public/content/portfolio/drawings/
          </code>{" "}
          with <code className="text-zinc-300">manifest.json</code> (
          <code className="text-zinc-300">type: &quot;image&quot;</code>) and a{" "}
          <code className="text-zinc-300">media.&lt;ext&gt;</code> file.
        </p>
      </header>
      <GalleryGrid items={items} />
    </div>
  );
}
