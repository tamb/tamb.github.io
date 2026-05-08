import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-1 flex-col justify-center px-4 py-24 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-400">
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold text-stone-900 dark:text-stone-50">
        This path does not exist
      </h1>
      <p className="mt-2 text-stone-600 dark:text-stone-400">
        Static routes are generated at build time — double-check the URL.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex justify-center rounded-full bg-amber-700 px-6 py-2.5 text-sm font-semibold text-amber-50 shadow-md shadow-amber-950/25 ring-1 ring-amber-500/40 transition hover:bg-amber-600 dark:shadow-amber-950/40"
      >
        Back home
      </Link>
    </div>
  );
}
