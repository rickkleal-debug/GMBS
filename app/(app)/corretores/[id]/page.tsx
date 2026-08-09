import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar } from "@/components/avatar";
import { StatCard } from "@/components/stat-card";
import { StatusCorretorPill, StatusPagamentoPill } from "@/components/pill";
import { comissaoValor, corretorPorId, corretores, negociosPorCorretor } from "@/lib/mock-data";
import { formatBRL, formatDate } from "@/lib/format";

export function generateStaticParams() {
  return corretores.map((c) => ({ id: c.id }));
}

export default async function CorretorDetalhePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const corretor = corretorPorId(id);
  if (!corretor) notFound();

  const deles = [...negociosPorCorretor(id)].sort((a, b) =>
    a.dataFechamento < b.dataFechamento ? 1 : -1,
  );
  const pago = deles.filter((n) => n.statusPagamento === "pago");
  const pendente = deles.filter((n) => n.statusPagamento === "pendente");
  const totalPago = pago.reduce((s, n) => s + comissaoValor(n), 0);
  const totalPendente = pendente.reduce((s, n) => s + comissaoValor(n), 0);
  const totalVendido = deles.reduce((s, n) => s + n.valorVenda, 0);

  return (
    <div>
      <Link href="/corretores" className="text-xs text-slate hover:text-gold-soft">
        ← Corretores
      </Link>

      <div className="premium-card rise mt-4 mb-8 flex flex-wrap items-center gap-4 rounded-2xl border border-white/[0.065] bg-panel/75 p-5 sm:p-6">
        <Avatar iniciais={corretor.iniciais} size="lg" />
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-[-0.025em] text-ivory">{corretor.nome}</h1>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate">
            <span>{corretor.creci}</span>
            <span className="text-hairline">·</span>
            <span>{corretor.email}</span>
            <span className="text-hairline">·</span>
            <span>{corretor.telefone}</span>
            <span className="text-hairline">·</span>
            <StatusCorretorPill status={corretor.status} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Comissão paga" value={formatBRL(totalPago)} accent />
        <StatCard label="Pendente" value={formatBRL(totalPendente)} />
        <StatCard label="Total vendido" value={formatBRL(totalVendido)} />
        <StatCard label="Comissão padrão" value={`${corretor.comissaoPadrao}%`} sublabel={`desde ${formatDate(corretor.dataEntrada)}`} />
      </div>

      <div className="premium-card mt-8 overflow-hidden rounded-2xl border border-white/[0.065] bg-panel/90">
        <div className="border-b border-hairline px-6 py-4">
          <h2 className="font-display text-xl text-ivory">Extrato de negócios</h2>
        </div>
        <div className="divide-y divide-hairline">
          {deles.map((n) => (
            <div key={n.id} className="flex flex-wrap items-center gap-4 px-6 py-4">
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm text-ivory">{n.imovel}</div>
                <div className="truncate text-xs text-slate-dim">
                  {n.bairro}, {n.cidade} · fechado em {formatDate(n.dataFechamento)}
                </div>
              </div>
              <div className="tabular text-right text-sm text-slate">{formatBRL(n.valorVenda)}</div>
              <div className="tabular w-20 text-right text-sm text-slate-dim">{n.comissaoPercentual}%</div>
              <div className="tabular w-28 text-right text-sm text-gold-soft">
                {formatBRL(comissaoValor(n))}
              </div>
              <div className="w-24">
                <StatusPagamentoPill status={n.statusPagamento} />
              </div>
            </div>
          ))}
          {deles.length === 0 && (
            <div className="px-6 py-10 text-center text-sm text-slate-dim">
              Nenhum negócio lançado para este corretor ainda.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
