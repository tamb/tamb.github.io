"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { GalleryItem } from "@/lib/site-content";

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  return (
    <ul className="grid gap-8 sm:grid-cols-2">
      {items.map((item, i) => (
        <motion.li
          key={item.src}
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
          <div className="relative overflow-hidden rounded-xl border border-stone-200 bg-white shadow-md transition-transform duration-500 group-hover:-translate-y-1 group-hover:shadow-stone-400/25 dark:border-stone-800 dark:bg-stone-900/30 dark:group-hover:shadow-amber-900/20">
            <Image
              src={item.src}
              alt={item.alt}
              width={800}
              height={600}
              className="h-auto w-full object-cover transition duration-700 group-hover:scale-[1.02]"
            />
          </div>
          <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
            {item.caption}
          </p>
        </motion.li>
      ))}
    </ul>
  );
}
