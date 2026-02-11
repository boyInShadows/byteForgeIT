"use client";

function Track({ items, ariaHidden }) {
  return (
    <div
      className="flex items-center whitespace-nowrap py-3 text-xs md:text-sm tracking-[0.35em] uppercase text-slate-200"
      aria-hidden={ariaHidden ? "true" : undefined}
    >
      {items.map((node, i) => (
        <span key={i} className="flex items-center">
          <span className="mx-6 inline-flex items-center gap-3">
            {node}
          </span>
          <span className="opacity-50">•</span>
        </span>
      ))}
    </div>
  );
}

export default function MarqueeRow({ items = [], reverse = false, speedClass = "" }) {
  const anim = reverse ? "animate-marqueeReverse" : "animate-marquee";

  return (
    <div className="overflow-hidden">
      <div className={`flex w-max ${anim} ${speedClass} motion-reduce:animate-none`}>
        <Track items={items} />
        <Track items={items} ariaHidden />
      </div>
    </div>
  );
}
