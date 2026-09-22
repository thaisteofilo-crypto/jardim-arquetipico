"use client";

import { useState } from "react";
import { EnvelopeSimple, PaperPlaneTilt } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// trocar pelo e-mail real
const EMAIL_CONTATO = "contato@jardimarquetipico.com.br";

const TIPOS = [
  "Edição e distribuição",
  "Coedição",
  "Licenciamento de imagens",
  "Edição especial",
  "Loja ou marca",
  "Rodas e experiências",
  "Outro",
];

const campo =
  "h-12 rounded-2xl border-0 bg-[#f2f1ed] px-4 text-[0.95rem] shadow-none md:text-[0.95rem] focus-visible:ring-[#1c1b19]/15";

export function FormularioContato() {
  const [tipo, setTipo] = useState(TIPOS[0]);
  const [enviado, setEnviado] = useState(false);

  function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const nome = String(d.get("nome") ?? "").trim();
    const empresa = String(d.get("empresa") ?? "").trim();
    const assunto = `Jardim Arquetípico · ${tipo}${empresa ? ` · ${empresa}` : ""}`;
    const corpo = [
      `Olá, Graziela e Thaís!`,
      ``,
      String(d.get("mensagem") ?? "").trim(),
      ``,
      `Dados de contato`,
      `Nome: ${nome}`,
      `E-mail: ${String(d.get("email") ?? "").trim()}`,
      `Empresa / editora: ${empresa || "não informado"}`,
      `Tipo de parceria: ${tipo}`,
    ].join("\n");
    window.location.href = `mailto:${EMAIL_CONTATO}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
    setEnviado(true);
  }

  return (
    <form onSubmit={enviar} className="grid gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="nome" className="text-[0.85rem] font-normal text-[#6b6a65]">
            Nome
          </Label>
          <Input id="nome" name="nome" required autoComplete="name" placeholder="Seu nome" className={campo} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-[0.85rem] font-normal text-[#6b6a65]">
            E-mail
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="voce@editora.com.br"
            className={campo}
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="empresa" className="text-[0.85rem] font-normal text-[#6b6a65]">
          Empresa ou editora
        </Label>
        <Input id="empresa" name="empresa" autoComplete="organization" placeholder="Opcional" className={campo} />
      </div>

      <fieldset className="grid gap-3">
        <legend className="mb-3 text-[0.85rem] text-[#6b6a65]">Que tipo de parceria?</legend>
        <div className="flex flex-wrap gap-2">
          {TIPOS.map((t) => (
            <label
              key={t}
              className={cn(
                "cursor-pointer rounded-full px-4 py-2 text-[0.85rem] transition-colors has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-[#1c1b19]/20",
                tipo === t ? "bg-[#1c1b19] text-white" : "bg-[#f2f1ed] text-[#1c1b19] hover:bg-[#e8e7e2]"
              )}
            >
              <input
                type="radio"
                name="tipo"
                value={t}
                checked={tipo === t}
                onChange={() => setTipo(t)}
                className="sr-only"
              />
              {t}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-2">
        <Label htmlFor="mensagem" className="text-[0.85rem] font-normal text-[#6b6a65]">
          Mensagem
        </Label>
        <Textarea
          id="mensagem"
          name="mensagem"
          required
          rows={5}
          placeholder="Conte um pouco sobre a sua ideia, o seu catálogo ou o seu público."
          className="min-h-36 rounded-2xl border-0 bg-[#f2f1ed] px-4 py-3 text-[0.95rem] shadow-none md:text-[0.95rem] focus-visible:ring-[#1c1b19]/15"
        />
      </div>

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg">
          Enviar mensagem <PaperPlaneTilt weight="bold" />
        </Button>
        <p className="flex items-center gap-2 text-[0.85rem] text-[#8a8983]" aria-live="polite">
          <EnvelopeSimple className="size-4 shrink-0" />
          {enviado ? (
            <span>
              Abrimos o seu e-mail. Se nada apareceu, escreva para{" "}
              <a className="underline underline-offset-4" href={`mailto:${EMAIL_CONTATO}`}>
                {EMAIL_CONTATO}
              </a>
              .
            </span>
          ) : (
            <span>A mensagem abre no seu programa de e-mail, já preenchida.</span>
          )}
        </p>
      </div>
    </form>
  );
}
