"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Avatar } from "@/components/avatar";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { StatusPagamentoPill } from "@/components/pill";
import { comissaoValor, corretorPorId, negocios as negociosIniciais } from "@/lib/mock-data";
import { formatBRL, formatDate } from "@/lib/format";
import type { StatusPagamento } from "@/lib/types";

export default function PagamentosPage() {
  const [status, setStatus] = useState<Record<string, StatusPagamento>>(() =>
    Object.fromEntries(negociosIniciais.map((n) => [n.id, n.statusPagamento])),
  );

  const negocios = negociosIniciais.map((n) => ({ ...n, statusPagamento: status[n.id] }));
  const pendentes = negocios
    .filter((n) => n.statusPagamento === "pendente")
    .sort((a, b) => (a.dataFechamento < b.dataFechamento ? 1 : -1));
  const pagos = negocios
    .filter((n) => n.statusPagamento === "pago")
    .sort((a, b) => (a.dataFechamento < b.dataFechamento ? 1 : -1));

  const totalPendente = useMemo(
    () => pendentes.reduce((s, n) => s + comissaoValor(n), 0),
    // The demo data is recreated on render; this memo remains intentionally local to the presentation layer.
    // eslint-disable-next-line react-hooks/preserve-manual-memoization
    [pendentes],
  );

  function marcarComoPago(id: string) {
    setStatus((prev) => ({ ...prev, [id]: "pago" }));
  }

  return (
    <div>
      <PageHeader eyebrow="Controle financeiro" title="Pagamentos de comissão" />

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Fila de pagamento" value={String(pendentes.length)} sublabel="negócios pendentes" accent />
        <StatCard label="Total a pagar" value={formatBRL(totalPendente)} />
        <StatCard label="Pago no total" value={formatBRL(pagos.reduce((s, n) => s + comissaoValor(n), 0))} />
      </div>

      <h2 className="mb-3 font-display text-xl text-ivory">Aguardando pagamento</h2>
      <div className="premium-card mb-10 overflow-hidden rounded-2xl border border-white/[0.065] bg-panel/90">
        <div className="divide-y divide-hairline">
          {pendentes.map((n) => {
            const corretor = corretorPorId(n.corretorId);
            return (
              <div key={n.id} className="flex flex-wrap items-center gap-4 px-6 py-4">
                {corretor && (
                  <Link href={`/corretores/${corretor.id}`} className="flex items-center gap-2 hover:text-gold-soft">
                    <Avatar iniciais={corretor.iniciais} size="sm" />
                    <span className="w-32 truncate text-sm text-ivory">{corretor.nome}</span>
                  </Link>
                )}
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm text-ivory">{n.imovel}</div>
                  <div className="truncate text-xs text-slate-dim">fechado em {formatDate(n.dataFechamento)}</div>
                </div>
                <div className="tabular w-28 text-right text-sm text-gold">{formatBRL(comissaoValor(n))}</div>
                <button
                  onClick={() => marcarComoPago(n.id)}
                  className="rounded-xl border border-gold/30 bg-gold/[0.06] px-3.5 py-2 text-xs font-medium text-gold-soft transition-colors hover:bg-gold hover:text-white"
                >
                  Marcar como pago
                </button>
              </div>
            );
          })}
          {pendentes.length === 0 && (
            <div className="px-6 py-10 text-center text-sm text-slate-dim">
              Tudo pago — nenhuma comissão pendente no momento.
            </div>
          )}
        </div>
      </div>

      <h2 className="mb-3 font-display text-xl text-ivory">Histórico de pagamentos</h2>
      <div className="premium-card overflow-hidden rounded-2xl border border-white/[0.065] bg-panel/90">
        <div className="divide-y divide-hairline">
          {pagos.map((n) => {
            const corretor = corretorPorId(n.corretorId);
            return (
              <div key={n.id} className="flex flex-wrap items-center gap-4 px-6 py-3.5">
                {corretor && (
                  <div className="flex w-40 items-center gap-2 truncate text-sm text-slate">
                    <Avatar iniciais={corretor.iniciais} size="sm" />
                    {corretor.nome}
                  </div>
                )}
                <div className="min-w-0 flex-1 truncate text-sm text-slate">{n.imovel}</div>
                <div className="tabular w-28 text-right text-sm text-ivory">{formatBRL(comissaoValor(n))}</div>
                <div className="w-28 text-right text-xs text-slate-dim">
                  {n.dataPagamento ? formatDate(n.dataPagamento) : "—"}
                </div>
                <div className="w-20">
                  <StatusPagamentoPill status="pago" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
