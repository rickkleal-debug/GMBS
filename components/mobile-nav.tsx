"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconChart, IconDeal, IconPanel, IconUsers, IconWallet } from "./icons";

const NAV = [
  { href: "/", label: "Painel", icon: IconPanel },
  { href: "/corretores", label: "Corretores", icon: IconUsers },
  { href: "/negocios", label: "Negócios", icon: IconDeal },
  { href: "/pagamentos", label: "Pagtos.", icon: IconWallet },
  { href: "/relatorios", label: "Relatórios", icon: IconChart },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-20 flex items-center justify-between gap-1 border-b border-white/[0.06] bg-panel/90 px-2 py-2.5 shadow-lg shadow-black/20 backdrop-blur-xl lg:hidden">
      {NAV.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`relative flex min-h-12 flex-1 flex-col items-center justify-center gap-1 rounded-lg text-[10px] transition-colors ${
              active ? "bg-gold/[0.08] text-gold-soft" : "text-slate-dim hover:bg-white/[0.03] hover:text-slate"
            }`}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
