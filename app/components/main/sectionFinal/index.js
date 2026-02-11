"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function FinalSection({ isActive }) {
  const rootRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const leftItems = gsap.utils.toArray(".finL-item");
      const rightBlocks = gsap.utils.toArray(".finR-block");

      // LEFT: 3D tilt base
      gsap.set(leftItems, {
        opacity: 0,
        y: 18,
        rotateX: 14,
        transformPerspective: 900,
        transformOrigin: "center center",
        filter: "blur(10px)",
      });

      // RIGHT: slide-in from outside-right
      gsap.set(rightBlocks, {
        opacity: 0,
        x: 160,
        rotateY: -8,
        transformPerspective: 1200,
        transformOrigin: "left center",
        filter: "blur(14px)",
      });

      const MASTER = 5.0;

      // LEFT timing -> total feel 5s
      const n = leftItems.length;
      const eachIn = 0.23;
      const durIn = Math.max(0.95, MASTER - eachIn * (n - 1));

      // RIGHT timing -> finish exactly at 5s too
      const rightStart = 0.85;
      const rightTotal = MASTER - rightStart;
      const rightEach = 0.2;
      const rightDur = Math.max(0.75, rightTotal - rightEach * (rightBlocks.length - 1));

      const tl = gsap.timeline({ paused: true });

      // LEFT IN
      tl.to(
        leftItems,
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
          duration: durIn,
          ease: "back.out(1.05)",
          stagger: { each: eachIn, from: "start" },
        },
        0
      );

      // RIGHT IN
      tl.to(
        rightBlocks,
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          filter: "blur(0px)",
          duration: rightDur,
          ease: "back.out(1.05)",
          stagger: { each: rightEach, from: "start" },
        },
        rightStart
      );

      // Freeze at end (no surprise fade)
      tl.eventCallback("onComplete", () => tl.pause(tl.duration()));

      tlRef.current = tl;
    }, root);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;

    tl.pause();

    if (isActive) {
      // replay entrance exactly like first time
      tl.progress(0).play();
    } else {
      // reverse out
      if (tl.progress() > 0) tl.reverse();
    }
  }, [isActive]);

  return (
    <section ref={rootRef} className="relative h-screen overflow-hidden bg-bf-bg">
      <div className="absolute inset-0">
        <div className="absolute -top-24 -left-24 w-[560px] h-[560px] rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-[560px] h-[560px] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 [box-shadow:inset_0_0_220px_rgba(0,0,0,0.82)]" />
      </div>

      <div className="relative z-10 h-full flex items-center px-6">
        <div className="max-w-6xl mx-auto w-full">
          <div className="rounded-3xl border border-white/10 bg-black/35 backdrop-blur p-8 md:p-12 shadow-[0_30px_120px_rgba(0,0,0,0.60)]">
            <div className="grid gap-10 lg:grid-cols-2">
              {/* LEFT */}
              <div className="space-y-6">
                <div className="finL-item font-mono text-xs md:text-sm text-bf-secondary uppercase tracking-[0.25em]">
                  Proof + Next Steps
                </div>

                <h2 className="finL-item font-display text-3xl md:text-5xl leading-[1.05]">
                  One partner for <span className="text-bf-primary">AI</span>,{" "}
                  <span className="text-bf-primary">Web/App</span>, and{" "}
                  <span className="text-bf-primary">IT</span>.
                </h2>

                <p className="finL-item text-slate-300 max-w-xl">
                  ByteForge is built to ship: fast execution, clean design, secure infrastructure,
                  and systems that scale. If you want fewer vendors and better outcomes, we’re the team.
                </p>

                <div className="finL-item grid gap-3 sm:grid-cols-3">
                  {[
                    ["Speed", "Ship in weeks"],
                    ["Clarity", "Simple + measurable"],
                    ["Reliability", "Secure operations"],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                      <div className="text-xs uppercase tracking-[0.25em] text-slate-400">{k}</div>
                      <div className="mt-2 text-slate-100 font-semibold">{v}</div>
                    </div>
                  ))}
                </div>

                <div className="finL-item text-sm text-slate-300">
                  <span className="text-slate-100 font-semibold">Guarantees:</span>{" "}
                  Clear scope · Transparent delivery · Production-ready quality
                </div>
              </div>

              {/* RIGHT */}
              <div className="space-y-4">
                <div className="finR-block rounded-2xl border border-white/10 bg-black/25 p-6">
                  <div className="text-sm text-slate-200 font-semibold">
                    Start a Project
                  </div>
                  <p className="mt-2 text-sm text-slate-300">
                    Click below to open the contact form. (Email/Telegram delivery finalized later.)
                  </p>

                  <div className="mt-5 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() =>
                        window.dispatchEvent(
                          new CustomEvent("bf:openContact", { detail: { source: "Final Section" } })
                        )
                      }
                      className="px-6 py-3 rounded-xl bg-bf-primary text-black font-semibold shadow-lg shadow-emerald-500/25 hover:brightness-110 transition"
                    >
                      Start a Project
                    </button>

                    <button
                      onClick={() => window.dispatchEvent(new CustomEvent("bf:gotoStep", { detail: { step: 0 } }))}
                      className="px-6 py-3 rounded-xl border border-white/15 bg-black/30 text-slate-100 hover:bg-black/40 transition"
                    >
                      Back to Top
                    </button>
                  </div>
                </div>

                <div className="finR-block rounded-2xl border border-white/10 bg-black/25 p-6">
                  <div className="text-sm text-slate-200 font-semibold">
                    What we’ll ask on the first call
                  </div>
                  <ul className="mt-3 text-sm text-slate-300 space-y-2">
                    <li>• What outcome matters most (speed, cost, security, growth)?</li>
                    <li>• Current tools / stack and what’s broken</li>
                    <li>• Timeline and budget range</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="finL-item mt-6 flex items-center justify-between text-xs text-slate-400">
            <span className="tracking-[0.25em] uppercase">Scene 6</span>
            <span className="opacity-70">Proof + Contact</span>
          </div>
        </div>
      </div>
    </section>
  );
}
