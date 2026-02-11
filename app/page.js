"use client";

import { useRef, useState, useEffect } from "react";

// Components
import HeroSection from "./components/main/sectionHero";
import BrandInterlude from "./components/main/interlude";
import ServicesSection from "./components/main/sectionServices";
import WebSection from "./components/main/sectionWeb";
import FinalSection from "./components/main/sectionFinal";
import SideNav from "./components/shared/SideNav";
import AISection from "./components/main/sectionAI";
import ScheduleCallModal from "./components/shared/ScheduleCallModal";
// Hooks
import { useFullpageScroll } from "./hooks/useFullPageScroll";

const navItems = [
  {
    step: 0,
    label: "Home",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 10.5 12 4l8 6.5V20a2 2 0 0 1-2 2h-4v-6H10v6H6a2 2 0 0 1-2-2v-9.5Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    ),
  },
  {
    step: 1,
    label: "Interlude",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 7h16M4 12h16M4 17h10"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    step: 2,
    label: "Web/App Studio",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 5h16v14H4V5Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M4 9h16"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M7 13h6M7 16h9"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    step: 3,
    label: "AI Systems",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M9 3h6v4H9V3Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M7 7h10v14H7V7Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M10 11h4M10 15h4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },

  {
    step: 4,
    label: "Managed IT",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 6h16v10H4V6Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M8 20h8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    step: 5,
    label: "Contact",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 6h16v12H4V6Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="m4 7 8 6 8-6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];



export default function Home() {

  const [contactOpen, setContactOpen] = useState(false);

  const heroRef = useRef(null);
  const interludeRef = useRef(null);
  const aiRef = useRef(null);
  const webRef = useRef(null);
  const itRef = useRef(null);
  const finalRef = useRef(null);
  // const servicesRef = useRef(null);
  // const securityRef = useRef(null);
  // const aboutRef = useRef(null);
  // const servicesGridRef = useRef(null);
  // const proofRef = useRef(null);
  // const contactRef = useRef(null);
  const maxStep = 5;

  const { step, goToStep } = useFullpageScroll({
    maxStep,
    duration: 2,
    cooldown: 1,
    getTargetY: (s) => {
      if (s === 0) return heroRef.current?.offsetTop ?? 0;
      if (s === 1) return interludeRef.current?.offsetTop ?? window.innerHeight;
      if (s === 2) return webRef.current?.offsetTop ?? window.innerHeight * 2;
      if (s === 3) return aiRef.current?.offsetTop ?? window.innerHeight * 3;
      if (s === 4) return itRef.current?.offsetTop ?? window.innerHeight * 4;
      if (s === 5) return finalRef.current?.offsetTop ?? window.innerHeight * 5;
      return 0;
    },
  });
  

  useEffect(() => {
    const onGotoStep = (e) => {
      const next = Number(e?.detail?.step);
      if (Number.isNaN(next)) return;
      goToStep(next);
    };
  
    const onOpenContact = () => setContactOpen(true);
  
    window.addEventListener("bf:gotoStep", onGotoStep);
    window.addEventListener("bf:openContact", onOpenContact);
  
    return () => {
      window.removeEventListener("bf:gotoStep", onGotoStep);
      window.removeEventListener("bf:openContact", onOpenContact);
    };
  }, [goToStep]);

  return (
    <main className="min-h-screen bg-bf-bg text-slate-100">
<SideNav step={step} items={navItems} />
<div ref={heroRef}><HeroSection isActive={step === 0} /></div>
<div ref={interludeRef}><BrandInterlude isActive={step === 1} /></div>

<div ref={webRef}><WebSection isActive={step === 2} /></div>
<div ref={aiRef}>
  <AISection isActive={step === 3} />
</div>

<div ref={itRef}><ServicesSection isActive={step === 4}/></div>
<div ref={finalRef}><FinalSection isActive={step === 5} /></div>

<ScheduleCallModal open={contactOpen} onClose={() => setContactOpen(false)} />

    </main>
  );
}
