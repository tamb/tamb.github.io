"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "tamb-portfolio-verify-v1";
const TTL_MS = 1000 * 60 * 60 * 24 * 7;

type GateState = "loading" | "ok" | "challenge" | "blocked";

function readVerified(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as { t?: number };
    return typeof parsed.t === "number" && Date.now() - parsed.t < TTL_MS;
  } catch {
    return false;
  }
}

function suspiciousEnvironment(): boolean {
  if (navigator.webdriver) return true;
  return /headless|phantom|selenium|puppeteer|playwright|webdriver/i.test(
    navigator.userAgent,
  );
}

function shuffleOrder(): number[] {
  const nums = [1, 2, 3];
  for (let i = nums.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const a = nums[i];
    const b = nums[j];
    if (a === undefined || b === undefined) continue;
    nums[i] = b;
    nums[j] = a;
  }
  return nums;
}

/**
 * Full-screen overlay mounted after hydration so static HTML keeps real content
 * for crawlers. Unverified visitors get a short “catch the orbs” sequence instead
 * of a third-party captcha.
 */
export function HumanVerificationOverlay() {
  const [gate, setGate] = useState<GateState>("loading");
  const [order, setOrder] = useState<number[]>([1, 2, 3]);
  const [step, setStep] = useState(0);
  const [wrong, setWrong] = useState(false);

  useEffect(() => {
    if (suspiciousEnvironment()) {
      setGate("blocked");
      return;
    }
    if (readVerified()) {
      setGate("ok");
      return;
    }
    setGate("challenge");
    setOrder(shuffleOrder());
  }, []);

  const complete = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ t: Date.now() }));
    setGate("ok");
  }, []);

  const onCirclePress = useCallback(
    (num: number) => {
      const expected = step + 1;
      if (num !== expected) {
        setWrong(true);
        setStep(0);
        setOrder(shuffleOrder());
        window.setTimeout(() => setWrong(false), 450);
        return;
      }
      if (step === 2) {
        complete();
        return;
      }
      setStep((s) => s + 1);
    },
    [step, complete],
  );

  if (gate === "loading" || gate === "ok") {
    return null;
  }

  if (gate === "blocked") {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-zinc-950 px-6 text-center text-zinc-200">
        <p className="max-w-md text-sm leading-relaxed">
          This portfolio runs a tiny in-browser check that is not available in
          automated or headless browsers. Please open the site in a normal
          desktop or mobile browser.
        </p>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        key="gate"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gate-title"
        aria-describedby="gate-desc"
        className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/95 px-4 py-10 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="max-w-md w-full space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-xl shadow-violet-950/20"
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
        >
          <header className="space-y-2 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-300/90">
              Human check
            </p>
            <h1 id="gate-title" className="text-xl font-semibold text-zinc-50">
              Catch the orbs in order
            </h1>
            <p id="gate-desc" className="text-sm text-zinc-400">
              Tap{" "}
              <span className="font-medium text-violet-300">
                1, then 2, then 3
              </span>
              . Their positions shuffle — only the sequence matters.
            </p>
          </header>

          <p className="text-center text-xs text-zinc-500">
            Step {Math.min(step + 1, 3)} of 3
          </p>

          <div className="relative flex min-h-[140px] items-center justify-center gap-4">
            {order.map((num) => (
              <motion.button
                key={`${num}-${order.join("-")}`}
                type="button"
                aria-label={`Orb labeled ${num}`}
                className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 text-lg font-bold text-white shadow-lg shadow-violet-900/50 outline-none ring-offset-2 ring-offset-zinc-900 focus-visible:ring-2 focus-visible:ring-violet-400"
                onClick={() => onCirclePress(num)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                animate={
                  wrong ? { x: [0, -6, 6, -4, 4, 0] } : { y: [0, -4, 0] }
                }
                transition={
                  wrong
                    ? { duration: 0.45 }
                    : {
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 2.4,
                        ease: "easeInOut",
                        delay: num * 0.15,
                      }
                }
              >
                {num}
              </motion.button>
            ))}
          </div>

          <p className="text-center text-xs text-zinc-500">
            One tap out of order resets the sequence. Swap this mini-game for
            your own builds when they are ready.
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
