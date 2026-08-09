"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconChart,
  IconDeal,
  IconKeyhole,
  IconLogout,
  IconPanel,
  IconUsers,
  IconWallet,
} from "./icons";

const NAV = [
  { href: "/", label: "Painel", icon: IconPanel },
  { href: "/corretores", label: "Corretores", icon: IconUsers },
  { href: "/negocios", label: "Negócios", icon: IconDeal },
  { href: "/pagamentos", label: "Pagamentos", icon: IconWallet },
  { href: "/relatorios", label: "Relatórios", icon: IconChart },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-[272px] shrink-0 flex-col border-r border-white/[0.06] bg-panel/95 px-5 py-7 shadow-[18px_0_48px_rgba(0,0,0,0.2)] backdrop-blur-xl lg:flex">
      <Link href="/" className="group flex items-center gap-3 rounded-xl px-2 py-1">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold/20 bg-gold/[0.08] shadow-[0_0_28px_rgba(227,28,36,0.08)] transition-colors group-hover:border-gold/40">
          <IconKeyhole className="h-6 w-3.5 text-gold" />
        </span>
        <div>
          <div className="font-display text-lg font-semibold leading-none tracking-[0.08em] text-ivory">GMBS</div>
          <div className="mt-1.5 text-[9px] uppercase tracking-[0.24em] text-slate-dim">Gestão imobiliária</div>
        </div>
      </Link>

      <div className="mt-9 px-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-slate-dim/80">Navegação</div>
      <nav className="mt-3 flex flex-col gap-1.5">
        {NAV.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-all ${
                active
                  ? "bg-gradient-to-r from-gold/[0.14] to-gold/[0.03] text-ivory shadow-[inset_0_0_0_1px_rgba(227,28,36,0.14)]"
                  : "text-slate hover:bg-white/[0.035] hover:text-ivory"
              }`}
            >
              {active && <span className="absolute -left-5 h-6 w-0.5 rounded-r-full bg-gold shadow-[0_0_14px_rgba(227,28,36,0.9)]" />}
              <Icon className={`h-[17px] w-[17px] ${active ? "text-gold" : "text-slate-dim group-hover:text-slate"}`} />
              <span className={active ? "font-medium" : ""}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.025] px-3 py-3.5 shadow-[inset_0_1px_rgba(255,255,255,0.02)]">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-gold/20 bg-gold/10 font-mono text-xs text-gold-soft">
          GU
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm text-ivory">Gustavo</div>
          <div className="truncate text-xs text-slate-dim">Administrador</div>
        </div>
        <Link
          href="/login"
          className="text-slate-dim transition-colors hover:text-gold"
          aria-label="Sair"
          title="Sair"
        >
          <IconLogout className="h-4 w-4" />
        </Link>
      </div>
    </aside>
  );
}
