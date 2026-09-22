"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { CaretLeft, CaretRight, LockSimple, Sparkle } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { cartaPorNumero, cartas } from "@/lib/cartas";
import { cn } from "@/lib/utils";

type Fase = "chegada" | "mesa";
type Escolha = { n: number; rect: DOMRect };

const TOTAL = cartas.length;
const VOO_MS = 800;

function embaralhar() {
  const numeros = cartas.map((c) => c.n);
  for (let i = numeros.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numeros[i], numeros[j]] = [numeros[j], numeros[i]];
  }
  return numeros;
}

function semMovimento() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const esperar = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/* ------------------------------------------------------------------ */
/* 1. Chegada: só respirar                                             */
/* ------------------------------------------------------------------ */

function Chegada({ onPronta }: { onPronta: () => void }) {
  const [inspirando, setInspirando] = useState(true);
  const [meias, setMeias] = useState(0); // meias respirações (4s cada)

  useEffect(() => {
    const id = setInterval(() => {
      setInspirando((v) => !v);
      setMeias((m) => m + 1);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const liberado = meias >= 2 || semMovimento();

  return (
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] md:min-h-[calc(100svh-4.5rem)] flex-col items-center justify-center overflow-hidden bg-white py-10 text-center">
      {/* Degradê verde ocupando a página, pulsando no ritmo da respiração (8s: 4s inspira, 4s solta) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="respirar-fundo aspect-square w-[120vmax] shrink-0 rounded-full bg-[radial-gradient(circle,#8fbb78_0%,#a9cc94_18%,#c6debb_34%,#e1eed9_48%,rgba(255,255,255,0)_64%)]" />
      </div>

      <div className="conteiner relative flex flex-col items-center">
        <h1 className="surgir mx-auto max-w-[15ch] text-balance font-serif text-[2.9rem] leading-[1.02] text-[#1c1b19] sm:text-[4.8rem]">
          Respire. A sua carta já está a caminho.
        </h1>
        <p
          className="surgir mx-auto mt-5 max-w-[30rem] text-pretty text-[1rem] leading-relaxed text-[#55544f]"
          style={{ animationDelay: "250ms" }}
        >
          A carta que é sua já sabe o caminho. Três respirações lentas, no ritmo da luz, e ela se mostra.
        </p>

        <p
          key={meias}
          aria-hidden="true"
          className="surgir mt-10 font-serif text-[2rem] text-[#1c1b19] sm:mt-12 sm:text-[2.4rem]"
          style={{ animationDuration: "1400ms" }}
        >
          {inspirando ? "Inspire…" : "Solte…"}
        </p>
        <p className="sr-only" aria-live="polite">
          Inspire por quatro tempos, solte por quatro tempos. Repita três vezes.
        </p>

        <div className="mt-8 flex h-12 items-center justify-center">
          {liberado ? (
            <Button size="lg" onClick={onPronta} className="surgir">
              Estou pronta
            </Button>
          ) : (
            <span className="text-[0.85rem] text-[#6b6a65]">Sem pressa. Só acompanhe.</span>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 2 a 4. Mesa, escolha e revelação                                      */
/* ------------------------------------------------------------------ */

function Mesa({ ordem, onOutra }: { ordem: number[]; onOutra: () => void }) {
  const [escolha, setEscolha] = useState<Escolha | null>(null);
  const [fileiraVisivel, setFileiraVisivel] = useState(true);
  const [virada, setVirada] = useState(false);
  const [info, setInfo] = useState(false);
  const palcoRef = useRef<HTMLDivElement>(null);
  const fileiraRef = useRef<HTMLDivElement>(null);
  const tituloRef = useRef<HTMLHeadingElement>(null);

  const carta = escolha ? cartaPorNumero(escolha.n) : undefined;

  // No celular/tablet a fileira rola: começa pelo meio do leque.
  useEffect(() => {
    const el = fileiraRef.current;
    if (el && el.scrollWidth > el.clientWidth) el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
  }, []);

  // FLIP: a carta sai do lugar dela na fileira e sobe até o palco.
  useLayoutEffect(() => {
    const el = palcoRef.current;
    if (!escolha || !el || semMovimento()) return;
    const fim = el.getBoundingClientRect();
    const ini = escolha.rect;
    el.style.transition = "none";
    el.style.transformOrigin = "top left";
    el.style.transform = `translate(${ini.left - fim.left}px, ${ini.top - fim.top}px) scale(${ini.width / fim.width})`;
    el.getBoundingClientRect(); // força o layout com a posição inicial
    el.style.transition = `transform ${VOO_MS}ms cubic-bezier(.2,.7,.2,1)`;
    el.style.transform = "";
  }, [escolha]);

  // Sequência: voa → (imagem pronta) vira → mostra a mensagem.
  useEffect(() => {
    if (!escolha || !carta) return;
    let vivo = true;
    const calmo = semMovimento();
    const img = new Image();
    img.src = `/cartas/${carta.n}-arte.webp`;
    const carregou = img.decode().catch(() => undefined);
    (async () => {
      await esperar(calmo ? 0 : 350);
      if (vivo) setFileiraVisivel(false);
      await Promise.all([carregou, esperar(calmo ? 0 : VOO_MS - 350)]);
      if (!vivo) return;
      setVirada(true);
      await esperar(calmo ? 0 : 750);
      if (!vivo) return;
      setInfo(true);
    })();
    return () => {
      vivo = false;
    };
  }, [escolha, carta]);

  useEffect(() => {
    if (info) tituloRef.current?.focus({ preventScroll: true });
  }, [info]);

  function escolher(n: number, alvo: HTMLElement) {
    if (escolha) return;
    setEscolha({ n, rect: alvo.getBoundingClientRect() });
  }

  const meio = (TOTAL - 1) / 2;

  return (
    <section
      className={cn(
        "relative flex min-h-[calc(100svh-4rem)] md:min-h-[calc(100svh-4.5rem)] flex-col overflow-hidden bg-white",
        fileiraVisivel && !escolha && "pb-[20.5rem] sm:pb-[19rem] lg:pb-[21.5rem]",
      )}
    >
      {!escolha ? (
        <div className="conteiner flex flex-1 flex-col items-center justify-center py-10 text-center">
          <h1 className="surgir font-serif text-[2.4rem] leading-[1.05] text-[#1c1b19] sm:text-[3.6rem]" style={{ animationDelay: "120ms" }}>
            Deixe o olhar escolher
          </h1>
          <p className="surgir mx-auto mt-4 max-w-[26rem] text-pretty text-[1rem] leading-relaxed text-[#6b6a65]" style={{ animationDelay: "240ms" }}>
            Não pense muito. A carta que chamar primeiro é a sua.
            <span className="lg:hidden"> Deslize o leque e toque nela.</span>
          </p>
        </div>
      ) : (
        <div className="conteiner grid flex-1 items-center gap-8 py-8 sm:py-12 lg:grid-cols-[auto_minmax(0,34rem)] lg:justify-center lg:gap-16">
          {/* Palco: a carta escolhida */}
          <div className="mx-auto w-[min(88vw,26rem)] sm:w-[28rem] lg:w-[min(34rem,calc((100svh_-_4.5rem_-_6rem)/1.56))]">
            <div ref={palcoRef} className="carta-3d aspect-[720/1122] w-full will-change-transform">
              <div className={cn("carta-miolo", virada && "virada")}>
                <div className="carta-lado overflow-hidden rounded-[16px] shadow-[0_40px_80px_-28px_rgba(28,27,25,0.55),0_10px_24px_-10px_rgba(28,27,25,0.3)]">
                  <img src="/cartas/verso.webp" width={1080} height={1683} alt="" decoding="async" className="h-full w-full object-cover" />
                </div>
                <div className="carta-lado carta-frente overflow-hidden rounded-[16px] bg-[#f2f1ed] shadow-[0_40px_80px_-28px_rgba(28,27,25,0.55),0_10px_24px_-10px_rgba(28,27,25,0.3)]">
                  {carta && (
                    <img
                      src={`/cartas/${carta.n}-arte.webp`}
                      width={720}
                      height={1080}
                      fetchPriority="high"
                      decoding="async"
                      alt={`Carta ${carta.n}, ${carta.nome}`}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* A mensagem (só a essência) */}
          <div aria-live="polite" className="min-h-[1px]">
            {info && carta && (
              <div className="mx-auto max-w-[34rem] text-center lg:text-left">
                <p className="surgir text-[0.72rem] uppercase tracking-[0.2em] text-[#8a8983]">
                  Carta {String(carta.n).padStart(2, "0")} · {carta.lugar}
                </p>
                <h2
                  ref={tituloRef}
                  tabIndex={-1}
                  className="surgir mt-3 font-serif text-[2.4rem] leading-[1.02] text-[#1c1b19] outline-none sm:text-[3.2rem]"
                  style={{ animationDelay: "80ms" }}
                >
                  {carta.nome}
                </h2>
                <p className="surgir mt-4 text-pretty font-serif text-[1.25rem] leading-snug text-[#1c1b19]" style={{ animationDelay: "160ms" }}>
                  “{carta.frase}”
                </p>
                <ul className="surgir mt-5 flex flex-wrap justify-center gap-2 lg:justify-start" style={{ animationDelay: "240ms" }}>
                  {carta.palavras.map((p) => (
                    <li key={p} className="rounded-full bg-[#f2f1ed] px-4 py-1.5 text-[0.82rem] text-[#1c1b19]">
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="surgir mt-5 text-pretty text-[1rem] leading-relaxed text-[#6b6a65]" style={{ animationDelay: "320ms" }}>
                  {carta.essencia}
                </p>

                <div className="surgir mt-7 rounded-[28px] bg-[#f2f1ed] p-6 text-left sm:p-7" style={{ animationDelay: "420ms" }}>
                  <div className="flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.2em] text-[#8a8983]">
                    <LockSimple size={16} weight="regular" aria-hidden="true" />
                    O resto da mensagem
                  </div>
                  <p className="mt-3 font-serif text-[1.45rem] leading-tight text-[#1c1b19]">
                    Isto é só a semente. A flor inteira está no baralho.
                  </p>
                  <ul className="mt-4 space-y-2.5" aria-label="O que o livreto revela">
                    {[
                      ["Luz", "o dom que esta carta acende em você"],
                      ["Sombra", "o ponto onde ela pede cuidado"],
                      ["Ritual de ativação", "um gesto simples para viver a carta"],
                    ].map(([t, d]) => (
                      <li key={t} className="flex items-center gap-3">
                        <Sparkle size={14} weight="fill" className="shrink-0 text-[#b9a6c9]" aria-hidden="true" />
                        <span className="text-[0.92rem] text-[#1c1b19]">{t}</span>
                        <span className="hidden text-[0.85rem] text-[#8a8983] sm:inline">· {d}</span>
                        <span aria-hidden="true" className="ml-auto hidden h-2 w-16 rounded-full bg-[#e2e0da] sm:block" />
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-[0.9rem] leading-relaxed text-[#6b6a65]">
                    Trinta arquétipos impressos, com livreto, para tirar quando a vida pedir uma pausa.
                  </p>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Button size="lg" asChild>
                      <a href="/parcerias">
                        Quero o Jardim Arquetípico
                      </a>
                    </Button>
                    <Button size="lg" variant="secondary" onClick={onOutra}>
                      Tirar outra carta
                    </Button>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      )}

      {/* A fileira: o baralho aberto na base da tela */}
      {fileiraVisivel && (
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 transition-opacity duration-500",
            escolha && "pointer-events-none opacity-0",
          )}
        >
          <div
            ref={fileiraRef}
            className="snap-x snap-mandatory overflow-x-auto overflow-y-hidden pb-9 pt-6 lg:pb-10 [scrollbar-width:none] lg:overflow-visible [&::-webkit-scrollbar]:hidden"
          >
            <ul
              className="conteiner flex w-max min-w-full items-end lg:w-full [--w:176px] sm:[--w:150px] lg:[--w:172px]"
              aria-label="Baralho com 30 cartas viradas para baixo"
            >
              {ordem.map((n, i) => {
                const d = i - meio;
                const estilo = { "--r": `${d * 0.32}deg`, "--y": `${(d * d * 0.045).toFixed(2)}px` } as CSSProperties;
                return (
                  <li
                    key={n}
                    className="surgir shrink-0 snap-center [margin-left:-92px] first:[margin-left:0] sm:[margin-left:-68px] sm:first:[margin-left:0] lg:[margin-left:calc((100%_-_30_*_var(--w))_/_29)] lg:first:[margin-left:0]"
                    style={{ animationDelay: `${i * 18}ms`, zIndex: i }}
                  >
                    <button
                      type="button"
                      aria-label={`Escolher carta ${i + 1} de ${TOTAL}`}
                      onClick={(e) => escolher(n, e.currentTarget)}
                      disabled={!!escolha}
                      style={estilo}
                      className={cn(
                        "block w-[var(--w)] rounded-[10px] outline-none transition-transform duration-300 ease-out",
                        "[transform:translateY(var(--y))_rotate(var(--r))]",
                        "hover:[transform:translateY(calc(var(--y)_-_18px))_rotate(var(--r))]",
                        "focus-visible:[transform:translateY(calc(var(--y)_-_18px))_rotate(var(--r))] focus-visible:ring-2 focus-visible:ring-[#1c1b19] focus-visible:ring-offset-2",
                        escolha?.n === n && "opacity-0",
                      )}
                    >
                      <img
                        src="/cartas/verso-p.webp"
                        width={480}
                        height={748}
                        loading="lazy"
                        decoding="async"
                        alt=""
                        draggable={false}
                        className="aspect-[2/3] w-full rounded-[10px] object-cover shadow-[0_16px_34px_-10px_rgba(28,27,25,0.5),0_4px_10px_-4px_rgba(28,27,25,0.25)]"
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Setas: mostram que o leque pode ser arrastado */}
          {[
            { lado: "esquerda", Icone: CaretLeft, dx: -1 },
            { lado: "direita", Icone: CaretRight, dx: 1 },
          ].map(({ lado, Icone, dx }) => (
            <button
              key={lado}
              type="button"
              aria-label={dx < 0 ? "Ver cartas à esquerda" : "Ver cartas à direita"}
              onClick={() => fileiraRef.current?.scrollBy({ left: dx * 240, behavior: "smooth" })}
              className={cn(
                "absolute top-1/2 z-40 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[#1c1b19] shadow-[0_8px_24px_-8px_rgba(28,27,25,0.45)] backdrop-blur-sm lg:hidden",
                dx < 0 ? "left-3" : "right-3",
              )}
            >
              <Icone size={20} weight="bold" aria-hidden="true" />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

export function Imersao() {
  const [fase, setFase] = useState<Fase>("chegada");
  const [ordem, setOrdem] = useState<number[]>([]);
  const [rodada, setRodada] = useState(0);

  function abrirMesa() {
    setOrdem(embaralhar());
    setRodada((r) => r + 1);
    setFase("mesa");
    window.scrollTo({ top: 0 });
  }

  if (fase === "chegada") return <Chegada onPronta={abrirMesa} />;
  return <Mesa key={rodada} ordem={ordem} onOutra={abrirMesa} />;
}
