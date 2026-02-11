"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function HeroSection({ isActive }) {
  const rootRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".hero-item");

      // Base state
      gsap.set(items, {
        opacity: 0,
        y: 18,
        rotateX: 14,
        transformPerspective: 900,
        transformOrigin: "center center",
        filter: "blur(10px)",
      });

      // Total IN duration (ALL 5 items combined)
      const TOTAL_IN = 5.0;

      const n = items.length || 5;
      const eachIn = 0.35; // spacing between items (controls rhythm)
      const durIn = Math.max(0.55, TOTAL_IN - eachIn * (n - 1)); // makes total == TOTAL_IN

      const tl = gsap.timeline({ paused: true });

      // IN ONLY (this is the animation we want to reverse on exit)
      tl.to(items, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: "blur(0px)",
        duration: durIn,
        ease: "back.out(1.05)",
        stagger: { each: eachIn, from: "start" },
      });

      tlRef.current = tl;
    }, root);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const tl = tlRef.current;
    tl.eventCallback("onReverseComplete", () => tl.pause(0));

    if (!tl) return;
  
    // stop any conflicting tweens (important when user clicks fast)
    gsap.killTweensOf(tl);
  
    if (isActive) {
      // replay exactly like the first time, every time
      tl.restart();
    } else {
      // disappear by reversing the SAME animation (reverse order automatically)
      tl.reverse();
    }
  }, [isActive]);
  

  return (
    <section ref={rootRef} className="relative isolate min-h-screen overflow-hidden bg-black">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video className="w-full h-full object-cover" muted playsInline autoPlay loop preload="auto">
          <source src="/videos/v1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 [box-shadow:inset_0_0_220px_rgba(0,0,0,0.80)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <span className="hero-item font-mono text-xs md:text-sm tracking-[0.25em] uppercase text-bf-secondary mb-4">
          ByteForge · Web & App · Managed IT
        </span>

        <h1 className="hero-item font-display text-4xl md:text-6xl lg:text-7xl font-semibold mb-6 max-w-4xl">
          Web & App Design + Managed IT that just works.
        </h1>

        <p className="hero-item max-w-xl text-base md:text-lg text-slate-200/85 mb-8">
          US-based support for businesses that want beautiful digital experiences and rock-solid IT infrastructure—with one
          team handling both.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            className="hero-item px-6 py-3 rounded-xl bg-bf-primary text-black font-semibold shadow-lg shadow-emerald-500/30"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("bf:openContact", { detail: { source: "Hero" } }))
            }
          >
            Schedule a Strategy Call
          </button>

          <button
            className="hero-item px-6 py-3 rounded-xl border border-white/15 bg-bf-bg/70 font-medium text-slate-100"
            onClick={() => window.dispatchEvent(new CustomEvent("bf:gotoStep", { detail: { step: 4 } }))}
          >
            View Services
          </button>
        </div>
      </div>
    </section>
  );
}
