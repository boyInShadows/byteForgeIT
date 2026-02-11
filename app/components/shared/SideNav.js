"use client";

export default function SideNav({ step, items = [] }) {
  const go = (targetStep) => {
    window.dispatchEvent(
      new CustomEvent("bf:gotoStep", { detail: { step: targetStep } })
    );
  };

  return (
    <aside className="fixed right-6 top-1/2 -translate-y-1/2 z-[998]">
      <div
        className="
          group
          w-14
          max-h-[70vh]
          overflow-hidden
          rounded-2xl
          border border-white/10
          bg-transparent
          backdrop-blur
          transition
          duration-300
          hover:bg-black/15
          hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),inset_0_0_60px_rgba(0,0,0,0.35)]
        "
      >
        <nav
          className="
            max-h-[70vh]
            overflow-y-auto
            overscroll-contain
            py-3
            bf-sidenav-scroll
          "
        >
          <ul className="flex flex-col items-center gap-2 px-2">
            {items.map((it) => {
              const active = step === it.step;

              return (
                <li key={it.step} className="w-full">
                  <button
                    type="button"
                    onClick={() => go(it.step)}
                    title={it.label}
                    aria-label={it.label}
                    className={[
                      "w-full",
                      "h-11",
                      "rounded-xl",
                      "grid",
                      "place-items-center",
                      "transition",
                      "duration-200",
                      "relative",
                      "border",
                      active
                        ? "border-emerald-300/30 bg-emerald-500/10"
                        : "border-white/0 bg-transparent hover:border-emerald-300/20 hover:bg-white/5",
                      // neon effect on hover / active
                      active
                        ? "shadow-[0_0_22px_rgba(16,185,129,0.35)]"
                        : "hover:shadow-[0_0_22px_rgba(16,185,129,0.28)]",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "transition",
                        "duration-200",
                        active ? "text-bf-primary" : "text-slate-200",
                        "group-hover:text-slate-100",
                      ].join(" ")}
                    >
                      {it.icon}
                    </span>

                    {/* tiny active indicator */}
                    {/* <span
                      className={[
                        "absolute",
                        "right-1.5",
                        "top-1/2",
                        "-translate-y-1/2",
                        "h-1.5",
                        "w-1.5",
                        "rounded-full",
                        active ? "bg-bf-primary" : "bg-transparent",
                      ].join(" ")}
                    /> */}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
