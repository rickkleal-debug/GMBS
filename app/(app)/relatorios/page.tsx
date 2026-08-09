"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { IconDownload } from "@/components/icons";
import { comissaoValor, corretorPorId, corretores, negocios } from "@/lib/mock-data";
import { formatBRL, formatDate } from "@/lib/format";

const PERIODOS = [
  { valor: "todos", label: "Todo o período" },
  { valor: "2026-08", label: "Agosto 2026" },
  { valor: "2026-07", label: "Julho 2026" },
  { valor: "2026-06", label: "Junho 2026" },
  { valor: "2026-05", label: "Maio 2026" },
];

function exportarCSV(linhas: typeof negocios) {
  const cabecalho = ["Imóvel", "Bairro", "Cidade", "Corretor", "Valor", "Comissão %", "Comissão R$", "Fechamento", "Status"];
  const linhasCSV = linhas.map((n) => {
    const corretor = corretorPorId(n.corretorId);
    return [
      n.imovel,
      n.bairro,
      n.cidade,
      corretor?.nome ?? "",
      n.valorVenda.toFixed(2),
      n.comissaoPercentual,
      comissaoValor(n).toFixed(2),
      n.dataFechamento,
      n.statusPagamento,
    ].join(";");
  });
  const csv = [cabecalho.join(";"), ...linhasCSV].join("\n");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "relatorio-comissoes-gmbs.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export default function RelatoriosPage() {
  const [periodo, setPeriodo] = useState("todos");

  const linhas = useMemo(
    () => negocios.filter((n) => periodo === "todos" || n.dataFechamento.startsWith(periodo)),
    [periodo],
  );

  const totalVendido = linhas.reduce((s, n) => s + n.valorVenda, 0);
  const comissaoPaga = linhas.filter((n) => n.statusPagamento === "pago").reduce((s, n) => s + comissaoValor(n), 0);
  const comissaoPendente = linhas
    .filter((n) => n.statusPagamento === "pendente")
    .reduce((s, n) => s + comissaoValor(n), 0);

  const porCorretor = corretores
    .map((c) => {
      const deles = linhas.filter((n) => n.corretorId === c.id);
      const total = deles.reduce((s, n) => s + comissaoValor(n), 0);
      return { corretor: c, total, negocios: deles.length };
    })
    .filter((r) => r.negocios > 0)
    .sort((a, b) => b.total - a.total);

  const maiorValor = Math.max(1, ...porCorretor.map((r) => r.total));

  return (
    <div className="print:text-black">
      <div className="flex flex-wrap items-end justify-between gap-4 print:hidden">
        <PageHeader eyebrow="Exportação e histórico" title="Relatórios" />
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <select
          value={periodo}
          onChange={(e) => setPeriodo(e.target.value)}
          className="rounded-xl border border-white/[0.08] bg-panel-raised/80 px-4 py-2.5 text-sm text-ivory focus:border-gold/50"
        >
          {PERIODOS.map((p) => (
            <option key={p.valor} value={p.valor}>
              {p.label}
            </option>
          ))}
        </select>
        <div className="flex gap-2">
          <button
            onClick={() => exportarCSV(linhas)}
            className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-panel/70 px-4 py-2.5 text-sm text-slate transition-colors hover:border-gold/30 hover:text-gold-soft"
          >
            <IconDownload className="h-4 w-4" /> Exportar CSV
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-xl bg-gold px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(227,28,36,0.22)] hover:bg-gold-soft"
          >
            Imprimir / PDF
          </button>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total vendido" value={formatBRL(totalVendido)} />
        <StatCard label="Comissão paga" value={formatBRL(comissaoPaga)} accent />
        <StatCard label="Comissão pendente" value={formatBRL(comissaoPendente)} />
      </div>

      <div className="premium-card mb-8 rounded-2xl border border-white/[0.065] bg-panel/90 p-6">
        <h2 className="mb-5 font-display text-xl text-ivory">Comissão por corretor</h2>
        <div className="flex flex-col gap-4">
          {porCorretor.map((r) => (
            <div key={r.corretor.id}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="text-ivory">{r.corretor.nome}</span>
                <span className="tabular text-gold-soft">{formatBRL(r.total)}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-panel-raised">
                <div
                  className="h-full rounded-full bg-gold"
                  style={{ width: `${(r.total / maiorValor) * 100}%` }}
                />
              </div>
            </div>
          ))}
          {porCorretor.length === 0 && (
            <div className="py-6 text-center text-sm text-slate-dim">Sem negócios neste período.</div>
          )}
        </div>
      </div>

      <div className="premium-card overflow-x-auto rounded-2xl border border-white/[0.065] bg-panel/90">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-hairline text-left text-[11px] uppercase tracking-[0.1em] text-slate-dim">
              <th className="px-6 py-3 font-normal">Imóvel</th>
              <th className="px-4 py-3 font-normal">Corretor</th>
              <th className="px-4 py-3 font-normal text-right">Comissão</th>
              <th className="px-6 py-3 font-normal">Fechamento</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {linhas.map((n) => (
              <tr key={n.id}>
                <td className="px-6 py-3.5 text-ivory">{n.imovel}</td>
                <td className="px-4 py-3.5 text-slate">{corretorPorId(n.corretorId)?.nome}</td>
                <td className="tabular px-4 py-3.5 text-right text-ivory">{formatBRL(comissaoValor(n))}</td>
                <td className="px-6 py-3.5 text-slate-dim">{formatDate(n.dataFechamento)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
