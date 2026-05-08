"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const STORAGE_KEY = "tamb-portfolio-verify-v1";
const TTL_MS = 1000 * 60 * 60 * 24 * 7;

const SWEEP_SEC_FALLBACK = 10;
const SWEEP_SEC_MIN = 3;
const SWEEP_SEC_MAX = 120;

function readSweepMsFromEnv(): number {
  const raw = process.env.NEXT_PUBLIC_HUMAN_VERIFY_SWEEP_SECONDS;
  const fallbackSec = SWEEP_SEC_FALLBACK;
  if (raw === undefined || raw.trim() === "") {
    return fallbackSec * 1000;
  }
  const sec = Number.parseInt(raw, 10);
  if (!Number.isFinite(sec)) {
    return fallbackSec * 1000;
  }
  const clamped = Math.min(SWEEP_SEC_MAX, Math.max(SWEEP_SEC_MIN, sec));
  return clamped * 1000;
}

/** One leg across the bar; direction flips when the CSS animation finishes (via animationend). */
const SWEEP_MS = readSweepMsFromEnv();
const SWEEP_SEC_DISPLAY = SWEEP_MS / 1000;

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
 * Full-screen overlay after hydration. Static HTML stays fully readable for crawlers;
 * visitors in a normal browser complete a short in-page check (no third-party captcha).
 */
export function HumanVerificationOverlay() {
  const [gate, setGate] = useState<GateState>("loading");
  const [order, setOrder] = useState<number[]>([1, 2, 3]);
  const [step, setStep] = useState(0);
  const [wrong, setWrong] = useState(false);
  const [driveDirection, setDriveDirection] = useState<"rtl" | "ltr">("rtl");
  const [sweepGeneration, setSweepGeneration] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(() =>
    Math.ceil(SWEEP_MS / 1000),
  );

  const legStartedAtRef = useRef(Date.now());

  useLayoutEffect(() => {
    if (suspiciousEnvironment()) {
      setGate("blocked");
      return;
    }
    if (readVerified()) {
      setGate("ok");
      return;
    }
    legStartedAtRef.current = Date.now();
    setSecondsLeft(Math.ceil(SWEEP_MS / 1000));
    setDriveDirection("rtl");
    setSweepGeneration(0);
    setOrder(shuffleOrder());
    setGate("challenge");
  }, []);

  useEffect(() => {
    if (gate !== "challenge") return;
    const interval = window.setInterval(() => {
      const elapsed = Date.now() - legStartedAtRef.current;
      const remaining = Math.max(0, SWEEP_MS - elapsed);
      setSecondsLeft(Math.max(0, Math.ceil(remaining / 1000)));
    }, 100);
    return () => window.clearInterval(interval);
  }, [gate]);

  const onSweepAnimationEnd = useCallback(
    (e: React.AnimationEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return;
      legStartedAtRef.current = Date.now();
      setSecondsLeft(Math.ceil(SWEEP_MS / 1000));
      setDriveDirection((d) => (d === "rtl" ? "ltr" : "rtl"));
      setOrder(shuffleOrder());
      setSweepGeneration((g) => g + 1);
    },
    [],
  );

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

  if (gate === "ok") {
    return null;
  }

  if (gate === "loading") {
    return (
      <div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-3 bg-stone-200/95 px-6 text-center dark:bg-stone-950"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <p className="text-sm font-medium text-stone-800 dark:text-stone-200">
          One moment — checking your browser…
        </p>
        <p className="max-w-sm text-xs leading-relaxed text-stone-600 dark:text-stone-500">
          This site uses a quick human verification step before showing the
          portfolio.
        </p>
      </div>
    );
  }

  if (gate === "blocked") {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-stone-200/95 px-6 text-center text-stone-800 dark:bg-stone-950 dark:text-stone-200">
        <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
          Human verification isn’t available in this environment
        </p>
        <p className="max-w-md text-sm leading-relaxed text-stone-600 dark:text-stone-400">
          This portfolio uses a small in-browser check to confirm you’re a real
          visitor. It doesn’t run in automated or headless browsers. If you’re
          on a regular phone or computer, try opening the site in Chrome,
          Firefox, Safari, or Edge — that usually does the trick.
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
        className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-200/95 px-4 py-10 backdrop-blur-md dark:bg-stone-950/95"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="max-w-md w-full space-y-5 rounded-2xl border border-stone-200 bg-white/95 p-6 shadow-lg shadow-stone-400/20 dark:border-stone-800 dark:bg-stone-900/80 dark:shadow-black/20 sm:p-8"
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
        >
          <header className="space-y-1 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300/90">
              Human verification
            </p>
            <h1
              id="gate-title"
              className="text-xl font-semibold text-stone-900 dark:text-stone-50"
            >
              Quick check — you’re almost in
            </h1>
          </header>

          {/* Captcha / tap challenge */}
          <section
            aria-label="Verification challenge"
            className="space-y-4 rounded-xl border border-stone-300 bg-stone-100/80 p-4 ring-1 ring-amber-600/20 dark:border-stone-600 dark:bg-stone-900/40 dark:ring-amber-500/15 sm:p-5"
          >
            <p
              id="gate-desc"
              className="text-sm leading-relaxed text-stone-600 dark:text-stone-400"
            >
              Tap the numbered circles in order:{" "}
              <span className="font-medium text-stone-900 dark:text-stone-200">
                1, then 2, then 3
              </span>
              . Only the sequence matters — their positions shuffle when the bar
              below finishes a pass ({SWEEP_SEC_DISPLAY}s each way).
            </p>

            <p className="text-center text-xs font-medium text-stone-600 dark:text-stone-500">
              Sequence: step {Math.min(step + 1, 3)} of 3
            </p>

            <div className="relative flex min-h-[140px] items-center justify-center gap-4">
              {order.map((num) => (
                <motion.button
                  key={`${num}-${order.join("-")}`}
                  type="button"
                  aria-label={`Number ${num}`}
                  className="relative flex h-16 w-16 cursor-pointer touch-manipulation select-none items-center justify-center rounded-full bg-gradient-to-br from-amber-800 to-orange-900 text-lg font-bold text-orange-50 shadow-lg shadow-amber-950/40 outline-none ring-offset-2 ring-offset-stone-100 transition-[box-shadow,filter] duration-200 ease-out hover:brightness-110 hover:shadow-xl hover:shadow-amber-900/50 hover:ring-2 hover:ring-amber-400/45 active:brightness-[0.92] active:shadow-md active:shadow-amber-950/30 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-100 dark:shadow-amber-950/40 dark:ring-offset-stone-900 dark:focus-visible:ring-offset-stone-900"
                  onClick={() => onCirclePress(num)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  animate={
                    wrong ? { x: [0, -6, 6, -4, 4, 0] } : { y: [0, -4, 0] }
                  }
                  transition={{
                    scale: {
                      type: "spring",
                      stiffness: 520,
                      damping: 28,
                      mass: 0.55,
                    },
                    ...(wrong
                      ? { x: { duration: 0.45 } }
                      : {
                          y: {
                            repeat: Number.POSITIVE_INFINITY,
                            duration: 2.4,
                            ease: "easeInOut",
                            delay: num * 0.15,
                          },
                        }),
                  }}
                >
                  {num}
                </motion.button>
              ))}
            </div>

            <p className="text-center text-xs leading-relaxed text-stone-600 dark:text-stone-500">
              Wrong tap resets your 1-2-3 progress (the timer keeps running).
              Nothing is sent to a captcha company.
            </p>
          </section>

          {/* Shuffle timer: minimal, below captcha; CSS animation + animationend for reliable reversals */}
          <section
            aria-label={`Shuffle timer, ${secondsLeft} seconds left this leg`}
            className="rounded-lg border border-stone-300 bg-stone-100/90 px-3 py-2 dark:border-stone-800/90 dark:bg-stone-950/60"
          >
            <div className="relative h-6 w-full overflow-hidden rounded-full border border-stone-300 bg-stone-200/80 dark:border-stone-800 dark:bg-stone-900/80">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.12] dark:opacity-[0.12]"
                style={{
                  background:
                    "repeating-linear-gradient(90deg, transparent, transparent 6px, rgb(120 113 108 / 0.35) 6px, rgb(120 113 108 / 0.35) 7px)",
                }}
                aria-hidden
              />
              <div
                key={`${driveDirection}-${sweepGeneration}`}
                role="presentation"
                className={`absolute top-0.5 bottom-0.5 flex w-[var(--human-verify-driver-w)] items-center justify-center gap-0.5 rounded-md border border-stone-500 bg-stone-500 px-0.5 shadow-sm dark:border-stone-600 dark:bg-stone-700 ${
                  driveDirection === "rtl"
                    ? "human-verify-sweep-rtl"
                    : "human-verify-sweep-ltr"
                }`}
                style={{ animationDuration: `${SWEEP_MS}ms` }}
                onAnimationEnd={onSweepAnimationEnd}
              >
                <span
                  className={`text-[10px] text-stone-700 dark:text-stone-300 ${driveDirection === "rtl" ? "rotate-180" : ""}`}
                  aria-hidden
                >
                  ▶
                </span>
                <span className="tabular-nums text-[10px] font-medium text-stone-100 dark:text-stone-400">
                  {secondsLeft}s
                </span>
              </div>
            </div>
          </section>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
