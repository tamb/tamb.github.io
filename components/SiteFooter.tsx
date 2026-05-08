import Link from "next/link";
import { siteMeta, tocadaUrl } from "@/lib/site-content";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-zinc-800/80 bg-zinc-950/50">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-zinc-500">
          <p>
            © {year} {siteMeta.personName}. Hosted on{" "}
            <a
              className="text-zinc-400 underline-offset-2 hover:text-violet-300 hover:underline"
              href="https://pages.github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Pages
            </a>
            .
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
          <Link className="hover:text-zinc-100" href="/about/resume/">
            Resume
          </Link>
          <Link className="hover:text-zinc-100" href="/games/">
            Games
          </Link>
          <a
            className="hover:text-emerald-300"
            href={tocadaUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            tocada
          </a>
        </div>
      </div>
    </footer>
  );
}
