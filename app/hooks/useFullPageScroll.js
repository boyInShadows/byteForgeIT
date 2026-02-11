"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollToPlugin);

export function useFullpageScroll({
  maxStep = 0,
  duration = 1.2,
  cooldown = 0.7,
  getTargetY,
}) {
  const [step, setStep] = useState(0);

  const stepRef = useRef(0);
  const isAnimatingRef = useRef(false);

  const goToStep = (nextStep) => {
    if (isAnimatingRef.current) return;
    if (nextStep < 0 || nextStep > maxStep) return;
    if (nextStep === stepRef.current) return;

    const targetY = getTargetY(nextStep);

    stepRef.current = nextStep;
    setStep(nextStep);

    isAnimatingRef.current = true;

    gsap.to(window, {
      duration,
      scrollTo: { y: targetY, autoKill: false },
      ease: "power2.inOut",
      onComplete: () => {
        setTimeout(() => {
          isAnimatingRef.current = false;
        }, cooldown * 1000);
      },
    });
  };

  useEffect(() => {
    const onWheel = (e) => {
      // block default scrolling always
      e.preventDefault();

      if (isAnimatingRef.current) return;

      const dy = e.deltaY;
      if (Math.abs(dy) < 10) return;

      const dir = dy > 0 ? 1 : -1;
      const next = stepRef.current + dir;

      goToStep(next);
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  // optional: sync state if user uses scrollbar (we'll disable scrollbar later)
  useEffect(() => {
    const onKey = (e) => {
      if (isAnimatingRef.current) return;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        goToStep(stepRef.current + 1);
      }
      if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goToStep(stepRef.current - 1);
      }
    };

    window.addEventListener("keydown", onKey, { passive: false });
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return { step, goToStep };
}
