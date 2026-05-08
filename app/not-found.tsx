import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-1 flex-col justify-center px-4 py-24 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet-400">
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold text-zinc-50">
        This path does not exist
      </h1>
      <p className="mt-2 text-zinc-400">
        Static routes are generated at build time — double-check the URL.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex justify-center rounded-full bg-violet-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-violet-500"
      >
        Back home
      </Link>
    </div>
  );
}
