import type { ReactNode } from "react";

export function StatCard({
  label,
  value,
  sublabel,
  accent = false,
  icon,
}: {
  label: string;
  value: string;
  sublabel?: string;
  accent?: boolean;
  icon?: ReactNode;
}) {
  return (
    <div
      className={`premium-card rise overflow-hidden rounded-2xl border px-5 py-5 transition-colors ${
        accent ? "border-gold/25 bg-gradient-to-br from-gold/[0.105] to-panel-raised" : "border-white/[0.065] bg-panel/90 hover:border-white/[0.1]"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="text-[11px] uppercase tracking-[0.14em] text-slate-dim">{label}</div>
        {icon}
      </div>
      <div
        className={`tabular mt-3 font-display text-xl font-semibold tracking-[-0.035em] sm:text-[1.8rem] ${accent ? "text-gold-soft" : "text-ivory"}`}
      >
        {value}
      </div>
      {sublabel && <div className="mt-1 text-xs text-slate">{sublabel}</div>}
    </div>
  );
}
