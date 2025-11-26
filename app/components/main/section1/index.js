"use client";

export default function HeroSection() {
  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
      >
        <source src="/videos/v1.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center">
        <span className="font-mono text-xs md:text-sm tracking-[0.25em] uppercase text-bf-secondary mb-4">
          ByteForge · Web & App · Managed IT
        </span>

        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold mb-6 max-w-4xl">
          Web & App Design + Managed IT that just works.
        </h1>

        <p className="max-w-xl text-base md:text-lg text-slate-200/85 mb-8">
          US-based support for businesses that want beautiful digital
          experiences and rock-solid IT infrastructure—with one team
          handling both.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button className="px-6 py-3 rounded-xl bg-bf-primary text-black font-semibold shadow-lg shadow-emerald-500/30">
            Schedule a Strategy Call
          </button>
          <button className="px-6 py-3 rounded-xl border border-white/15 bg-black/60 font-medium text-slate-100">
            View Services
          </button>
        </div>
      </div>
    </section>
  );
}
