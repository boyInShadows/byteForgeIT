"use client";

export default function WebAppSection() {
  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Background video for Web/App section */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
      >
        <source src="/videos/v3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex items-center px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="space-y-4">
            <p className="font-mono text-xs md:text-sm text-bf-secondary uppercase tracking-[0.25em]">
              Web & App Design
            </p>
            <h2 className="font-display text-3xl md:text-5xl">
              Interfaces that feel fast, modern, and on-brand.
            </h2>
            <p className="text-slate-300 max-w-3xl">
              ByteForge designs and builds websites and applications that look
              sharp, load fast, and connect directly to your business goals.
              From landing pages to dashboards and full SaaS products, we take
              you from concept to production.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 text-sm text-slate-200">
            <div className="rounded-2xl bg-black/50 border border-bf-border p-4 backdrop-blur">
              <h3 className="font-display text-lg mb-2">Marketing & Brand</h3>
              <ul className="space-y-1 text-slate-300">
                <li>• High-converting landing pages</li>
                <li>• Brand-driven UI systems</li>
                <li>• Storytelling & visual hierarchy</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-black/50 border border-bf-border p-4 backdrop-blur">
              <h3 className="font-display text-lg mb-2">Web & Dashboards</h3>
              <ul className="space-y-1 text-slate-300">
                <li>• Next.js web apps</li>
                <li>• Admin & analytics dashboards</li>
                <li>• Role-based access & auth</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-black/50 border border-bf-border p-4 backdrop-blur">
              <h3 className="font-display text-lg mb-2">Product & UX</h3>
              <ul className="space-y-1 text-slate-300">
                <li>• User flows & wireframes</li>
                <li>• Figma design systems</li>
                <li>• Mobile-first responsive layouts</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-xs md:text-sm text-slate-300">
            <span className="px-3 py-1 rounded-full border border-bf-border bg-black/60">
              Next.js · React
            </span>
            <span className="px-3 py-1 rounded-full border border-bf-border bg-black/60">
              Tailwind · UI systems
            </span>
            <span className="px-3 py-1 rounded-full border border-bf-border bg-black/60">
              Figma to production
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
