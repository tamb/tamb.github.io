"use client";

import { LayoutGroup, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

const mainNav: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/about/resume/", label: "Resume" },
  { href: "/portfolio/open-source/", label: "Open source" },
  { href: "/portfolio/software/", label: "Software" },
  { href: "/portfolio/drawings/", label: "Drawings" },
  { href: "/portfolio/music/", label: "Music" },
  { href: "/portfolio/photography/", label: "Photography" },
  { href: "/games/", label: "Games" },
];

export function SiteHeader() {
  const pathname = usePathname() || "/";

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-stone-100/85 backdrop-blur-md dark:border-stone-800/80 dark:bg-stone-950/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="group inline-flex items-baseline gap-2 text-lg font-semibold tracking-tight text-stone-900 transition-colors hover:text-amber-600 dark:text-stone-50 dark:hover:text-amber-200"
        >
          <span className="rounded-md bg-amber-900/40 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-amber-200/95 ring-1 ring-amber-600/30">
            tamb
          </span>
          <span className="text-stone-600 group-hover:text-stone-800 dark:text-stone-400 dark:group-hover:text-stone-200">
            portfolio
          </span>
        </Link>

        <LayoutGroup>
          <nav
            className="flex flex-wrap items-center gap-x-1 gap-y-2 text-sm"
            aria-label="Primary"
          >
            {mainNav.map(({ href, label }) => {
              const active =
                href === "/"
                  ? pathname === "/" || pathname === ""
                  : pathname.startsWith(href.replace(/\/$/, ""));
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative rounded-md px-2.5 py-1.5 transition-colors ${
                    active
                      ? "text-amber-900 dark:text-amber-200"
                      : "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
                  }`}
                >
                  {label}
                  {active ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-md bg-amber-500/15 ring-1 ring-amber-400/30"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  ) : null}
                </Link>
              );
            })}
            <ThemeToggle />
          </nav>
        </LayoutGroup>
      </div>
    </header>
  );
}
