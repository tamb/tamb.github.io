"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useState } from "react";
import type { PortfolioProjectItem } from "@/lib/site-content";

export function ProjectPortfolioGrid({
  items,
}: {
  items: PortfolioProjectItem[];
}) {
  return (
    <ul className="grid gap-10 sm:grid-cols-2">
      {items.map((item, i) => (
        <motion.li
          key={item.folder}
          className="flex flex-col gap-4 rounded-xl border border-stone-200 bg-white/70 p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900/35"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            delay: i * 0.06,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div>
            <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
              {item.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              {item.description}
            </p>
          </div>

          {item.images.length > 0 ? (
            <>
              <ProjectCardImages images={item.images} />
              {item.imageCaption ? (
                <p className="text-xs leading-relaxed text-stone-500 dark:text-stone-500">
                  {item.imageCaption}
                </p>
              ) : null}
            </>
          ) : null}

          <ul className="mt-auto flex flex-wrap gap-2 pt-1">
            {item.links.map((link, li) => (
              <li key={`${item.folder}-${li}-${link.label}`}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full border border-emerald-700/35 bg-emerald-950/10 px-3 py-1.5 text-xs font-medium text-emerald-800 transition hover:border-emerald-600/55 hover:bg-emerald-900/20 dark:border-emerald-500/30 dark:text-emerald-300 dark:hover:border-emerald-400/45 dark:hover:bg-emerald-950/40"
                >
                  {link.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </motion.li>
      ))}
    </ul>
  );
}

function ProjectCardImages({
  images,
}: {
  images: PortfolioProjectItem["images"];
}) {
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
    <div className="relative overflow-hidden rounded-lg border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-950/40">
      <Image
        src={images[safe].src}
        alt={images[safe].alt}
        width={800}
        height={520}
        className="h-auto w-full object-cover"
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
                    ? "bg-emerald-400 shadow-sm"
                    : "bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => go(-1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-md bg-stone-950/55 px-2 py-3 text-xs font-medium text-stone-100 backdrop-blur-sm hover:bg-stone-950/75"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => go(1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-stone-950/55 px-2 py-3 text-xs font-medium text-stone-100 backdrop-blur-sm hover:bg-stone-950/75"
          >
            ›
          </button>
        </>
      ) : null}
    </div>
  );
}
