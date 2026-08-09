import { IconCheck, IconClock } from "./icons";

export function StatusPagamentoPill({ status }: { status: "pago" | "pendente" }) {
  if (status === "pago") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-ok/15 bg-ok-dim/80 px-2.5 py-1 text-[11px] font-medium text-ok">
        <IconCheck className="h-3 w-3" /> Pago
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/25 bg-gold/[0.07] px-2.5 py-1 text-[11px] font-medium text-gold-soft">
      <IconClock className="h-3 w-3" /> Pendente
    </span>
  );
}

export function StatusCorretorPill({ status }: { status: "ativo" | "inativo" }) {
  if (status === "ativo") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-ok">
        <span className="h-1.5 w-1.5 rounded-full bg-ok" /> Ativo
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-slate-dim">
      <span className="h-1.5 w-1.5 rounded-full bg-slate-dim" /> Inativo
    </span>
  );
}
