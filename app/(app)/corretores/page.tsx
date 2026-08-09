"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Avatar } from "@/components/avatar";
import { PageHeader } from "@/components/page-header";
import { IconPlus } from "@/components/icons";
import { StatusCorretorPill } from "@/components/pill";
import { comissaoValor, corretores, negociosPorCorretor } from "@/lib/mock-data";
import { formatBRL } from "@/lib/format";

type Filtro = "todos" | "ativo" | "inativo";

export default function CorretoresPage() {
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState<Filtro>("todos");

  const linhas = useMemo(() => {
    return corretores
      .filter((c) => (filtro === "todos" ? true : c.status === filtro))
      .filter((c) => c.nome.toLowerCase().includes(busca.toLowerCase()))
      .map((c) => {
        const deles = negociosPorCorretor(c.id);
        const totalVendido = deles.reduce((s, n) => s + n.valorVenda, 0);
        const totalComissao = deles
          .filter((n) => n.statusPagamento === "pago")
          .reduce((s, n) => s + comissaoValor(n), 0);
        return { corretor: c, negocios: deles.length, totalVendido, totalComissao };
      });
  }, [busca, filtro]);

  return (
    <div>
      <PageHeader
        eyebrow={`${corretores.length} corretores cadastrados`}
        title="Corretores"
        action={
          <Link
            href="/corretores/novo"
            className="flex items-center gap-2 rounded-xl bg-gold px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(227,28,36,0.22)] transition-all hover:-translate-y-0.5 hover:bg-gold-soft"
          >
            <IconPlus className="h-4 w-4" /> Novo corretor
          </Link>
        }
      />

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar por nome…"
          className="w-full max-w-xs rounded-xl border border-white/[0.08] bg-panel-raised/80 px-4 py-2.5 text-sm text-ivory shadow-inner shadow-black/10 placeholder:text-slate-dim transition-colors focus:border-gold/50"
        />
        <div className="flex gap-1 rounded-xl border border-white/[0.07] bg-panel p-1.5">
          {(["todos", "ativo", "inativo"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`rounded-md px-3 py-1.5 text-xs capitalize transition-colors ${
                filtro === f ? "bg-panel-raised text-gold" : "text-slate hover:text-ivory"
              }`}
            >
              {f === "todos" ? "Todos" : f === "ativo" ? "Ativos" : "Inativos"}
            </button>
          ))}
        </div>
      </div>

      <div className="premium-card overflow-hidden rounded-2xl border border-white/[0.065] bg-panel/90">
        <div className="hidden grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 border-b border-hairline px-6 py-3 text-[11px] uppercase tracking-[0.1em] text-slate-dim sm:grid">
          <div>Corretor</div>
          <div>Comissão</div>
          <div>Negócios</div>
          <div>Total vendido</div>
          <div>Comissão paga</div>
        </div>
        <div className="divide-y divide-hairline">
          {linhas.map(({ corretor, negocios, totalVendido, totalComissao }) => (
            <Link
              key={corretor.id}
              href={`/corretores/${corretor.id}`}
              className="grid grid-cols-2 items-center gap-4 px-6 py-4 transition-colors hover:bg-panel-raised/50 sm:grid-cols-[2fr_1fr_1fr_1fr_1fr]"
            >
              <div className="col-span-2 flex items-center gap-3 sm:col-span-1">
                <Avatar iniciais={corretor.iniciais} />
                <div className="min-w-0">
                  <div className="truncate text-sm text-ivory">{corretor.nome}</div>
                  <div className="mt-0.5">
                    <StatusCorretorPill status={corretor.status} />
                  </div>
                </div>
              </div>
              <div className="tabular text-sm text-slate">{corretor.comissaoPadrao}%</div>
              <div className="tabular text-sm text-slate">{negocios}</div>
              <div className="tabular text-sm text-ivory">{formatBRL(totalVendido)}</div>
              <div className="tabular text-sm text-gold-soft">{formatBRL(totalComissao)}</div>
            </Link>
          ))}
          {linhas.length === 0 && (
            <div className="px-6 py-10 text-center text-sm text-slate-dim">
              Nenhum corretor encontrado para essa busca.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
