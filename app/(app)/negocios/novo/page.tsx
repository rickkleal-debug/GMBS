"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { PageHeader } from "@/components/page-header";
import { IconCheck } from "@/components/icons";
import { corretores } from "@/lib/mock-data";
import { formatBRL } from "@/lib/format";

const corretoresAtivos = corretores.filter((c) => c.status === "ativo");

export default function NovoNegocioPage() {
  const [corretorId, setCorretorId] = useState(corretoresAtivos[0]?.id ?? "");
  const [valor, setValor] = useState("");
  const [percentual, setPercentual] = useState(String(corretoresAtivos[0]?.comissaoPadrao ?? 5));
  const [concluido, setConcluido] = useState<{ imovel: string } | null>(null);

  const comissaoCalculada = useMemo(() => {
    const v = Number(valor.replace(/\./g, "").replace(",", ".")) || 0;
    const p = Number(percentual) || 0;
    return (v * p) / 100;
  }, [valor, percentual]);

  function onCorretorChange(id: string) {
    setCorretorId(id);
    const c = corretores.find((c) => c.id === id);
    if (c) setPercentual(String(c.comissaoPadrao));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const dados = new FormData(e.currentTarget);
    setConcluido({ imovel: String(dados.get("imovel") ?? "Negócio") });
  }

  if (concluido) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ok-dim text-ok">
          <IconCheck className="h-5 w-5" />
        </div>
        <h1 className="mt-5 font-display text-2xl text-ivory">Negócio registrado</h1>
        <p className="mt-2 text-sm text-slate">
          {concluido.imovel} foi lançado com comissão pendente de pagamento. Nesta
          pré-visualização o lançamento não é salvo — na versão conectada ao banco, ele aparece
          direto em Negócios e no extrato do corretor.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/negocios"
            className="rounded-lg bg-gold px-4 py-2 text-sm font-medium text-ink hover:opacity-90"
          >
            Ver negócios
          </Link>
          <button
            onClick={() => setConcluido(null)}
            className="rounded-lg border border-hairline px-4 py-2 text-sm text-slate hover:text-ivory"
          >
            Lançar outro
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader eyebrow="Negócios" title="Lançar negócio" />
      <form onSubmit={onSubmit} className="premium-card max-w-2xl rounded-2xl border border-white/[0.065] bg-panel/90 p-6 sm:p-7">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Imóvel" name="imovel" placeholder="Ex.: Casa Santa Felicidade" required span />
          <Field label="Bairro" name="bairro" placeholder="Ex.: Santa Felicidade" required />
          <Field label="Cidade" name="cidade" placeholder="Ex.: Curitiba/PR" required />

          <label className="block">
            <span className="text-xs uppercase tracking-[0.08em] text-slate-dim">Corretor responsável</span>
            <select
              value={corretorId}
              onChange={(e) => onCorretorChange(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-white/[0.08] bg-panel-raised px-4 py-3 text-sm text-ivory focus:border-gold/50"
            >
              {corretoresAtivos.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
          </label>

          <Field label="Data de fechamento" name="data" type="date" required />

          <Field
            label="Valor da venda"
            name="valor"
            placeholder="450.000"
            prefix="R$"
            required
            value={valor}
            onChange={setValor}
          />
          <Field
            label="Comissão"
            name="comissao"
            type="number"
            suffix="%"
            step="0.5"
            min="0"
            max="100"
            required
            value={percentual}
            onChange={setPercentual}
          />
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-hairline pt-5">
          <div className="text-sm text-slate">
            Comissão estimada:{" "}
            <span className="tabular text-base text-gold">{formatBRL(comissaoCalculada)}</span>
          </div>
          <button
            type="submit"
            className="rounded-xl bg-gold px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(227,28,36,0.22)] hover:bg-gold-soft"
          >
            Registrar negócio
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
  prefix,
  step,
  min,
  max,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  span?: boolean;
  suffix?: string;
  prefix?: string;
  step?: string;
  min?: string;
  max?: string;
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <label className={`block ${span ? "sm:col-span-2" : ""}`}>
      <span className="text-xs uppercase tracking-[0.08em] text-slate-dim">{label}</span>
      <div className="relative mt-1.5">
        {prefix && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-dim">
            {prefix}
          </span>
        )}
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          step={step}
          min={min}
          max={max}
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          className={`w-full rounded-xl border border-white/[0.08] bg-panel-raised py-3 text-sm text-ivory shadow-inner shadow-black/10 placeholder:text-slate-dim focus:border-gold/50 ${
            prefix ? "pl-10 pr-3.5" : "px-3.5"
          } ${suffix ? "pr-10" : ""}`}
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
