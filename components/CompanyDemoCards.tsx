"use client";

import { motion } from "framer-motion";
import type { CompanyDemo } from "@/lib/site-content";

export function CompanyDemoCards({ demos }: { demos: CompanyDemo[] }) {
  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {demos.map((c, i) => (
        <motion.li
          key={c.name}
          className="flex flex-col rounded-2xl border border-stone-200 bg-white/90 p-6 shadow-sm transition hover:border-amber-300/70 hover:shadow-lg hover:shadow-amber-900/10 dark:border-stone-800 dark:bg-stone-900/35 dark:hover:border-amber-500/40 dark:hover:shadow-amber-950/20"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            delay: i * 0.08,
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
              {c.name}
            </h3>
            <span className="text-xs text-stone-500">{c.years}</span>
          </div>
          <p className="mb-1 text-sm font-medium text-amber-300/90">{c.role}</p>
          <p className="mb-6 flex-1 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
            {c.blurb}
          </p>
          <a
            href={c.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1 text-sm font-medium text-amber-300 underline-offset-4 hover:underline"
          >
            {c.demoLabel} <span aria-hidden>↗</span>
          </a>
        </motion.li>
      ))}
    </ul>
  );
}
