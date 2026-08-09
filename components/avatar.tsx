export function Avatar({ iniciais, size = "md" }: { iniciais: string; size?: "sm" | "md" | "lg" }) {
  const dims = size === "lg" ? "h-12 w-12 text-base" : size === "sm" ? "h-7 w-7 text-[10px]" : "h-9 w-9 text-xs";
  return (
    <div
      className={`flex ${dims} shrink-0 items-center justify-center rounded-xl border border-gold/15 bg-gradient-to-br from-gold/[0.12] to-panel-raised font-mono text-gold-soft shadow-[inset_0_1px_rgba(255,255,255,0.04)]`}
    >
      {iniciais}
    </div>
  );
}
