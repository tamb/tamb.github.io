import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import { loadGallerySection } from "@/lib/portfolio/load";

export const metadata: Metadata = {
  title: "Photography",
  description: "Photography portfolio frames.",
};

export default function PhotographyPage() {
  const items = loadGallerySection("photography");
  return (
    <div className="mx-auto max-w-6xl flex-1 px-4 py-14 sm:py-16">
      <header className="mb-12 max-w-2xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
          Portfolio
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          Photography
        </h1>
        <p className="text-zinc-400">
          Same layout as drawings: one folder per frame under{" "}
          <code className="text-zinc-300">
            public/content/portfolio/photography/
          </code>
          , with WebP or JPEG recommended for{" "}
          <code className="text-zinc-300">media.*</code>.
        </p>
      </header>
      <GalleryGrid items={items} />
    </div>
  );
}
