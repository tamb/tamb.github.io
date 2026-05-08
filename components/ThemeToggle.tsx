"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span className="inline-flex h-8 w-[5.5rem] shrink-0" aria-hidden />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex shrink-0 items-center gap-2 rounded-full border border-stone-300 bg-stone-100/90 px-3 py-1.5 text-xs font-medium text-stone-700 shadow-sm transition hover:border-stone-400 hover:bg-stone-50 dark:border-stone-600 dark:bg-stone-800/80 dark:text-stone-200 dark:hover:border-stone-500 dark:hover:bg-stone-800"
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span aria-hidden className="text-base leading-none">
        {isDark ? "☀" : "☾"}
      </span>
      <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}
