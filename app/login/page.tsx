"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { IconArrowRight, IconKeyhole, IconLock, IconMail } from "@/components/icons";

export default function LoginPage() {
  const router = useRouter();
  const [carregando, setCarregando] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCarregando(true);
    setTimeout(() => router.push("/"), 500);
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden lg:flex-row">
      {/* Brand panel — hidden on small screens, the case for the product */}
      <div className="architectural-grid relative hidden overflow-hidden border-r border-white/[0.06] bg-panel lg:flex lg:w-[54%] lg:flex-col lg:justify-between lg:px-16 lg:py-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 h-[520px] w-[520px] rounded-full opacity-[0.2] blur-3xl"
          style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)" }}
        />
        <IconKeyhole
          aria-hidden
          className="pointer-events-none absolute -bottom-16 -right-10 h-[420px] w-[230px] text-gold/[0.08]"
        />

        <div className="relative flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold/25 bg-gold/10">
            <IconKeyhole className="h-6 w-3.5 text-gold" />
          </span>
          <span className="font-display text-lg font-semibold tracking-[0.1em] text-ivory">GMBS</span>
        </div>

        <div className="relative max-w-md">
          <div className="text-xs uppercase tracking-[0.2em] text-gold-soft">Painel de corretores</div>
          <h1 className="rise mt-5 font-display text-5xl font-semibold leading-[1.08] tracking-[-0.035em] text-ivory">
            Construindo sonhos, um imóvel de cada vez.
          </h1>
          <p className="rise mt-5 text-sm leading-relaxed text-slate" style={{ animationDelay: "80ms" }}>
            Cada negócio fechado, cada comissão paga — tudo num só lugar, do jeito que a
            Imóveis GMBS precisa para crescer sem perder o controle.
          </p>

          <div
            className="premium-card rise mt-10 w-full max-w-sm rounded-2xl border border-white/[0.08] bg-panel-raised/85 p-6 backdrop-blur"
            style={{ animationDelay: "160ms" }}
          >
            <div className="text-[11px] uppercase tracking-[0.14em] text-slate-dim">
              Comissões pagas este mês
            </div>
            <div className="tabular mt-2 font-display text-3xl text-gold">R$ 58.550</div>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-ok">
              ↑ 136% <span className="text-slate-dim">frente a julho</span>
            </div>
          </div>
        </div>

        <div className="relative text-xs text-slate-dim">imoveisgmbs.com.br</div>
      </div>

      {/* Form panel */}
      <div className="relative flex flex-1 items-center justify-center bg-ink px-6 py-16">
        <div aria-hidden className="pointer-events-none absolute right-[-10rem] top-[-10rem] h-80 w-80 rounded-full bg-gold/[0.09] blur-[100px]" />
        <div className="premium-card rise relative w-full max-w-md rounded-3xl border border-white/[0.065] bg-panel/70 p-7 shadow-2xl shadow-black/30 backdrop-blur sm:p-9">
          <div className="mb-10 flex items-center gap-2.5 lg:hidden">
            <IconKeyhole className="h-6 w-3.5 text-gold" />
            <span className="font-display text-lg tracking-wide text-ivory">IMÓVEIS GMBS</span>
          </div>

          <h2 className="font-display text-2xl text-ivory">Bem-vindo de volta</h2>
          <p className="mt-1.5 text-sm text-slate">Entre para ver os negócios e comissões da equipe.</p>

          <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
            <label className="block">
              <span className="text-xs uppercase tracking-[0.08em] text-slate-dim">E-mail</span>
              <div className="relative mt-1.5">
                <IconMail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-dim" />
                <input
                  type="email"
                  defaultValue="henrique@imoveisgmbs.com.br"
                  required
                  className="w-full rounded-xl border border-white/[0.08] bg-panel-raised py-3 pl-10 pr-4 text-sm text-ivory transition-colors focus:border-gold/50"
                />
              </div>
            </label>

            <label className="block">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.08em] text-slate-dim">Senha</span>
                <a href="#" className="text-xs text-slate-dim transition-colors hover:text-gold-soft">
                  Esqueci a senha
                </a>
              </div>
              <div className="relative mt-1.5">
                <IconLock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-dim" />
                <input
                  type="password"
                  defaultValue="••••••••"
                  required
                  className="w-full rounded-xl border border-white/[0.08] bg-panel-raised py-3 pl-10 pr-4 text-sm text-ivory transition-colors focus:border-gold/50"
                />
              </div>
            </label>

            <button
              type="submit"
              disabled={carregando}
              className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gold py-3 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(227,28,36,0.25)] transition-all hover:-translate-y-0.5 hover:bg-gold-soft disabled:opacity-60"
            >
              {carregando ? "Entrando…" : "Entrar"}
              {!carregando && (
                <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-slate-dim">
            Pré-visualização — o acesso ainda não está conectado a contas reais.
          </p>
        </div>
      </div>
    </div>
  );
}
