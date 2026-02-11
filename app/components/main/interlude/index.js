"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import MarqueeRow from "../../shared/MarqueeRow";
import Lottie from "lottie-react";
import circuitAnim from "@/public/lottie/circuit.json";

function BrandChip({ name, svg }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] md:text-xs text-slate-200 shadow-[0_0_18px_rgba(0,0,0,0.3)]">
      {svg ? (
        <Image src={svg} alt={name} width={12} height={12} className="h-3 w-auto opacity-90" />
      ) : (
        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
      )}
      <span className="tracking-[0.18em] uppercase">{name}</span>
    </span>
  );
}

export default function BrandInterlude({ isActive }) {
  const rootRef = useRef(null);
  const tlRef = useRef(null);

  const services = [
    "Helpdesk",
    "Cloud",
    "Security",
    "Backup",
    "Networks",
    "Web Design",
    "App Development",
    "Microsoft 365",
    "VoIP",
    "Virtualization",
    "AI Agents",
    "CRM/ERM",
  ];

  const brands = [
    <BrandChip key="apple" name="Apple" svg="/SVG/Apple.svg" />,
    <BrandChip key="google" name="Google" svg="/SVG/Google.svg" />,
    <BrandChip key="microsoft" name="Microsoft" svg="/SVG/Microsoft.svg" />,
    <BrandChip key="amazon" name="Amazon" svg="/SVG/Amazon.svg" />,
    <BrandChip key="openai" name="OpenAI" svg="/SVG/OpenAI.svg" />,
    <BrandChip key="nvidia" name="NVIDIA" svg="/SVG/Nvidia.svg" />,
    <BrandChip key="cisco" name="Cisco" svg="/SVG/Cisco.svg" />,
    <BrandChip key="vmware" name="N8N" svg="/SVG/N8N.svg"/>,
    <BrandChip key="stripe" name="Stripe" svg="/SVG/Stripe.svg" />,
    <BrandChip key="twilio" name="Twilio" svg="/SVG/Twilio.svg" />,
  ];

  const serviceNodes = services.map((t) => (
    <span
      key={t}
      className="text-slate-100/90 hover:text-bf-primary transition drop-shadow-[0_0_14px_rgba(16,185,129,0.14)]"
    >
      {t}
    </span>
  ));

  // Build timeline once
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
  
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".interlude-item");
  
      // Hidden base state
      gsap.set(items, {
        opacity: 0,
        y: 18,
        rotateX: 14,
        transformPerspective: 900,
        transformOrigin: "center center",
        filter: "blur(10px)",
      });
  
      gsap.set(".interlude-band", {
        opacity: 0,
        scale: 0.985,
        filter: "blur(8px)",
      });
  
      gsap.set(".interlude-lottie", {
        opacity: 0,
        scale: 0.985,
        filter: "blur(10px)",
      });
  
      const TOTAL_IN = 5.0;
      const n = items.length;
      const eachIn = 0.25;
      const durIn = Math.max(0.5, TOTAL_IN - eachIn * (n - 1));
  
      const tl = gsap.timeline({ paused: true });
  
      // Band in
      tl.to(
        ".interlude-band",
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "back.out(1.05)",
        },
        0
      );
  
      // Lottie in
      tl.to(
        ".interlude-lottie",
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.0,
          ease: "back.out(1.05)",
        },
        0.15
      );
  
      // Text in
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
        0.35
      );
  
      // Freeze at end (never auto-continue)
      tl.eventCallback("onComplete", () => {
        tl.pause(tl.duration());
      });
  
      tlRef.current = tl;
    }, root);
  
    return () => ctx.revert();
  }, []);
  

  // Play in/out on active changes
  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
  
    // prevent “half states” if user jumps fast
    tl.pause();
  
    if (isActive) {
      // always replay entrance EXACTLY like first time
      tl.progress(0).play();
    } else {
      // reverse back to hidden state
      if (tl.progress() > 0) tl.reverse();
    }
  }, [isActive]);
  
  
  

  return (
    <section ref={rootRef} className="relative isolate h-screen overflow-hidden bg-bf-bg">
      {/* Background accents */}
      <div className="absolute inset-0">
        <div className="absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full bg-emerald-500/12 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-[520px] h-[520px] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(rgba(255,255,255,0.20)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* ✅ Center band + lottie background (animated) */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center" aria-hidden="true">
      <div className="interlude-band relative w-full max-w-6xl h-[46vh] rounded-[48px] bg-emerald-950/55 border border-white/10 shadow-[0_35px_140px_rgba(0,0,0,0.70)]">
      <div className="pointer-events-none absolute inset-0 rounded-[48px] bg-emerald-950/35 mix-blend-multiply" />
      <div className="pointer-events-none absolute inset-0 rounded-[48px] bg-black/25" />
                {/* lottie */}
                <div className="interlude-lottie absolute inset-0 opacity-[0.16] saturate-[0.75] brightness-[0.85] ">
                <div className="w-full h-full blur-[0px]">            
                  <Lottie
              animationData={circuitAnim}
              loop
              autoplay
              rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
            />
            </div>
          </div>

          {/* tint + fade */}
          <div className="absolute inset-0 rounded-[48px] mix-blend-screen bg-bf-primary/10" />
          <div className="absolute inset-0 rounded-[48px] mix-blend-screen bg-cyan-400/5" />
          <div className="absolute inset-0 rounded-[48px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_82%,transparent_100%)] bg-black/0" />
          <div className="absolute inset-0 rounded-[48px] [box-shadow:inset_0_0_220px_rgba(0,0,0,0.78)]" />

        </div>
      </div>

      {/* Marquees stay above the band */}
      <div className="absolute top-10 left-0 right-0 z-30">
        <div className="border-y border-white/10 bg-black/20 backdrop-blur">
          <MarqueeRow items={serviceNodes} reverse={false} speedClass="animate-[marquee_16s_linear_infinite]" />
        </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 z-30">
        <div className="border-y border-white/10 bg-black/20 backdrop-blur">
          <MarqueeRow items={brands} reverse speedClass="animate-[marqueeReverse_20s_linear_infinite]" />
        </div>
      </div>

      {/* Center identity */}
      <div className="relative z-20 h-full flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <div className="interlude-item inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/35 px-6 py-3 backdrop-blur shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_25px_90px_rgba(0,0,0,0.55)]">
            <span className="relative inline-flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-bf-primary opacity-40 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-bf-primary" />
            </span>

            <span className="text-sm md:text-base font-semibold tracking-tight text-slate-100">
              ByteForge
            </span>

            <span className="hidden md:inline text-xs uppercase tracking-[0.25em] text-slate-300/80">
              AI · Web/App · IT
            </span>
          </div>

          <p className="interlude-item mt-5 text-slate-100/85 text-sm md:text-base leading-relaxed font-medium">
            A single partner for intelligent automation, premium product development,
            and reliable IT operations.
          </p>

          <div className="interlude-item mt-5 text-xs text-slate-200/70 tracking-[0.30em] uppercase font-medium">
            Scroll to continue
          </div>
        </div>
      </div>
    </section>
  );
}
