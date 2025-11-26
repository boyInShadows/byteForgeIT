"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

import HeroSection from "./components/main/section1";
import ServicesSection from "./components/main/section2";
import WebAppSection from "./components/main/section3";

export default function Home() {
  const heroWrapperRef = useRef(null);
  const servicesWrapperRef = useRef(null);
  const webWrapperRef = useRef(null);

  // 0 = Hero
  // 1 = Section2 Part 1
  // 2 = Section2 Part 2
  // 3 = Section3 (Web/App)
  const [step, setStep] = useState(0);
  const stepRef = useRef(0);
  const isAnimatingRef = useRef(false);

  const MAX_STEP = 3;

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollToPlugin);
    }

    const handleWheel = (e) => {
      const deltaY = e.deltaY;

      if (Math.abs(deltaY) < 10) return;

      if (isAnimatingRef.current) {
        e.preventDefault();
        return;
      }

      const direction = deltaY > 0 ? 1 : -1;
      let nextStep = stepRef.current + direction;

      if (nextStep < 0 || nextStep > MAX_STEP) {
        return;
      }

      e.preventDefault();

      if (nextStep === stepRef.current) return;

      stepRef.current = nextStep;
      setStep(nextStep);

      const heroEl = heroWrapperRef.current;
      const servicesEl = servicesWrapperRef.current;
      const webEl = webWrapperRef.current;

      let targetY = 0;

      if (nextStep === 0) {
        targetY = heroEl ? heroEl.offsetTop : 0;
      } else if (nextStep === 1 || nextStep === 2) {
        targetY = servicesEl ? servicesEl.offsetTop : window.innerHeight;
      } else if (nextStep === 3) {
        targetY = webEl ? webEl.offsetTop : window.innerHeight * 2;
      }

      isAnimatingRef.current = true;

      gsap.to(window, {
        duration: 1,
        scrollTo: { y: targetY, autoKill: false },
        ease: "power2.inOut",
        onComplete: () => {
          setTimeout(() => {
            isAnimatingRef.current = false;
          }, 300);
        },
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // Section2 part:
  // step 1 => Part 1
  // step 2+ => Part 2 (when we’re leaving it, it can stay on Part2)
  const activePartForServices = step <= 1 ? 0 : 1;

  return (
    <main className="min-h-screen bg-bf-bg text-slate-100">
      <div ref={heroWrapperRef}>
        <HeroSection />
      </div>

      <div ref={servicesWrapperRef}>
        <ServicesSection activePart={activePartForServices} />
      </div>

      <div ref={webWrapperRef}>
        <WebAppSection />
      </div>
    </main>
  );
}
