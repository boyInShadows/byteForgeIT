"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import ScheduleCallModal from "../../shared/ScheduleCallModal";

export default function ServicesSection({ isActive }) {
  const [open, setOpen] = useState(false);

  const rootRef = useRef(null);
  const tlRef = useRef(null);

  // Build timeline once
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const leftItems = gsap.utils.toArray(".itL-item"); // left side items
      const rightBlocks = gsap.utils.toArray(".itR-block"); // infra, protection, buttons row

      // ---- Base states ----
      // Left: 3D tilt hidden
      gsap.set(leftItems, {
        opacity: 0,
        y: 18,
        rotateX: 14,
        transformPerspective: 900,
        transformOrigin: "center center",
        filter: "blur(10px)",
      });

      // Right: slide from outside-right
      gsap.set(rightBlocks, {
        opacity: 0,
        x: 160,
        rotateY: -8,
        transformPerspective: 1200,
        transformOrigin: "left center",
        filter: "blur(14px)",
      });

      const MASTER = 5.0;

      // Left timing (sequential total feel)
      const n = leftItems.length;
      const eachIn = 0.23;
      const durIn = Math.max(0.85, MASTER - eachIn * (n - 1));

      // Right timing: 3 blocks should end by 5s too
      // (we start them slightly after left begins, but still finish at MASTER)
      const rightStart = 0.8;
      const rightTotal = MASTER - rightStart;
      const rightEach = 0.18; // spacing between blocks
      const rightDur = Math.max(0.65, rightTotal - rightEach * (rightBlocks.length - 1));

      const tl = gsap.timeline({ paused: true });

      // LEFT IN (3D tilt sequential)
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

      // RIGHT IN (slide-in sequence, ends at same time)
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

      // Freeze at end (no auto fade)
      tl.eventCallback("onComplete", () => tl.pause(tl.duration()));

      tlRef.current = tl;
    }, root);

    return () => ctx.revert();
  }, []);

  // Play / reverse on section active
  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;

    tl.pause();

    if (isActive) {
      tl.progress(0).play(); // replay exactly like first time
    } else {
      if (tl.progress() > 0) tl.reverse(); // reverse out
    }
  }, [isActive]);

  return (
    <section ref={rootRef} className="relative h-screen overflow-hidden bg-black">
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
      >
        <source src="/videos/v2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/55 via-black/55 to-black/70" />

      {/* Content */}
      <div className="relative z-20 h-full flex items-center px-6">
        <div className="max-w-6xl mx-auto w-full">
          <div className="rounded-3xl border border-white/10 bg-black/35 backdrop-blur p-8 md:p-12 shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
            <div className="grid gap-10 lg:grid-cols-2">
              {/* LEFT */}
              <div className="space-y-7">
                {/* Line row */}
                <div className="itL-item flex flex-wrap items-center gap-3">
                  <span className="relative inline-flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-bf-primary opacity-40 animate-ping" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-bf-primary" />
                  </span>

                  <div className="inline-flex items-center rounded-full border border-white/10 bg-black/40 px-4 py-2 backdrop-blur">
                    <span className="text-[11px] md:text-xs font-mono uppercase tracking-[0.28em] text-slate-200">
                      Managed IT
                    </span>
                    <span className="mx-3 h-4 w-px bg-white/10" />
                    <span className="text-[11px] md:text-xs font-mono uppercase tracking-[0.28em] text-slate-300">
                      Cloud
                    </span>
                    <span className="mx-3 h-4 w-px bg-white/10" />
                    <span className="text-[11px] md:text-xs font-mono uppercase tracking-[0.28em] text-slate-300">
                      Security
                    </span>
                  </div>

                  <div className="hidden md:flex items-center gap-2 text-xs text-slate-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                    <span>US-focused delivery for modern teams</span>
                  </div>
                </div>

                <h2 className="itL-item font-display text-3xl md:text-5xl max-w-xl leading-[1.05]">
                  End-to-end IT services that keep your{" "}
                  <span className="text-bf-primary">business running</span>.
                </h2>

                <p className="itL-item text-slate-300 max-w-xl leading-relaxed">
                  ByteForge provides reliable support, cloud management, and security
                  operations—so your team stays productive while your infrastructure stays
                  protected and scalable.
                </p>

                <div className="itL-item grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <div className="text-[11px] uppercase tracking-[0.25em] text-slate-400">
                      Support
                    </div>
                    <div className="mt-2 text-slate-100 font-semibold">
                      Fast response
                    </div>
                    <div className="mt-1 text-xs text-slate-300">
                      Remote + on-site workflows
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <div className="text-[11px] uppercase tracking-[0.25em] text-slate-400">
                      Security
                    </div>
                    <div className="mt-2 text-slate-100 font-semibold">
                      Layered controls
                    </div>
                    <div className="mt-1 text-xs text-slate-300">
                      Firewall, endpoint, identity
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <div className="text-[11px] uppercase tracking-[0.25em] text-slate-400">
                      Continuity
                    </div>
                    <div className="mt-2 text-slate-100 font-semibold">
                      Backup-ready
                    </div>
                    <div className="mt-1 text-xs text-slate-300">
                      Restore testing included
                    </div>
                  </div>
                </div>

                <div className="itL-item flex flex-wrap gap-2 pt-1">
                  {[
                    "Helpdesk Support",
                    "Remote Support",
                    "Microsoft 365",
                    "Cloud (AWS/Azure/GCP)",
                    "Backup & Recovery",
                    "Firewalls & AV",
                  ].map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full border border-white/10 bg-black/35 text-[11px] md:text-xs text-slate-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* RIGHT */}
              <div className="space-y-4">
                {/* 1 */}
                <div className="itR-block rounded-2xl border border-white/10 bg-black/30 p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-200 font-semibold">
                      Infrastructure
                    </div>
                    <span className="text-[11px] text-slate-400 uppercase tracking-[0.22em]">
                      Core systems
                    </span>
                  </div>

                  <ul className="mt-4 text-sm text-slate-300 space-y-2">
                    <li>• Active Directory, DHCP, Printer Servers</li>
                    <li>• Switch deployment & network optimization</li>
                    <li>• Virtualization (VMware / Hyper-V)</li>
                    <li>• IP Camera systems</li>
                  </ul>
                </div>

                {/* 2 */}
                <div className="itR-block rounded-2xl border border-white/10 bg-black/30 p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-200 font-semibold">
                      Protection
                    </div>
                    <span className="text-[11px] text-slate-400 uppercase tracking-[0.22em]">
                      Risk reduction
                    </span>
                  </div>

                  <ul className="mt-4 text-sm text-slate-300 space-y-2">
                    <li>• Firewall configuration & monitoring</li>
                    <li>• Antivirus / endpoint policy management</li>
                    <li>• Backup strategy + restore testing</li>
                  </ul>
                </div>

                {/* 3 (buttons row) */}
                <div className="itR-block flex gap-3 pt-2">
                  <button
                    onClick={() => setOpen(true)}
                    className="px-6 py-3 rounded-xl bg-bf-primary text-black font-semibold shadow-lg shadow-emerald-500/25 ring-1 ring-emerald-300/30 hover:ring-emerald-200/50 transition"
                  >
                    Schedule a Call
                  </button>

                  <button
                    onClick={() =>
                      window.dispatchEvent(new CustomEvent("bf:gotoStep", { detail: { step: 7 } }))
                    }
                    className="px-6 py-3 rounded-xl border border-white/15 bg-black/30 text-slate-100 hover:bg-black/40 transition"
                  >
                    View Services
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="itL-item mt-6 flex items-center justify-between text-xs text-slate-400">
            <span className="opacity-80 tracking-[0.22em] uppercase">
              Managed IT Services
            </span>
          </div>
        </div>
      </div>

      <ScheduleCallModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
