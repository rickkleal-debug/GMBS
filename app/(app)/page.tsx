import Link from "next/link";
import { Avatar } from "@/components/avatar";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { StatusPagamentoPill } from "@/components/pill";
import { IconArrowUpRight } from "@/components/icons";
import { comissaoValor, corretorPorId, corretores, negocios } from "@/lib/mock-data";
import { formatBRL, formatDate } from "@/lib/format";

const MES_ATUAL = "2026-08";
const MES_ANTERIOR = "2026-07";

function noMes(iso: string | undefined, mes: string) {
  return !!iso && iso.startsWith(mes);
}

export default function DashboardPage() {
  const pagosMes = negocios.filter((n) => n.statusPagamento === "pago" && noMes(n.dataPagamento, MES_ATUAL));
  const pagosMesAnterior = negocios.filter(
    (n) => n.statusPagamento === "pago" && noMes(n.dataPagamento, MES_ANTERIOR),
  );
  const totalPagoMes = pagosMes.reduce((sum, n) => sum + comissaoValor(n), 0);
  const totalPagoMesAnterior = pagosMesAnterior.reduce((sum, n) => sum + comissaoValor(n), 0);
  const variacao = totalPagoMesAnterior
    ? Math.round(((totalPagoMes - totalPagoMesAnterior) / totalPagoMesAnterior) * 100)
    : 0;

  const pendentes = negocios.filter((n) => n.statusPagamento === "pendente");
  const totalPendente = pendentes.reduce((sum, n) => sum + comissaoValor(n), 0);

  const corretoresAtivos = corretores.filter((c) => c.status === "ativo");
  const fechadosMes = negocios.filter((n) => noMes(n.dataFechamento, MES_ATUAL));

  const ranking = corretoresAtivos
    .map((c) => {
      const deles = negocios.filter((n) => n.corretorId === c.id && n.statusPagamento === "pago");
      const total = deles.reduce((sum, n) => sum + comissaoValor(n), 0);
      return { corretor: c, total, negocios: deles.length };
    })
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  const ultimosNegocios = [...negocios]
    .sort((a, b) => (a.dataFechamento < b.dataFechamento ? 1 : -1))
    .slice(0, 6);

  return (
    <div>
      <PageHeader
        eyebrow="Painel · Agosto 2026"
        title="Comissões em movimento"
        action={
          <Link
            href="/negocios/novo"
            className="rounded-xl bg-gold px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(227,28,36,0.22)] transition-all hover:-translate-y-0.5 hover:bg-gold-soft"
          >
            Lançar negócio
          </Link>
        }
      />

      <div className="rise grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="premium-card overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-panel-raised to-panel p-7 shadow-2xl shadow-black/25">
          <div className="text-[11px] uppercase tracking-[0.14em] text-slate-dim">
            Comissões pagas este mês
          </div>
          <div className="tabular mt-3 font-display text-5xl text-gold sm:text-6xl">
            {formatBRL(totalPagoMes)}
          </div>
          <div className="mt-3 flex items-center gap-2 text-sm text-slate">
            <span className={variacao >= 0 ? "text-ok" : "text-alert"}>
              {variacao >= 0 ? "↑" : "↓"} {Math.abs(variacao)}%
            </span>
            frente a julho ({formatBRL(totalPagoMesAnterior)})
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <StatCard label="Pendente" value={formatBRL(totalPendente)} sublabel={`${pendentes.length} negócios`} />
          <StatCard label="Corretores ativos" value={String(corretoresAtivos.length)} sublabel="sem limite no plano" />
          <StatCard label="Fechados no mês" value={String(fechadosMes.length)} sublabel="negócios de venda" />
          <StatCard
            label="Ticket médio"
            value={formatBRL(
              negocios.reduce((s, n) => s + n.valorVenda, 0) / negocios.length,
            )}
            sublabel="últimos 12 negócios"
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="premium-card rounded-2xl border border-white/[0.065] bg-panel/90 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl text-ivory">Ranking do mês</h2>
            <Link href="/corretores" className="text-xs text-gold-soft hover:text-gold">
              ver todos
            </Link>
          </div>
          <ol className="flex flex-col gap-4">
            {ranking.map((r, i) => (
              <li key={r.corretor.id} className="flex items-center gap-3">
                <span className="font-display w-4 text-sm text-slate-dim">{i + 1}</span>
                <Avatar iniciais={r.corretor.iniciais} size="sm" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm text-ivory">{r.corretor.nome}</div>
                  <div className="text-xs text-slate-dim">
                    {r.negocios} {r.negocios === 1 ? "negócio pago" : "negócios pagos"}
                  </div>
                </div>
                <div className="tabular text-sm text-gold-soft">{formatBRL(r.total)}</div>
              </li>
            ))}
          </ol>
        </div>

        <div className="premium-card rounded-2xl border border-white/[0.065] bg-panel/90 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl text-ivory">Últimos negócios</h2>
            <Link
              href="/negocios"
              className="flex items-center gap-1 text-xs text-gold-soft hover:text-gold"
            >
              ver todos <IconArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="flex flex-col divide-y divide-hairline">
            {ultimosNegocios.map((n) => {
              const corretor = corretorPorId(n.corretorId);
              return (
                <div key={n.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm text-ivory">{n.imovel}</div>
                    <div className="truncate text-xs text-slate-dim">
                      {corretor?.nome} · {formatDate(n.dataFechamento)}
                    </div>
                  </div>
                  <div className="tabular text-right text-sm text-ivory">{formatBRL(comissaoValor(n))}</div>
                  <StatusPagamentoPill status={n.statusPagamento} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
