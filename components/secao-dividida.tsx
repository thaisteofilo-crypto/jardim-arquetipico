"use client";

import { useEffect, useState } from "react";
import { Imagem } from "@/components/imagem";
import { cn } from "@/lib/utils";

export type ItemDestaque = {
  titulo: string;
  texto: string;
  /** Rótulo do bloco neutro enquanto a imagem não chega. */
  rotulo: string;
  imagem?: string;
  href?: string;
  /** Linha pequena acima do título (ex.: "I · Leste"). */
  meta?: string;
  /** Miniatura mostrada na própria linha da lista. */
  miniatura?: string;
  /** Texto do link (padrão: "Ver mais"). */
  chamada?: string;
};

const TEMPO = 6000;

/**
 * Seção em duas colunas: etiqueta, título e uma lista em que um item fica aberto por vez,
 * com uma linha de progresso. Do outro lado, um painel grande que muda com o item ativo.
 */
export function SecaoDividida({
  etiqueta,
  titulo,
  itens,
  invertida = false,
  automatica = true,
  proporcao = "aspect-square",
  carta = false,
  semImagem = false,
}: {
  etiqueta: string;
  titulo: string;
  itens: ItemDestaque[];
  invertida?: boolean;
  automatica?: boolean;
  proporcao?: string;
  /** Mostra a imagem como uma carta (2:3) dentro de um painel claro. */
  carta?: boolean;
  /** Só texto: título de um lado, lista do outro. */
  semImagem?: boolean;
}) {
  const [ativo, setAtivo] = useState(0);
  const [pausada, setPausada] = useState(!automatica);

  useEffect(() => {
    if (pausada) return;
    const id = window.setTimeout(() => setAtivo((a) => (a + 1) % itens.length), TEMPO);
    return () => window.clearTimeout(id);
  }, [ativo, pausada, itens.length]);

  const atual = itens[ativo];

  function preCarregar(src?: string) {
    if (src) new window.Image().src = src;
  }

  const lista = (
        <ul className={cn(carta ? "mt-8 md:mt-12" : semImagem ? "" : "mt-10 md:mt-16", "border-b border-black/[0.08]")}>
          {itens.map((item, i) => {
            const aberto = i === ativo;
            return (
              <li key={item.titulo} className="relative border-t border-black/[0.08]">
                {aberto && (
                  <span
                    key={`${ativo}-${pausada}`}
                    className={cn("absolute -top-px left-0 h-px bg-[#1c1b19]", pausada ? "w-full" : "barra-progresso")}
                    style={{ animationDuration: `${TEMPO}ms` }}
                    aria-hidden="true"
                  />
                )}
                <button
                  type="button"
                  onClick={() => {
                    setAtivo(i);
                    setPausada(true);
                  }}
                  onMouseEnter={() => preCarregar(item.imagem)}
                  onFocus={() => preCarregar(item.imagem)}
                  aria-expanded={aberto}
                  className={cn(
                    "group flex w-full items-center gap-4 text-left transition-colors",
                    carta ? "py-4" : "py-6",
                    aberto ? "text-[#1c1b19]" : "text-[#6b6a65] hover:text-[#1c1b19]",
                  )}
                >
                  {item.miniatura && (
                    <span
                      className={cn(
                        "block aspect-[2/3] w-9 shrink-0 overflow-hidden rounded-[6px] bg-[#f2f1ed] transition-[opacity,transform] duration-300",
                        aberto ? "opacity-100" : "opacity-70 group-hover:opacity-100",
                      )}
                    >
                      <img
                        src={item.miniatura}
                        alt=""
                        width={280}
                        height={420}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </span>
                  )}
                  <span className="min-w-0 flex-1">
                    {item.meta && (
                      <span className="block text-[0.68rem] uppercase tracking-[0.16em] text-[#8a8983]">{item.meta}</span>
                    )}
                    <span className={cn("block", item.meta ? "mt-0.5 font-serif text-[1.18rem] leading-tight" : "text-[0.98rem]")}>
                      {item.titulo}
                    </span>
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows,opacity,padding] duration-700 ease-in-out",
                    aberto ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0",
                    !carta && aberto && "-mt-3 pb-6",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[30rem] overflow-hidden text-[0.92rem] leading-relaxed text-[#6b6a65]",
                      item.miniatura && "pl-[3.25rem]",
                    )}
                  >
                    {item.texto}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
  );

  if (semImagem) {
    return (
      <div className="grid gap-10 md:grid-cols-2 md:gap-12 lg:gap-20">
        <div className={cn("flex min-w-0 flex-col", invertida && "md:order-2")}>
          <span className="self-start rounded-full bg-[#f2f1ed] px-4 py-2 text-[0.85rem]">{etiqueta}</span>
          <h3 className="mt-5 max-w-[18ch] text-balance font-serif text-[2.1rem] leading-[1.08] sm:text-[2.8rem]">{titulo}</h3>
        </div>
        <div className="min-w-0 md:pt-2">{lista}</div>
      </div>
    );
  }

  return (
    <div className={cn("grid gap-10 md:grid-cols-2 md:gap-12 lg:gap-20", carta ? "md:items-start" : "items-start")}>
      <div className={cn("flex min-w-0 flex-col", invertida && "md:order-2")}>
        <span className="self-start rounded-full bg-[#f2f1ed] px-4 py-2 text-[0.85rem]">{etiqueta}</span>
        <h3 className="mt-5 max-w-[18ch] text-balance font-serif text-[2.1rem] leading-[1.08] sm:text-[2.8rem]">{titulo}</h3>
        {!semImagem && <div className={cn(!carta && "hidden md:block")}>{lista}</div>}

        {/* Celular: cada imagem solta, com a frase embaixo */}
        {!carta && (
          <ul className="mt-8 space-y-9 md:hidden">
            {itens.map((item) => (
              <li key={item.titulo}>
                <div className="aspect-square overflow-hidden rounded-[24px]">
                  <Imagem src={item.imagem} alt={item.titulo} rotulo={item.rotulo} />
                </div>
                <h4 className="mt-4 font-serif text-[1.35rem] leading-tight">{item.titulo}</h4>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-[#6b6a65]">{item.texto}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {carta ? (
        <div
          className={cn(
            "flex items-center justify-center rounded-[28px] bg-[#f2f1ed] px-6 py-10 sm:p-12 md:sticky md:top-24 lg:p-16",
            "order-first md:order-none",
            invertida && "md:order-1",
          )}
        >
          <a
            href={atual.href}
            key={ativo}
            aria-label={atual.href ? `Abrir ${atual.titulo}` : undefined}
            className="surgir block aspect-[2/3] w-full max-w-[14rem] overflow-hidden rounded-[16px] shadow-[0_40px_70px_-38px_rgba(28,27,25,0.55)] sm:max-w-[18rem] lg:max-w-[22rem] lg:rounded-[20px]"
          >
            <Imagem src={atual.imagem} alt={atual.titulo} rotulo={atual.rotulo} />
          </a>
        </div>
      ) : (
        <div className={cn("relative hidden overflow-hidden rounded-[28px] md:block", proporcao, invertida && "md:order-1")}>
          {/* Todas as imagens empilhadas: a troca é só um esmaecer suave, sem salto */}
          {itens.map((item, i) => (
            <div
              key={item.titulo}
              aria-hidden={i !== ativo}
              className={cn(
                "absolute inset-0 transition-opacity duration-[1200ms] ease-in-out",
                i === ativo ? "opacity-100" : "opacity-0",
              )}
            >
              <Imagem src={item.imagem} alt={item.titulo} rotulo={item.rotulo} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
