"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { PageHeader } from "@/components/page-header";
import { IconCheck } from "@/components/icons";

export default function NovoCorretorPage() {
  const [enviado, setEnviado] = useState<{ nome: string } | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const dados = new FormData(e.currentTarget);
    setEnviado({ nome: String(dados.get("nome") ?? "Corretor") });
  }

  if (enviado) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ok-dim text-ok">
          <IconCheck className="h-5 w-5" />
        </div>
        <h1 className="mt-5 font-display text-2xl text-ivory">{enviado.nome} foi cadastrado</h1>
        <p className="mt-2 text-sm text-slate">
          Nesta pré-visualização o cadastro não é salvo de fato — quando conectarmos o banco de
          dados, o corretor passa a aparecer direto na lista, sem limite de quantos vocês
          cadastrarem.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/corretores"
            className="rounded-lg bg-gold px-4 py-2 text-sm font-medium text-ink hover:opacity-90"
          >
            Ver corretores
          </Link>
          <button
            onClick={() => setEnviado(null)}
            className="rounded-lg border border-hairline px-4 py-2 text-sm text-slate hover:text-ivory"
          >
            Cadastrar outro
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader eyebrow="Corretores" title="Novo corretor" />
      <form onSubmit={onSubmit} className="premium-card max-w-2xl rounded-2xl border border-white/[0.065] bg-panel/90 p-6 sm:p-7">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Nome completo" name="nome" placeholder="Ex.: Beatriz Costa" required span />
          <Field label="E-mail" name="email" type="email" placeholder="nome@imoveisgmbs.com.br" required />
          <Field label="Telefone" name="telefone" placeholder="(41) 90000-0000" required />
          <Field label="CRECI" name="creci" placeholder="CRECI/PR 00.000" required />
          <Field
            label="Comissão padrão"
            name="comissao"
            type="number"
            placeholder="5"
            suffix="%"
            step="0.5"
            min="0"
            max="100"
            required
          />
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-hairline pt-5">
          <label className="flex items-center gap-2 text-sm text-slate">
            <input type="checkbox" name="ativo" defaultChecked className="h-4 w-4 accent-[var(--gold)]" />
            Corretor ativo desde já
          </label>
          <button
            type="submit"
            className="rounded-xl bg-gold px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(227,28,36,0.22)] hover:bg-gold-soft"
          >
            Cadastrar corretor
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  span,
  suffix,
  step,
  min,
  max,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  span?: boolean;
  suffix?: string;
  step?: string;
  min?: string;
  max?: string;
}) {
  return (
    <label className={`block ${span ? "sm:col-span-2" : ""}`}>
      <span className="text-xs uppercase tracking-[0.08em] text-slate-dim">{label}</span>
      <div className="relative mt-1.5">
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          step={step}
          min={min}
          max={max}
          className="w-full rounded-xl border border-white/[0.08] bg-panel-raised px-4 py-3 text-sm text-ivory shadow-inner shadow-black/10 placeholder:text-slate-dim transition-colors focus:border-gold/50"
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-dim">
            {suffix}
          </span>
        )}
      </div>
    </label>
  );
}
