"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Automation from "@/public/lottie/Automation.json";
import WebApp from "@/public/lottie/WebApp.json";

export default function AISection({ isActive }) {
  const rootRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
  
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".aiA-item");
      const lines = gsap.utils.toArray(".aiA-line");
      const panel = root.querySelector(".aiA-panel");
      const reveal = root.querySelector(".aiA-reveal");
  
      // Base hidden states (match Hero/Interlude “premium 3D”)
      gsap.set(items, {
        opacity: 0,
        y: 18,
        rotateX: 14,
        transformPerspective: 900,
        transformOrigin: "center center",
        filter: "blur(10px)",
      });
  
      gsap.set(lines, {
        scaleX: 0,
        transformOrigin: "left center",
        opacity: 0,
        filter: "blur(6px)",
      });
  
      // Panel: slide from outside-right (like WebSection)
      gsap.set(panel, {
        opacity: 0,
        x: 140,
        rotateY: -8,
        transformPerspective: 1200,
        transformOrigin: "left center",
        filter: "blur(14px)",
      });
  
      // Reveal container (clip-path reveal)
      gsap.set(reveal, {
        clipPath: "inset(0 0 100% 0 round 28px)",
      });
  
      const MASTER = 5.0;
  
      // Items timing (similar to WebSection)
      const n = items.length;
      const eachIn = 0.23; // slightly tighter than interlude because items are many here
      const durIn = Math.max(0.75, MASTER - eachIn * (n - 1));
  
      const tl = gsap.timeline({ paused: true });
  
      // 1) Reveal opens
      tl.to(
        reveal,
        {
          clipPath: "inset(0 0 0% 0 round 28px)",
          duration: 0.9,
          ease: "back.out(1.05)",
        },
        0
      );
  
      // 2) Lines “draw in”
      tl.to(
        lines,
        {
          scaleX: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.85,
          ease: "back.out(1.05)",
          stagger: 0.10,
        },
        0.35
      );
  
      // 3) Left content tilt-in (finishes by 5s feel)
      tl.to(
        items,
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
          duration: durIn,
          ease: "back.out(1.05)",
          stagger: { each: eachIn, from: "start" },
        },
        0.55
      );
  
      // 4) Right panel slides in and finishes EXACTLY at 5s
      const panelStart = 0.75;
      tl.to(
        panel,
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          filter: "blur(0px)",
          duration: MASTER - panelStart,
          ease: "back.out(1.05)",
        },
        panelStart
      );
  
      // Freeze at end (no auto fade-out)
      tl.eventCallback("onComplete", () => tl.pause(tl.duration()));
  
      tlRef.current = tl;
    }, root);
  
    return () => ctx.revert();
  }, []);
  

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
  
    tl.pause(); // avoid half states on fast navigation
  
    if (isActive) {
      // Always replay EXACTLY like first time
      tl.progress(0).play();
    } else {
      // Reverse back out (includes reveal closing, panel sliding away, items disappearing)
      if (tl.progress() > 0) tl.reverse();
    }
  }, [isActive]);
  

  return (
    <section ref={rootRef} className="relative isolate h-screen overflow-hidden bg-bf-bg">
      {/* Background: cinematic lab */}
      <div className="absolute inset-0 -z-10">
        {/* base darkness */}
        <div className="absolute inset-0 bg-black/45" />

        {/* emerald + cyan halos */}
        <div className="absolute -top-24 -left-24 w-[620px] h-[620px] rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-28 -right-28 w-[620px] h-[620px] rounded-full bg-cyan-400/10 blur-3xl" />

        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:28px_28px]" />

        {/* vignette */}
        <div className="absolute inset-0 [box-shadow:inset_0_0_240px_rgba(0,0,0,0.86)]" />

        {/* “signal line” */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/25 to-transparent" />
      </div>

      <div className="relative z-10 h-full flex items-center px-6">
        <div className="max-w-6xl mx-auto w-full">
          <div className="aiA-reveal rounded-[28px] border border-white/10 bg-black/30 backdrop-blur p-8 md:p-12 shadow-[0_30px_140px_rgba(0,0,0,0.65)]">
            {/* Top badge */}
            <div className="aiA-item inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/35 px-5 py-2">
              <span className="relative inline-flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-bf-primary opacity-40 animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-bf-primary" />
              </span>

              <span className="font-mono text-[11px] md:text-xs uppercase tracking-[0.28em] text-slate-200">
                Priority #1 · AI Systems
              </span>

              <span className="hidden md:inline h-4 w-px bg-white/10" />
              <span className="hidden md:inline text-xs text-slate-300">
                Agents · CRM/ERM · Automations
              </span>
            </div>

            {/* Main layout */}
            <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">
              {/* Left: headline + story */}
              <div className="space-y-6">
                <h2 className="aiA-item font-display text-4xl md:text-6xl leading-[1.02] max-w-3xl">
                  Intelligent systems that{" "}
                  <span className="text-bf-primary drop-shadow-[0_0_18px_rgba(16,185,129,0.18)]">
                    run operations
                  </span>{" "}
                  — not just chat.
                </h2>

                <p className="aiA-item text-slate-200/80 max-w-2xl leading-relaxed">
                  We build agent-powered workflows, internal platforms, and CRM/ERM systems that connect to your
                  tools—so tasks execute automatically, decisions get faster, and your team scales without chaos.
                </p>

                {/* Cinematic divider lines */}
                <div className="space-y-3">
                  <div className="aiA-line h-px w-full bg-gradient-to-r from-emerald-400/30 via-white/10 to-transparent" />
                  <div className="aiA-line h-px w-[85%] bg-gradient-to-r from-cyan-400/20 via-white/10 to-transparent" />
                  <div className="aiA-line h-px w-[70%] bg-gradient-to-r from-white/10 to-transparent" />
                </div>

                {/* Outcomes (minimal) */}
                <div className="aiA-item flex flex-wrap gap-2 pt-1">
                  {[
                    "Automate repetitive workflows",
                    "Unify data into one system",
                    "Speed up response + delivery",
                    "Make ops measurable",
                    "Lower overhead",
                  ].map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full border border-white/10 bg-black/25 text-[11px] md:text-xs text-slate-100/85"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="aiA-item flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() =>
                      window.dispatchEvent(new CustomEvent("bf:openContact", { detail: { source: "AI Systems" } }))
                    }
                    className="px-6 py-3 rounded-xl bg-bf-primary text-black font-semibold shadow-lg shadow-emerald-500/25 hover:brightness-110 transition"
                  >
                    Start an AI Project
                  </button>

                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent("bf:gotoStep", { detail: { step: 5 } }))}
                    className="px-6 py-3 rounded-xl border border-white/15 bg-black/30 text-slate-100 hover:bg-black/45 transition"
                  >
                    Contact
                  </button>
                </div>
              </div>

              {/* Right: one premium “capabilities” panel (not a grid of cards) */}
              <div className="aiA-panel">
                <div className="rounded-3xl border border-white/10 bg-black/30 backdrop-blur p-6">
                  <div className="text-xs uppercase tracking-[0.25em] text-slate-400">
                    What we build
                  </div>

                  <div className="mt-4 space-y-3">
                    {[
                      ["Agent Core", "Tools, memory, routing, evals, safety."],
                      ["CRM / ERM", "Unified ops data, dashboards, workflows."],
                      ["Automations", "Triggers, integrations, task execution."],
                      ["Deployment", "Cloud setup, monitoring, reliability."],
                    ].map(([title, desc]) => (
                      <div
                        key={title}
                        className="rounded-2xl border border-white/10 bg-black/25 p-4"
                      >
                        <div className="text-slate-100 font-semibold">{title}</div>
                        <div className="mt-1 text-sm text-slate-300">{desc}</div>
                      </div>
                    ))}
                  </div>

                  {/* mini “signal status” */}
                  <div className="mt-5 flex items-center justify-between text-xs text-slate-400">
                    <span className="inline-flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-bf-primary shadow-[0_0_18px_rgba(16,185,129,0.25)]" />
                      Active systems, measurable outcomes
                    </span>
                    <span className="opacity-70">Scene 2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* footer marker */}
          <div className="aiA-item mt-6 flex items-center justify-between text-xs text-slate-400">
            <span className="tracking-[0.25em] uppercase">Scene</span>
            <span className="opacity-70">AI / Agents / CRM / ERM</span>
          </div>
        </div>
      </div>
    </section>
  );
}
