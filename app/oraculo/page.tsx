import type { Metadata } from "next";
import {
  Cards,
  Ear,
  Eye,
  HandHeart,
  LockSimple,
  MoonStars,
  Plus,
  Sparkle,
  SunHorizon,
  Wind,
} from "@phosphor-icons/react/dist/ssr";
import { Imagem } from "@/components/imagem";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cartas } from "@/lib/cartas";

export const metadata: Metadata = {
  title: "O oráculo · Jardim Arquetípico",
  description:
    "Como funciona o Jardim Arquetípico: seis famílias, trinta arquétipos femininos, as camadas de cada carta e três jeitos de tirar.",
};

const rotulo = "text-[0.72rem] uppercase tracking-[0.2em] text-[#8a8983]";
const tituloSecao = "font-serif text-[2.4rem] leading-[1.04] sm:text-[3.4rem] lg:text-[3.9rem]";

const passos = [
  {
    Icone: Wind,
    titulo: "Silencie e respire",
    texto: "Três respirações lentas. Não precisa de vela nem de incenso. Só um pouco de chão debaixo dos pés.",
  },
  {
    Icone: Cards,
    titulo: "Escolha",
    texto: "Embaralhe do seu jeito e puxe a carta que chamar. A mão costuma saber antes da cabeça.",
  },
  {
    Icone: Eye,
    titulo: "Olhe a imagem",
    texto: "Antes de ler qualquer palavra, repare nas cores, no gesto, no bicho que acompanha. O que você sente vem primeiro.",
  },
  {
    Icone: Ear,
    titulo: "Escute",
    texto: "Leia a frase em voz alta, como se fosse você falando. Depois deixe o texto somar ao que a imagem já disse.",
  },
];

/** Posições dos marcadores sobre a carta 1 (2:3, recorte central). */
const pinos = [
  { n: 1, x: "74%", y: "42%" },
  { n: 2, x: "93%", y: "83%" },
  { n: 3, x: "87%", y: "94%" },
];

const camadasAbertas = [
  {
    n: 1,
    nome: "A imagem",
    texto: "Cheia de pistas: o beija-flor, as flores brancas, os olhos fechados. É a primeira que fala.",
  },
  {
    n: 2,
    nome: "O nome e o lugar",
    texto: "Quem ela é e onde mora no jardim: uma direção, um mundo, um animal, um elemento, um rosto ou uma fase da lua.",
  },
  { n: 3, nome: "A frase", texto: "A voz da própria carta, em primeira pessoa. Dita em voz alta, vira sua." },
  { n: 4, nome: "Palavras-semente", texto: "Três palavras que resumem a energia. Se só uma brilhar para você, já basta.", onde: "Só no livreto e no site" },
];

const camadasGuardadas = [
  { Icone: SunHorizon, nome: "Luz", texto: "O dom da carta quando está inteira." },
  { Icone: MoonStars, nome: "Sombra", texto: "O mesmo dom quando passa do ponto. Um aviso carinhoso, nunca castigo." },
  { Icone: HandHeart, nome: "Ativação", texto: "Um pequeno gesto para levar a carta para o corpo e para o dia." },
];

const tiragens = [
  {
    nome: "Uma carta",
    quando: "Para o dia, para uma dúvida rápida",
    como: "Pergunte “o que eu preciso lembrar hoje?” e puxe uma única carta. Leve uma das palavras-semente com você até a noite.",
    posicoes: ["Hoje"],
    largura: "w-24 sm:w-28",
  },
  {
    nome: "Raiz, Caule e Flor",
    quando: "Para entender um momento",
    como: "A raiz mostra o que te sustenta. O caule, o que pede movimento. A flor, o que pode desabrochar.",
    posicoes: ["Raiz", "Caule", "Flor"],
    largura: "w-[4.6rem] sm:w-20",
  },
  {
    nome: "Roda da Lua",
    quando: "Para um projeto, um ciclo, um recomeço",
    como: "Quatro cartas, uma para cada fase: o que plantar, o que fortalecer, o que celebrar e o que soltar.",
    posicoes: ["Nova", "Crescente", "Cheia", "Minguante"],
    largura: "w-14 sm:w-16",
  },
];

const perguntas = [
  {
    p: "E se sair uma carta “difícil”?",
    r: "Nenhuma carta aqui é ruim. A Ceifadora não fala de perda, fala de espaço. A Exploradora das Sombras não traz medo, traz tesouro. Toda carta tem luz e sombra, e a pergunta é sempre: qual das duas eu estou vivendo?",
  },
  {
    p: "Onde estão a luz, a sombra e a ativação?",
    r: "No baralho impresso e no livreto que o acompanha. No site você conhece a imagem, a frase, as palavras-semente e a essência de cada carta. O resto foi feito para ser lido com a carta na mão.",
  },
  {
    p: "Posso tirar de novo?",
    r: "Pode, mas espere um pouco. Muitas vezes a vontade de tirar outra é só a carta pedindo para ser olhada com mais calma.",
  },
  {
    p: "Preciso saber de arquétipos ou tarô?",
    r: "Não. Arquétipo é só um nome bonito para as figuras que se repetem em todas as histórias. Você já conhece todas elas; só nunca foram apresentadas assim.",
  },
  {
    p: "Posso usar com outras pessoas?",
    r: "Sim, e é lindo. Em roda, cada uma tira uma carta e conta o que viu na imagem antes de ler o texto. Sempre aparece algo que ninguém esperava.",
  },
];

function Verso({ className, rotacao = 0 }: { className?: string; rotacao?: number }) {
  return (
    <span
      style={{ transform: `rotate(${rotacao}deg)` }}
      className={`block aspect-[2/3] overflow-hidden rounded-[10px] shadow-[0_18px_30px_-20px_rgba(28,27,25,0.55)] ring-1 ring-black/5 ${className ?? ""}`}
    >
      <img
        src="/cartas/verso-p.webp"
        alt=""
        width={280}
        height={420}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
    </span>
  );
}

export default function Oraculo() {
  return (
    <main className="overflow-x-clip pb-10">
      {/* Hero */}
      <section className="conteiner grid gap-y-8 pt-14 sm:pt-20 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-x-10 lg:gap-y-9 lg:pt-24">
        <div className="surgir lg:col-start-1 lg:row-start-1 lg:self-end">
          <p className={rotulo}>O oráculo</p>
          <h1 className="mt-6 max-w-[14ch] font-serif text-[2.9rem] leading-[1.02] sm:text-[4.8rem]">
            Como o jardim conversa com você
          </h1>
          <p className="mt-7 max-w-[34rem] text-[1.08rem] leading-relaxed text-[#6b6a65]">
            Pense no baralho como um jardim de trinta mulheres. Cada uma cuida de um canteiro, conhece uma estação e guarda algo
            para te dizer. Tirar uma carta é sentar ao lado de uma delas, por um instante, e ouvir.
          </p>
        </div>
        <div className="surgir aspect-[16/11] overflow-hidden rounded-[28px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
          <Imagem
            src="/secoes/oraculo-hero.webp"
            alt="Jardim com lago de ninfeias, cactos e flores brancas diante de um muro vermelho"
            width={1800}
            height={1009}
            priority
          />
        </div>
        <div className="surgir lg:col-start-1 lg:row-start-2 lg:self-start flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="/imersao">
                Tirar uma carta
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href="#anatomia">Conhecer uma carta</a>
            </Button>
          </div>
      </section>

      {/* Como tirar */}
      <section className="conteiner mt-28 sm:mt-36">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className={rotulo}>Como tirar</p>
            <h2 className={`mt-4 max-w-[16ch] ${tituloSecao}`}>Quatro gestos, nenhuma pressa</h2>
          </div>
          <p className="max-w-[26rem] text-[1rem] leading-relaxed text-[#6b6a65]">
            Não existe jeito errado de começar. Existe só o seu tempo, e ele basta.
          </p>
        </div>
        <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {passos.map(({ Icone, titulo, texto }, i) => (
            <li key={titulo} className="flex flex-col rounded-[28px] bg-[#f2f1ed] p-7 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-full bg-white">
                  <Icone size={20} aria-hidden="true" />
                </span>
                <span className="font-serif text-[1.1rem] text-[#8a8983]">0{i + 1}</span>
              </div>
              <h3 className="mt-12 font-serif text-[1.6rem] leading-tight">{titulo}</h3>
              <p className="mt-3 text-[0.93rem] leading-relaxed text-[#6b6a65]">{texto}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Anatomia: a carta de um lado, todas as camadas do outro, na mesma altura */}
      <section id="anatomia" className="conteiner mt-28 scroll-mt-24 sm:mt-36">
        <div className="grid gap-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-stretch lg:gap-20">
          <div className="relative mx-auto w-[min(80vw,22rem)] lg:mx-0 lg:h-[46rem] lg:w-auto">
            <div className="aspect-[720/1122] overflow-hidden rounded-[20px] shadow-[0_40px_70px_-38px_rgba(28,27,25,0.55)] lg:h-full">
              <img
                src="/cartas/1.webp"
                alt="A Visionária, carta 1 do Jardim Arquetípico"
                width={720}
                height={1122}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            {pinos.map((p) => (
              <span
                key={p.n}
                aria-hidden="true"
                style={{ left: p.x, top: p.y }}
                className="absolute grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#1c1b19] text-[0.78rem] font-medium text-white ring-4 ring-white/70"
              >
                {p.n}
              </span>
            ))}
          </div>

          <div className="flex min-w-0 flex-col lg:h-[46rem]">
            <p className={rotulo}>Anatomia de uma carta</p>
            <h2 className={`mt-4 max-w-[16ch] ${tituloSecao}`}>Sete camadas, do olhar ao gesto</h2>
            <p className="mt-5 max-w-[34rem] text-[1rem] leading-relaxed text-[#6b6a65]">
              Cada carta se lê de fora para dentro. Primeiro os olhos, depois a voz, por fim o corpo. Esta é A Visionária, a primeira do jardim.
            </p>

            <div className="mt-7 grid flex-1 content-stretch gap-2.5 sm:grid-cols-2">
              {/* Camadas abertas: aparecem no site */}
              {camadasAbertas.map((c) => (
                <div key={c.nome} className="rounded-[20px] bg-[#f2f1ed] px-5 py-4">
                  <p className="flex items-center gap-2.5 font-serif text-[1.2rem] leading-tight">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white font-sans text-[0.7rem] font-medium">{c.n}</span>
                    {c.nome}
                  </p>
                  <p className="mt-1.5 text-[0.84rem] leading-snug text-[#6b6a65]">{c.texto}</p>
                  {"onde" in c && (
                    <span className="mt-2.5 inline-block rounded-full bg-white px-2.5 py-1 text-[0.7rem] text-[#6b6a65]">{c.onde}</span>
                  )}
                </div>
              ))}

              {/* Camadas guardadas: só no baralho impresso */}
              <div className="rounded-[20px] bg-[#1c1b19] p-5 text-white sm:col-span-2">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.18em] text-white/80">
                      <LockSimple size={14} weight="bold" aria-hidden="true" />
                      Bloqueadas no site
                    </p>
                    <p className="mt-1 text-[0.8rem] text-white/60">Só no baralho impresso e no livreto</p>
                  </div>
                </div>
                <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                  {camadasGuardadas.map(({ Icone, nome }, i) => (
                    <li
                      key={nome}
                      className="flex items-center gap-3 rounded-[14px] bg-white/[0.07] p-3.5 ring-1 ring-white/10 sm:block"
                    >
                      <div className="flex shrink-0 items-center justify-between gap-2">
                        <span className="flex items-center gap-1.5 font-serif text-[1.1rem]">
                          <Icone size={15} aria-hidden="true" className="text-[#e3c27a]" />
                          {nome}
                        </span>
                        <LockSimple
                          size={13}
                          weight="bold"
                          aria-label={`camada ${i + 5} bloqueada`}
                          className="hidden shrink-0 text-white/70 sm:block"
                        />
                      </div>
                      {/* Texto velado: sugere a mensagem sem revelar */}
                      <div aria-hidden="true" className="min-w-0 flex-1 space-y-1.5 blur-[2px] sm:mt-3">
                        <span className="block h-2 w-full rounded-full bg-white/25" />
                        <span className="block h-2 w-3/4 rounded-full bg-white/15" />
                      </div>
                      <LockSimple size={14} weight="bold" aria-hidden="true" className="shrink-0 text-white/70 sm:hidden" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Glossário: texto breve sobre as seis famílias */}
      <section className="conteiner mt-28 grid gap-8 sm:mt-36 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
        <div>
          <p className={rotulo}>O glossário do jardim</p>
          <h2 className={`mt-4 max-w-[14ch] ${tituloSecao}`}>Seis canteiros, trinta arquétipos</h2>
        </div>
        <div className="space-y-5 text-[1.02rem] leading-relaxed text-[#6b6a65] md:pt-10">
          <p>
            As cartas não crescem soltas: vivem em seis famílias. Direções e Centro falam de caminho. Os Animais Mestres e os Três
            Mundos guardam o que está embaixo, no meio e em cima. Os Quatro Elementos trazem o corpo: terra, ar, fogo e água.
          </p>
          <p>
            Os Arquétipos do Feminino são rostos que toda mulher reconhece em si. E o Ciclo Lunar lembra que tudo tem tempo:
            plantar, crescer, florescer, soltar. Saber de qual canteiro veio a sua carta já diz muito sobre o que ela veio contar.
          </p>
        </div>
      </section>

      {/* Tiragens */}
      <section className="conteiner mt-28 sm:mt-36">
        <p className={rotulo}>Jeitos de tirar</p>
        <h2 className={`mt-4 max-w-[16ch] ${tituloSecao}`}>Uma, três ou quatro cartas</h2>
        <div className="mt-12 grid gap-3 md:grid-cols-3">
          {tiragens.map((t) => {
            return (
              <div key={t.nome} className="flex flex-col overflow-hidden rounded-[28px] bg-[#f2f1ed] p-2">
                <div className="flex h-56 items-end justify-center gap-3 px-4 pb-6 sm:h-64">
                  {t.posicoes.map((pos) => (
                    <div key={pos} className="flex w-[4.4rem] flex-col items-center gap-3 sm:w-[5rem]">
                      <Verso className="w-full" />
                      <span className="text-[0.66rem] uppercase tracking-[0.14em] text-[#8a8983]">{pos}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-1 flex-col rounded-[22px] bg-white p-6 sm:p-7">
                  <h3 className="font-serif text-[1.6rem] leading-tight">{t.nome}</h3>
                  <p className="mt-1 text-[0.82rem] text-[#8a8983]">{t.quando}</p>
                  <p className="mt-4 text-[0.93rem] leading-relaxed text-[#6b6a65]">{t.como}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-8">
          <Button asChild size="lg">
            <a href="/imersao">
              Fazer a tiragem Raiz, Caule e Flor
            </a>
          </Button>
        </div>
      </section>

      {/* Perguntas */}
      <section className="conteiner mt-28 grid gap-10 sm:mt-36 md:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-24">
        <div>
          <p className={rotulo}>Perguntas</p>
          <h2 className={`mt-4 max-w-[12ch] ${tituloSecao}`}>Perguntas que chegam</h2>
        </div>
        <Accordion type="single" collapsible className="border-t border-black/[0.08]">
          {perguntas.map((item, i) => (
            <AccordionItem key={item.p} value={`p${i}`} className="border-black/[0.08] last:border-b">
              <AccordionTrigger
                id={`pergunta-${i}`}
                aria-controls={`resposta-${i}`}
                className="items-center py-6 font-serif text-[1.25rem] font-normal hover:no-underline sm:text-[1.4rem] [&>svg:last-child]:hidden [&[data-state=open]_.mais]:rotate-45">
                {item.p}
                <span className="mais grid size-9 shrink-0 place-items-center rounded-full bg-[#f2f1ed] transition-transform duration-300">
                  <Plus size={14} aria-hidden="true" />
                </span>
              </AccordionTrigger>
              <AccordionContent
                id={`resposta-${i}`}
                aria-labelledby={`pergunta-${i}`}
                className="max-w-[40rem] pb-6 text-[0.98rem] leading-relaxed text-[#6b6a65]">
                {item.r}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Chamada final: imagem em todo o banner, caixa branca atrás do texto */}
      <section className="conteiner mt-28 sm:mt-36">
        <div className="relative overflow-hidden rounded-[28px] bg-[#e9e2d6]">
          <img
            src="/secoes/oraculo-banner.webp"
            alt="Mulher de cabelos longos ao vento, diante do mar, sob a lua"
            width={2000}
            height={1121}
            loading="lazy"
            decoding="async"
            className="block aspect-[2000/1121] w-full object-cover object-right md:absolute md:inset-0 md:h-full md:aspect-auto"
          />
          <div className="relative md:flex md:min-h-[36rem] md:items-center md:p-10 lg:min-h-[42rem] lg:p-14">
            <div className="bg-[#f2f1ed] p-7 sm:p-10 md:max-w-[30rem] md:rounded-[24px] md:bg-white lg:max-w-[34rem] lg:p-12">
              <h2 className="font-serif text-[2.2rem] leading-[1.06] sm:text-[2.9rem]">
                Trinta mulheres esperando um lugar na sua mesa
              </h2>
              <p className="mt-5 text-[1rem] leading-relaxed text-[#6b6a65]">
                Faça uma tiragem agora. Ou venha conversar sobre levar o jardim para o papel, para as livrarias e para as rodas.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href="/imersao">Fazer uma imersão</a>
                </Button>
                <Button asChild size="lg" variant="secondary" className="bg-white hover:bg-white/80 md:bg-[#f2f1ed] md:hover:bg-[#e9e8e3]">
                  <a href="/parcerias">Parcerias e editoras</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
