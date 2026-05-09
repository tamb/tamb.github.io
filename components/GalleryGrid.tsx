"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useState } from "react";
import type { GalleryItem } from "@/lib/site-content";

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  return (
    <ul className="grid gap-8 sm:grid-cols-2">
      {items.map((item, i) => (
        <motion.li
          key={`${item.images[0]?.src ?? i}-${item.caption}`}
          className="group space-y-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            delay: i * 0.06,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <GalleryCardImages images={item.images} />
          <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
            {item.caption}
          </p>
        </motion.li>
      ))}
    </ul>
  );
}

function GalleryCardImages({ images }: { images: GalleryItem["images"] }) {
  const [index, setIndex] = useState(0);
  const n = images.length;
  const safe = n === 0 ? 0 : Math.min(index, n - 1);
  const showNav = n > 1;

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((prev) => {
        const len = images.length;
        if (len === 0) return 0;
        return (prev + dir + len) % len;
      });
    },
    [images.length],
  );

  if (n === 0) return null;

  return (
    <div className="relative overflow-hidden rounded-xl border border-stone-200 bg-white shadow-md transition-transform duration-500 group-hover:-translate-y-1 group-hover:shadow-stone-400/25 dark:border-stone-800 dark:bg-stone-900/30 dark:group-hover:shadow-amber-900/20">
      <Image
        src={images[safe].src}
        alt={images[safe].alt}
        width={800}
        height={600}
        className="h-auto w-full object-cover transition duration-700 group-hover:scale-[1.02]"
      />
      {showNav ? (
        <>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center gap-1.5 pb-2 pt-8 bg-gradient-to-t from-stone-950/50 to-transparent">
            {images.map((_, dot) => (
              <button
                key={dot}
                type="button"
                aria-label={`Show image ${dot + 1} of ${n}`}
                onClick={() => setIndex(dot)}
                className={`pointer-events-auto h-2 w-2 rounded-full transition ${
                  dot === safe
                    ? "bg-amber-300 shadow-sm"
                    : "bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => go(-1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-md bg-stone-950/55 px-2 py-3 text-xs font-medium text-stone-100 opacity-0 backdrop-blur-sm transition hover:bg-stone-950/75 group-hover:opacity-100"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => go(1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-stone-950/55 px-2 py-3 text-xs font-medium text-stone-100 opacity-0 backdrop-blur-sm transition hover:bg-stone-950/75 group-hover:opacity-100"
          >
            ›
          </button>
        </>
      ) : null}
    </div>
  );
}
