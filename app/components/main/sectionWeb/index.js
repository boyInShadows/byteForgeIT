"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function WebSection({ isActive }) {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const tlRef = useRef(null);

  const [videoError, setVideoError] = useState(null);
  const [showDebug, setShowDebug] = useState(false);

  // Show debug only if video doesn't become ready after a short grace window
  useEffect(() => {
    // Avoid synchronous setState in an effect body (eslint react-hooks/set-state-in-effect)
    // Reset on next tick, then show debug after a grace window if still active.
    const resetT = setTimeout(() => {
      setShowDebug(false);
      setVideoError(null);
    }, 0);

    const t = setTimeout(() => {
      // if still not playing/ready and user is in this scene, show debug
      if (isActive) setShowDebug(true);
    }, 1200);

    return () => {
      clearTimeout(resetT);
      clearTimeout(t);
    };
  }, [isActive]);

  // Ensure video plays when section becomes active (autoplay policies safe)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = true;

    if (isActive) {
      const p = v.play();
      if (p && typeof p.catch === "function") {
        p.catch((err) => {
          setVideoError(err?.message || String(err));
          setShowDebug(true);
          console.warn("[WebSection video] play() failed:", err);
        });
      }
    }
  }, [isActive]);

// Entrance animation (5s master, left + right end together)
useEffect(() => {
  const root = rootRef.current;
  if (!root) return;

  const ctx = gsap.context(() => {
    const leftItems = gsap.utils.toArray(".web-item");
    const frame = root.querySelector(".web-frame");

    // Base hidden states
    gsap.set(leftItems, {
      opacity: 0,
      y: 18,
      rotateX: 14,
      transformPerspective: 900,
      transformOrigin: "center center",
      filter: "blur(10px)",
    });

    gsap.set(frame, {
      opacity: 0,
      x: 140,                 // ✅ starts outside right
      y: 0,
      rotateY: -8,
      transformPerspective: 1200,
      transformOrigin: "left center",
      filter: "blur(14px)",
    });

    const MASTER = 5.0;       // total duration target
    const n = leftItems.length;

    // Make stagger cover most of the 5s but leave room for per-item easing
    const eachIn = 0.28;
    const durIn = Math.max(0.65, MASTER - eachIn * (n - 1));

    const tl = gsap.timeline({ paused: true });

    // Left (3D tilt in)
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

    // Right (slide-in) — ends exactly at 5s
    // Start slightly after left begins, but finish by MASTER
    // so duration = MASTER - startTime
    const frameStart = 0.55;
    tl.to(
      frame,
      {
        opacity: 1,
        x: 0,
        rotateY: 0,
        filter: "blur(0px)",
        duration: MASTER - frameStart,
        ease: "back.out(1.05)",
      },
      frameStart
    );

    // Freeze at end
    tl.eventCallback("onComplete", () => tl.pause(tl.duration()));

    tlRef.current = tl;
  }, root);

  return () => ctx.revert();
}, []);


useEffect(() => {
  const tl = tlRef.current;
  if (!tl) return;

  tl.pause(); // avoid half-states on fast step changes

  if (isActive) {
    tl.progress(0).play();   // ✅ always replay from start
  } else {
    if (tl.progress() > 0) tl.reverse(); // ✅ reverse out
  }
}, [isActive]);


  return (
    <section ref={rootRef} className="relative isolate h-screen overflow-hidden bg-black">
      {/* Background video (use ONE source method) */}
      <div className="absolute inset-0 -z-10">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          muted
          playsInline
          autoPlay
          loop
          preload="metadata"
          onCanPlay={() => {
            setVideoError(null);
          }}
          onError={(e) => {
            const mediaErr = e?.currentTarget?.error;
            const msg =
              mediaErr?.message ||
              (typeof mediaErr?.code === "number" ? `MediaError code ${mediaErr.code}` : null) ||
              "Unknown video error";
            setVideoError(msg);
            setShowDebug(true);
            console.error("[WebSection video] onError:", mediaErr);
          }}
        >
          <source src="/videos/v4.mp4" type="video/mp4" />
        </video>

        {/* Overlay stack (premium readability) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/45" />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(rgba(255,255,255,0.20)_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/25 to-transparent" />

        {/* Subtle vignette */}
        <div className="absolute inset-0 [box-shadow:inset_0_0_220px_rgba(0,0,0,0.85)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-6 ">
        <div className="max-w-6xl mx-auto w-full ">
          <div className="grid gap-10 lg:grid-cols-2 items-center ">
            {/* Left */}
            <div className="space-y-7">
              {/* Badge row (stronger + cleaner) */}
              <div className="web-item inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/35 px-5 py-2 backdrop-blur">
                <span className="relative inline-flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-bf-primary opacity-40 animate-ping" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-bf-primary" />
                </span>

                <span className="font-mono text-[11px] md:text-xs uppercase tracking-[0.28em] text-slate-200">
                  Web & App Studio
                </span>

                <span className="hidden md:inline h-4 w-px bg-white/10" />
                <span className="hidden md:inline text-xs text-slate-300">
                  Design · Development · Deployment
                </span>
              </div>

              {/* Headline (better rhythm) */}
              <h2 className="web-item font-display text-4xl md:text-6xl leading-[1.02] max-w-xl">
                Modern products that feel{" "}
                <span className="text-bf-primary drop-shadow-[0_0_18px_rgba(16,185,129,0.22)]">
                  premium
                </span>{" "}
                and perform{" "}
                <span className="text-bf-primary drop-shadow-[0_0_18px_rgba(16,185,129,0.22)]">
                  fast
                </span>
                .
              </h2>

              {/* Subtext (less dense + nicer width) */}
              <p className="web-item text-slate-200/80 max-w-[34rem] leading-relaxed">
                Landing pages, business sites, dashboards, and app MVPs—built end-to-end
                with clean UI, strong UX, and production-ready code.
              </p>

              {/* Chips (cleaner, less heavy) */}
              <div className="web-item flex flex-wrap gap-2">
                {["Web Design", "App Development", "Dashboards", "MVP Launch", "Performance + SEO", "Maintenance"].map(
                  (t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full border border-white/10 bg-black/25 text-[11px] md:text-xs text-slate-100/85 hover:text-slate-100 hover:border-white/15 transition"
                    >
                      {t}
                    </span>
                  )
                )}
              </div>

              {/* Buttons (better spacing + micro UX) */}
              <div className="web-item flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  onClick={() =>
                    window.dispatchEvent(new CustomEvent("bf:openContact", { detail: { source: "Web/App" } }))
                  }
                  className="px-6 py-3 rounded-xl bg-bf-primary text-black font-semibold shadow-lg shadow-emerald-500/25 hover:brightness-110 transition"
                >
                  Start a Web/App Project
                </button>

                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("bf:gotoStep", { detail: { step: 5 } }))}
                  className="px-6 py-3 rounded-xl border border-white/15 bg-black/30 text-slate-100 hover:bg-black/45 transition"
                >
                  Contact
                </button>
              </div>

              {/* Debug (only if needed) */}
              {showDebug && videoError && (
                <div className="web-item text-[11px] text-slate-400">
                  <span className="font-mono tracking-wide uppercase text-slate-500">Video</span>{" "}
                  <span className="opacity-80">error: {videoError}</span>
                </div>
              )}
            </div>

            {/* Right frame (more “real product” depth) */}
            <div className="web-frame">
              <div className="rounded-3xl border border-white/10 bg-black/55 backdrop-blur p-5 shadow-[0_30px_120px_rgba(0,0,0,0.65)]">
                <div className="flex items-center justify-between pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-300/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                  </div>
                  <div className="text-xs text-slate-400 tracking-[0.22em] uppercase">
                    Product Preview
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
                  <div className="flex items-center justify-between">
                    <div className="h-3 w-32 rounded-full bg-white/10" />
                    <div className="h-7 w-20 rounded-full bg-bf-primary/15 border border-emerald-300/20" />
                  </div>

                  <div className="mt-4 grid gap-3">
                    <div className="h-24 rounded-2xl bg-gradient-to-br from-emerald-500/18 via-cyan-400/10 to-white/5 border border-white/10" />
                    <div className="grid grid-cols-2 gap-3">
                      <div className="h-16 rounded-2xl bg-white/5 border border-white/10" />
                      <div className="h-16 rounded-2xl bg-white/5 border border-white/10" />
                    </div>
                    <div className="h-12 rounded-2xl bg-white/5 border border-white/10" />
                  </div>
                </div>

                <div className="mt-4 text-xs text-slate-400">
                  Clean UI · Fast performance · Built for conversion
                </div>
              </div>
            </div>
          </div>

          <div className="web-item mt-6 flex items-center justify-between text-xs text-slate-400">
            <span className="tracking-[0.25em] uppercase">Scene</span>
            <span className="opacity-70">Web Design · App Development</span>
          </div>
        </div>
      </div>
    </section>
  );
}
