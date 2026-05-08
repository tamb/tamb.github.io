"use client";

import { LayoutGroup, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { tocadaUrl } from "@/lib/site-content";

const mainNav: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/about/resume/", label: "Resume" },
  { href: "/portfolio/drawings/", label: "Drawings" },
  { href: "/portfolio/music/", label: "Music" },
  { href: "/portfolio/photography/", label: "Photography" },
  { href: "/games/", label: "Games" },
];

export function SiteHeader() {
  const pathname = usePathname() || "/";

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="group inline-flex items-baseline gap-2 text-lg font-semibold tracking-tight text-zinc-50 transition-colors hover:text-violet-200"
        >
          <span className="rounded-md bg-violet-600/20 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-violet-300">
            tamb
          </span>
          <span className="text-zinc-400 group-hover:text-zinc-200">
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
                      ? "text-violet-200"
                      : "text-zinc-400 hover:text-zinc-100"
                  }`}
                >
                  {label}
                  {active ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-md bg-violet-500/15 ring-1 ring-violet-400/30"
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
            <a
              href={tocadaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md px-2.5 py-1.5 text-zinc-400 transition-colors hover:text-emerald-300"
            >
              Open source ↗
            </a>
          </nav>
        </LayoutGroup>
      </div>
    </header>
  );
}
