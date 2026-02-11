"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function VideoSwapLayer({
  src,
  overlayClass = "bg-black/60",
  fadeDuration = 0.35,
}) {
  const aRef = useRef(null);
  const bRef = useRef(null);
  const activeRef = useRef("a");
  const lastSrcRef = useRef("");

  const getActive = () => (activeRef.current === "a" ? aRef.current : bRef.current);
  const getInactive = () => (activeRef.current === "a" ? bRef.current : aRef.current);

  const stop = (v) => {
    if (!v) return;
    try { v.pause(); } catch {}
  };

  useEffect(() => {
    if (!src) return;
    if (src === lastSrcRef.current) return;

    const active = getActive();
    const inactive = getInactive();
    if (!active || !inactive) return;

    lastSrcRef.current = src;

    stop(inactive);

    // load new source
    inactive.src = src;
    inactive.muted = true;
    inactive.playsInline = true;
    inactive.loop = true;
    inactive.preload = "auto";
    inactive.load();

    const onReady = () => {
      inactive.removeEventListener("canplay", onReady);
      inactive.removeEventListener("loadeddata", onReady);

      // Show even if play() is blocked (still displays first frame)
      gsap.set(inactive, { opacity: 0, zIndex: 1 });
      gsap.set(active, { opacity: 1, zIndex: 0 });

      const p = inactive.play();
      if (p && typeof p.catch === "function") p.catch(() => {});

      gsap.to(inactive, {
        opacity: 1,
        duration: fadeDuration,
        ease: "power1.out",
        onComplete: () => {
          stop(active);
          activeRef.current = activeRef.current === "a" ? "b" : "a";
        },
      });
    };

    inactive.addEventListener("canplay", onReady);
    inactive.addEventListener("loadeddata", onReady);

    if (inactive.readyState >= 2) onReady();

    return () => {
      inactive?.removeEventListener("canplay", onReady);
      inactive?.removeEventListener("loadeddata", onReady);
    };
  }, [src, fadeDuration]);

  return (
    // NOTE: z-0 (NOT negative). Content should be z-10.
    <div className="absolute inset-0 z-0 overflow-hidden">
      <video
        ref={aRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
      />
      <video
        ref={bRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
      />
      <div className={`absolute inset-0 ${overlayClass}`} />
    </div>
  );
}
