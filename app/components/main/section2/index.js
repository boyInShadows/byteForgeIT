"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ServicesSection({ activePart }) {
  const videoRef = useRef(null);
  const part0Ref = useRef(null);
  const part1Ref = useRef(null);
  const initializedRef = useRef(false);
  const prevPartRef = useRef(activePart);

  const videoDurationRef = useRef(0);
  const segmentTimeoutRef = useRef(null);

  // Load video duration once
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoaded = () => {
      if (!isNaN(video.duration) && video.duration > 0) {
        videoDurationRef.current = video.duration;
      } else {
        // fallback if metadata is weird
        videoDurationRef.current = 4;
      }
    };

    if (video.readyState >= 1) {
      onLoaded();
    } else {
      video.addEventListener("loadedmetadata", onLoaded);
    }

    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
    };
  }, []);

  // Handle part change: content crossfade + video segment playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !part0Ref.current || !part1Ref.current) return;

    const totalDuration = videoDurationRef.current || 4;
    const segmentDuration = totalDuration / 2;
    const startTime = activePart * segmentDuration;

    // --- CONTENT ANIMATION ---

    if (!initializedRef.current) {
      // first render: just set visibility
      if (activePart === 0) {
        gsap.set(part0Ref.current, {
          opacity: 1,
          y: 0,
          pointerEvents: "auto",
        });
        gsap.set(part1Ref.current, {
          opacity: 0,
          y: 20,
          pointerEvents: "none",
        });
      } else {
        gsap.set(part0Ref.current, {
          opacity: 0,
          y: 20,
          pointerEvents: "none",
        });
        gsap.set(part1Ref.current, {
          opacity: 1,
          y: 0,
          pointerEvents: "auto",
        });
      }
      initializedRef.current = true;
      prevPartRef.current = activePart;
    } else if (prevPartRef.current !== activePart) {
      const fromRef = prevPartRef.current === 0 ? part0Ref : part1Ref;
      const toRef = activePart === 0 ? part0Ref : part1Ref;

      if (fromRef.current) {
        gsap.to(fromRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.4,
          ease: "power2.out",
          pointerEvents: "none",
        });
      }

      if (toRef.current) {
        gsap.fromTo(
          toRef.current,
          { opacity: 0, y: -20, pointerEvents: "none" },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            pointerEvents: "auto",
          }
        );
      }

      prevPartRef.current = activePart;
    }

    // --- VIDEO SEGMENT PLAYBACK ---

    try {
      video.currentTime = startTime;
    } catch (e) {
      // ignore seek issues if not ready
    }

    if (segmentTimeoutRef.current) {
      clearTimeout(segmentTimeoutRef.current);
    }

    video.muted = true;

    video
      .play()
      .then(() => {
        // play just this segment, then pause
        segmentTimeoutRef.current = setTimeout(() => {
          video.pause();
        }, segmentDuration * 1000);
      })
      .catch(() => {
        // autoplay might be blocked; we already have the still frame
      });

    return () => {
      if (segmentTimeoutRef.current) {
        clearTimeout(segmentTimeoutRef.current);
      }
    };
  }, [activePart]);

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Background video – controlled by JS, not looping */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        muted
        playsInline
        preload="auto"
      >
        <source src="/videos/v2.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Content overlay */}
      <div className="relative z-20 h-full flex items-center px-4">
        <div className="max-w-5xl mx-auto relative h-[70vh]">
          {/* PART 1 */}
          <div
            ref={part0Ref}
            className="absolute inset-0 flex items-center"
          >
            <div className="space-y-6">
              <p className="font-mono text-xs md:text-sm text-bf-secondary uppercase tracking-[0.2em]">
                Part 1 · Managed IT · Cloud · Security
              </p>
              <h2 className="font-display text-3xl md:text-5xl max-w-3xl">
                We keep your business online, secure, and supported.
              </h2>
              <p className="text-slate-300 max-w-2xl">
                ByteForge handles the day-to-day IT so your team doesn’t have to.
                Helpdesk, cloud, security, networking, and backup handled by one
                reliable partner.
              </p>
              <div className="text-4xl md:text-5xl font-display text-bf-primary/60">
                PART 1
              </div>
            </div>
          </div>

          {/* PART 2 */}
          <div
            ref={part1Ref}
            className="absolute inset-0 flex items-center"
          >
            <div className="space-y-6">
              <p className="font-mono text-xs md:text-sm text-bf-secondary uppercase tracking-[0.2em]">
                Part 2 · What&apos;s included
              </p>
              <h2 className="font-display text-3xl md:text-5xl max-w-3xl">
                A full stack of IT services, bundled into one team.
              </h2>
              <p className="text-slate-300 max-w-2xl">
                From helpdesk to cloud, from firewalls to IP cameras, we design
                and maintain the full infrastructure so your employees can just
                work.
              </p>
              <div className="grid gap-4 md:grid-cols-3 text-sm text-slate-200 max-w-4xl">
                <ul className="space-y-1">
                  <li>• Helpdesk Support</li>
                  <li>• Remote Support</li>
                  <li>• Microsoft 365</li>
                </ul>
                <ul className="space-y-1">
                  <li>• Cloud Services (AWS / Azure / GCP)</li>
                  <li>• Backup Solutions</li>
                  <li>• Virtualization</li>
                </ul>
                <ul className="space-y-1">
                  <li>• Firewall & Antivirus</li>
                  <li>• AD, DHCP, Printer Servers</li>
                  <li>• Switches & IP Cameras</li>
                </ul>
              </div>
              <div className="text-4xl md:text-5xl font-display text-bf-primary/60">
                PART 2
              </div>
            </div>
          </div>

          {/* Part indicator */}
          <div className="absolute bottom-6 left-0 inline-flex items-center space-x-3 rounded-full bg-black/60 border border-white/10 px-4 py-2 backdrop-blur">
            <span className="w-3 h-3 rounded-full bg-bf-primary" />
            <span className="text-xs md:text-sm font-medium text-gray-200">
              Part {activePart + 1} / 2
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
