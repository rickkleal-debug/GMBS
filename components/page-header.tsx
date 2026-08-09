import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-5 border-b border-white/[0.055] pb-6 sm:mb-9">
      <div>
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-soft">
          <span className="h-px w-5 bg-gold" /> {eyebrow}
        </div>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-[-0.025em] text-ivory sm:text-[2.1rem]">{title}</h1>
      </div>
      {action}
    </div>
  );
}
