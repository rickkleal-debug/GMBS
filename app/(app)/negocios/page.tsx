"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { IconPlus } from "@/components/icons";
import { StatusPagamentoPill } from "@/components/pill";
import { Avatar } from "@/components/avatar";
import { comissaoValor, corretorPorId, negocios } from "@/lib/mock-data";
import { formatBRL, formatDate } from "@/lib/format";

type Filtro = "todos" | "pago" | "pendente";

export default function NegociosPage() {
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState<Filtro>("todos");

  const linhas = useMemo(() => {
    return [...negocios]
      .sort((a, b) => (a.dataFechamento < b.dataFechamento ? 1 : -1))
      .filter((n) => (filtro === "todos" ? true : n.statusPagamento === filtro))
      .filter((n) => n.imovel.toLowerCase().includes(busca.toLowerCase()));
  }, [busca, filtro]);

  const totalComissao = linhas.reduce((s, n) => s + comissaoValor(n), 0);

  return (
    <div>
      <PageHeader
        eyebrow={`${negocios.length} negócios registrados`}
        title="Negócios"
        action={
          <Link
            href="/negocios/novo"
            className="flex items-center gap-2 rounded-xl bg-gold px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(227,28,36,0.22)] transition-all hover:-translate-y-0.5 hover:bg-gold-soft"
          >
            <IconPlus className="h-4 w-4" /> Lançar negócio
          </Link>
        }
      />

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por imóvel…"
            className="w-full max-w-xs rounded-xl border border-white/[0.08] bg-panel-raised/80 px-4 py-2.5 text-sm text-ivory shadow-inner shadow-black/10 placeholder:text-slate-dim transition-colors focus:border-gold/50"
          />
          <div className="flex gap-1 rounded-xl border border-white/[0.07] bg-panel p-1.5">
            {(["todos", "pendente", "pago"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className={`rounded-md px-3 py-1.5 text-xs capitalize transition-colors ${
                  filtro === f ? "bg-panel-raised text-gold" : "text-slate hover:text-ivory"
                }`}
              >
                {f === "todos" ? "Todos" : f}
              </button>
            ))}
          </div>
        </div>
        <div className="text-sm text-slate">
          Comissão no filtro: <span className="tabular text-gold-soft">{formatBRL(totalComissao)}</span>
        </div>
      </div>

      <div className="premium-card overflow-x-auto rounded-2xl border border-white/[0.065] bg-panel/90">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-hairline text-left text-[11px] uppercase tracking-[0.1em] text-slate-dim">
              <th className="px-6 py-3 font-normal">Imóvel</th>
              <th className="px-4 py-3 font-normal">Corretor</th>
              <th className="px-4 py-3 font-normal text-right">Valor</th>
              <th className="px-4 py-3 font-normal text-right">Comissão</th>
              <th className="px-4 py-3 font-normal">Fechamento</th>
              <th className="px-6 py-3 font-normal">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {linhas.map((n) => {
              const corretor = corretorPorId(n.corretorId);
              return (
                <tr key={n.id} className="transition-colors hover:bg-panel-raised/40">
                  <td className="px-6 py-4">
                    <div className="text-ivory">{n.imovel}</div>
                    <div className="text-xs text-slate-dim">
                      {n.bairro}, {n.cidade}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {corretor && (
                      <Link
                        href={`/corretores/${corretor.id}`}
                        className="flex items-center gap-2 text-slate hover:text-gold-soft"
                      >
                        <Avatar iniciais={corretor.iniciais} size="sm" />
                        <span className="truncate">{corretor.nome}</span>
                      </Link>
                    )}
                  </td>
                  <td className="tabular px-4 py-4 text-right text-slate">{formatBRL(n.valorVenda)}</td>
                  <td className="tabular px-4 py-4 text-right text-ivory">{formatBRL(comissaoValor(n))}</td>
                  <td className="px-4 py-4 text-slate-dim">{formatDate(n.dataFechamento)}</td>
                  <td className="px-6 py-4">
                    <StatusPagamentoPill status={n.statusPagamento} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {linhas.length === 0 && (
          <div className="px-6 py-10 text-center text-sm text-slate-dim">
            Nenhum negócio encontrado para essa busca.
          </div>
        )}
      </div>
    </div>
  );
}
