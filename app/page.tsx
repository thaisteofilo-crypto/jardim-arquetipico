"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpenText,
  FlowerLotus,
  HandHeart,
  Handshake,
  Leaf,
  Palette,
  Quotes,
  Sparkle,
} from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const cards = [
  {
    name: "A Visionária",
    invitation: "Um novo olhar pode estar pedindo passagem.",
    image: "/cartas/visionaria.webp",
  },
  {
    name: "A Mensageira",
    invitation: "Escute o que chega com delicadeza antes de responder.",
    image: "/cartas/mensageira.webp",
  },
  {
    name: "A Alquimista",
    invitation: "Há matéria preciosa no que você ainda chama de mudança.",
    image: "/cartas/alquimista.webp",
  },
  {
    name: "A Curandeira",
    invitation: "Nem todo cuidado faz barulho; permita-se recebê-lo.",
    image: "/cartas/curandeira.webp",
  },
  {
    name: "A Sacerdotisa do Voo",
    invitation: "O próximo passo pode nascer de uma escuta mais alta.",
    image: "/cartas/sacerdotisa.webp",
  },
  {
    name: "A Grande Mãe",
    invitation: "Há uma força generosa sustentando o que está por vir.",
    image: "/cartas/grande-mae.webp",
  },
];

export default function Home() {
  const [drawnCard, setDrawnCard] = useState<number | null>(null);
  const activeCard = cards[drawnCard ?? 0];

  const drawCard = () => {
    let next = Math.floor(Math.random() * cards.length);
    if (cards.length > 1 && next === drawnCard) next = (next + 1) % cards.length;
    setDrawnCard(next);
  };

  const goToDraw = () => {
    document.getElementById("tirar")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="overflow-hidden bg-[#f7f1e8] text-[#172d24]">
      <header className="sticky top-0 z-30 border-b border-[#172d24]/10 bg-[#f7f1e8]/90 backdrop-blur-md">
        <div className="mx-auto flex h-[4.6rem] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <a className="group flex items-center gap-2" href="#inicio" aria-label="Jardim Arquetípico, início">
            <span className="grid size-8 place-items-center rounded-full border border-[#c95736] text-[#c95736] transition-transform duration-300 group-hover:rotate-12">
              <Sparkle size={16} weight="fill" aria-hidden="true" />
            </span>
            <span className="font-serif text-lg tracking-[-0.04em] sm:text-xl">Jardim Arquetípico</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-[#365042] md:flex" aria-label="Navegação principal">
            <a className="transition-colors hover:text-[#c95736]" href="#oraculo">O oráculo</a>
            <a className="transition-colors hover:text-[#c95736]" href="#tirar">Uma carta</a>
            <a className="transition-colors hover:text-[#c95736]" href="#parcerias">Parcerias</a>
          </nav>
          <Button onClick={goToDraw} className="rounded-full bg-[#172d24] px-4 text-[#fffaf2] hover:bg-[#c95736] sm:px-5">
            Tirar uma carta
          </Button>
        </div>
      </header>

      <section id="inicio" className="relative mx-auto grid min-h-[calc(100svh-4.6rem)] max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.02fr_.98fr] lg:px-12 lg:py-16">
        <div className="relative z-10 max-w-2xl">
          <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.19em] text-[#c95736]">
            <span className="h-px w-7 bg-[#c95736]" /> Um oráculo visual feminino
          </p>
          <h1 className="max-w-xl font-serif text-5xl leading-[.93] tracking-[-0.065em] text-[#172d24] sm:text-6xl lg:text-7xl">
            Existem vozes que só florescem quando são ouvidas.
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-[#365042]">
            Jardim Arquetípico reúne trinta figuras simbólicas para abrir espaço à imaginação, aos ciclos e às perguntas que chegam sem aviso.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button onClick={goToDraw} size="lg" className="rounded-full bg-[#c95736] px-6 text-[#fffaf2] hover:bg-[#ad3e25]">
              Encontrar uma carta <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </Button>
            <Button asChild variant="ghost" size="lg" className="rounded-full px-4 text-[#172d24] hover:bg-[#e8dac5]">
              <a href="#oraculo">Conhecer o projeto <ArrowDown size={17} aria-hidden="true" /></a>
            </Button>
          </div>
          <div className="mt-12 flex items-center gap-4 text-sm text-[#52695b]">
            <span className="font-serif text-3xl leading-none text-[#c95736]">30</span>
            <span className="border-l border-[#172d24]/15 pl-4">arquétipos para olhar por dentro<br className="hidden sm:block" /> e se reconhecer no mundo</span>
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-[32rem] items-center justify-center py-4 lg:py-0">
          <div className="absolute inset-[9%] rounded-full bg-[#d8e1b8] blur-3xl" aria-hidden="true" />
          <div className="relative w-[min(78vw,23rem)] rotate-[4deg] rounded-[2rem] bg-[#172d24] p-2 shadow-[20px_25px_0_#d6ad67] transition-transform duration-500 hover:rotate-0 sm:w-[21rem]">
            <div className="overflow-hidden rounded-[1.55rem] bg-[#e8dac5]">
              <img className="h-[26rem] w-full object-cover object-top sm:h-[31rem]" src="/cartas/visionaria.webp" alt="Ilustração da carta A Visionária, retratando uma mulher com um pássaro nas mãos" />
            </div>
            <div className="absolute bottom-5 left-5 rounded-full bg-[#f7f1e8] px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#172d24]">
              a imagem que vê antes
            </div>
          </div>
          <p className="absolute bottom-0 right-0 max-w-36 font-serif text-xl leading-[.95] text-[#c95736] sm:right-3">um jardim que começa dentro</p>
        </div>
      </section>

      <section id="tirar" className="relative bg-[#172d24] px-5 py-20 text-[#fffaf2] sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[.82fr_1.18fr]">
          <div className="max-w-md">
            <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.19em] text-[#d6ad67]">
              <span className="h-px w-7 bg-[#d6ad67]" /> uma pausa para você
            </p>
            <h2 className="font-serif text-4xl leading-[.98] tracking-[-0.055em] sm:text-5xl">Uma carta para este momento.</h2>
            <p className="mt-6 text-lg leading-relaxed text-[#d7e1d0]">Não há respostas prontas aqui. Há imagens que acompanham, deslocam e devolvem uma pergunta à sua própria linguagem.</p>
            <div className="mt-8 flex items-center gap-3 text-sm text-[#d6ad67]">
              <HandHeart size={24} weight="duotone" aria-hidden="true" />
              <span>Toque na carta. Ela revela só o início.</span>
            </div>
          </div>

          <Card className="overflow-hidden rounded-[2rem] border-[#fffaf2]/15 bg-[#f7f1e8] py-0 text-[#172d24] shadow-2xl">
            <CardContent className="grid min-h-[27rem] p-0 sm:grid-cols-[.82fr_1.18fr]">
              <button onClick={drawCard} className="group relative min-h-[22rem] overflow-hidden bg-[#e8dac5] text-left focus-visible:outline-2 focus-visible:outline-offset-[-6px] focus-visible:outline-[#c95736] sm:min-h-full" aria-label="Tirar uma carta do Jardim Arquetípico">
                <img className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.035]" src={activeCard.image} alt="Ilustração parcial de uma carta do Jardim Arquetípico" />
                <span className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-[#172d24]/82 to-transparent" aria-hidden="true" />
                <span className="absolute bottom-5 left-5 rounded-full border border-[#fffaf2]/40 bg-[#172d24]/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#fffaf2] backdrop-blur-sm">
                  {drawnCard === null ? "toque para tirar" : "puxar outra"}
                </span>
              </button>
              <div className="flex flex-col justify-between p-7 sm:p-9">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c95736]">{drawnCard === null ? "a carta espera" : "sua carta agora"}</p>
                  <h3 aria-live="polite" className="mt-4 font-serif text-4xl leading-[.95] tracking-[-0.05em] sm:text-5xl">{drawnCard === null ? "O jardim está em silêncio." : activeCard.name}</h3>
                  <p className="mt-6 max-w-sm text-lg leading-relaxed text-[#52695b]">{drawnCard === null ? "Escolha um instante. A primeira imagem chega quando você toca." : activeCard.invitation}</p>
                </div>
                <div className="mt-8 border-t border-[#172d24]/10 pt-5">
                  <p className="text-sm text-[#52695b]">O significado se abre no encontro com a sua história.</p>
                  <Button onClick={drawCard} variant="ghost" className="mt-3 rounded-full px-0 text-[#c95736] hover:bg-transparent hover:text-[#ad3e25]">
                    {drawnCard === null ? "Revelar o primeiro fio" : "Deixar outra imagem chegar"} <ArrowRight size={17} weight="bold" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="oraculo" className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
            <div>
              <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.19em] text-[#c95736]">
                <span className="h-px w-7 bg-[#c95736]" /> O que floresce aqui
              </p>
              <h2 className="max-w-lg font-serif text-4xl leading-[.98] tracking-[-0.06em] sm:text-5xl">Um objeto para sentir, olhar de novo e conversar.</h2>
            </div>
            <p className="max-w-xl text-lg leading-relaxed text-[#52695b] lg:justify-self-end">O Jardim Arquetípico aproxima imagens, intuição e design para tornar visível aquilo que muitas vezes só se percebe por dentro.</p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <Card className="rounded-[1.65rem] border-[#172d24]/10 bg-[#efe5d5] py-0 shadow-none">
              <CardContent className="p-7">
                <BookOpenText size={30} weight="duotone" className="text-[#c95736]" aria-hidden="true" />
                <h3 className="mt-8 font-serif text-3xl tracking-[-0.045em]">30 arquétipos</h3>
                <p className="mt-3 leading-relaxed text-[#52695b]">Personagens e cenas que não fecham uma leitura: abrem caminhos para muitas.</p>
              </CardContent>
            </Card>
            <Card className="rounded-[1.65rem] border-[#172d24]/10 bg-[#d8e1b8] py-0 shadow-none">
              <CardContent className="p-7">
                <Palette size={30} weight="duotone" className="text-[#365042]" aria-hidden="true" />
                <h3 className="mt-8 font-serif text-3xl tracking-[-0.045em]">Imagem como portal</h3>
                <p className="mt-3 leading-relaxed text-[#365042]">Cada ilustração é uma presença: íntima o bastante para tocar e ampla o bastante para permanecer.</p>
              </CardContent>
            </Card>
            <Card className="rounded-[1.65rem] border-[#172d24]/10 bg-[#d6ad67] py-0 shadow-none">
              <CardContent className="p-7">
                <FlowerLotus size={30} weight="duotone" className="text-[#172d24]" aria-hidden="true" />
                <h3 className="mt-8 font-serif text-3xl tracking-[-0.045em]">Ritual cotidiano</h3>
                <p className="mt-3 leading-relaxed text-[#365042]">Uma pausa possível para começar o dia, atravessar uma decisão ou compartilhar uma roda.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-[#e8dac5] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.19em] text-[#c95736]">
                <span className="h-px w-7 bg-[#c95736]" /> o baralho por perto
              </p>
              <h2 className="font-serif text-4xl leading-[.98] tracking-[-0.06em] sm:text-5xl">Há imagens que pedem para morar nas mãos.</h2>
            </div>
            <p className="max-w-sm text-base leading-relaxed text-[#52695b]">Uma pequena amostra do universo visual. A mensagem completa fica guardada para o encontro com o baralho.</p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {cards.map((card, index) => (
              <div key={card.name} className={`group overflow-hidden rounded-[1.35rem] border border-[#172d24]/10 bg-[#f7f1e8] p-1.5 shadow-sm ${index % 2 ? "translate-y-7" : ""}`}>
                <div className="relative aspect-[.65] overflow-hidden rounded-[1.05rem]">
                  <img loading="lazy" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105" src={card.image} alt={`Detalhe da ilustração ${card.name}`} />
                  <div className="absolute inset-x-0 bottom-0 h-[36%] bg-gradient-to-t from-[#172d24]/80 to-transparent" aria-hidden="true" />
                  <p className="absolute bottom-3 left-3 right-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#fffaf2]">{card.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="parcerias" className="bg-[#172d24] px-5 py-20 text-[#fffaf2] sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div className="max-w-xl">
              <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.19em] text-[#d6ad67]">
                <span className="h-px w-7 bg-[#d6ad67]" /> para editoras e parcerias
              </p>
              <h2 className="font-serif text-4xl leading-[.98] tracking-[-0.06em] sm:text-5xl">Um universo pronto para ganhar novas formas.</h2>
              <p className="mt-6 text-lg leading-relaxed text-[#d7e1d0]">O Jardim Arquetípico pode florescer como livro, box, experiência expositiva, projeto de marca ou encontro de criação. A mesma raiz, novas paisagens.</p>
              <Button asChild size="lg" className="mt-8 rounded-full bg-[#d6ad67] px-6 text-[#172d24] hover:bg-[#f0cb85]">
                <a href="#criadoras">Conhecer as criadoras <ArrowRight size={18} weight="bold" aria-hidden="true" /></a>
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <Card className="rounded-[1.5rem] border-[#fffaf2]/15 bg-[#274337] py-0 text-[#fffaf2] shadow-none">
                <CardContent className="p-6">
                  <BookOpenText size={27} weight="duotone" className="text-[#d6ad67]" aria-hidden="true" />
                  <h3 className="mt-12 font-serif text-2xl">Edição</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#d7e1d0]">Livros, boxes, edições especiais e objetos de leitura.</p>
                </CardContent>
              </Card>
              <Card className="rounded-[1.5rem] border-[#fffaf2]/15 bg-[#274337] py-0 text-[#fffaf2] shadow-none">
                <CardContent className="p-6">
                  <Handshake size={27} weight="duotone" className="text-[#d6ad67]" aria-hidden="true" />
                  <h3 className="mt-12 font-serif text-2xl">Encontros</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#d7e1d0]">Rodas, oficinas, ativações e experiências de presença.</p>
                </CardContent>
              </Card>
              <Card className="rounded-[1.5rem] border-[#fffaf2]/15 bg-[#274337] py-0 text-[#fffaf2] shadow-none">
                <CardContent className="p-6">
                  <Leaf size={27} weight="duotone" className="text-[#d6ad67]" aria-hidden="true" />
                  <h3 className="mt-12 font-serif text-2xl">Colaborações</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#d7e1d0]">Projetos autorais para marcas, espaços e comunidades.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="criadoras" className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.19em] text-[#c95736]">
              <span className="h-px w-7 bg-[#c95736]" /> quem cultiva este jardim
            </p>
            <h2 className="font-serif text-4xl leading-[.98] tracking-[-0.06em] sm:text-5xl">Duas mulheres, muitas imagens, um convite à imaginação.</h2>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <Card className="rounded-[1.75rem] border-[#172d24]/10 bg-[#efe5d5] py-0 shadow-none">
              <CardContent className="p-7 sm:p-9">
                <Quotes size={32} weight="fill" className="text-[#c95736]" aria-hidden="true" />
                <p className="mt-7 text-lg leading-relaxed text-[#365042]">Graziela Peres é designer, diretora criativa, curiosa por natureza e pesquisadora. Construiu seu trabalho no encontro entre imagem, narrativa, cultura e intuição.</p>
                <p className="mt-5 leading-relaxed text-[#52695b]">Nos últimos anos, aprofundou sua pesquisa sobre arquétipos, sonhos, natureza e linguagens simbólicas de diferentes tradições. Dessa investigação nasceu o Jardim Arquetípico: um projeto autoral para ampliar a percepção de si e dos ciclos da vida.</p>
                <p className="mt-8 text-sm font-semibold uppercase tracking-[0.15em] text-[#c95736]">Graziela Peres · autora e direção criativa</p>
              </CardContent>
            </Card>
            <Card className="rounded-[1.75rem] border-[#172d24]/10 bg-[#d8e1b8] py-0 shadow-none">
              <CardContent className="p-7 sm:p-9">
                <Quotes size={32} weight="fill" className="text-[#365042]" aria-hidden="true" />
                <p className="mt-7 text-lg leading-relaxed text-[#365042]">Thaís Teófilo é artista visual e designer, com uma prática atravessada pela criação de personagens, narrativas e universos simbólicos.</p>
                <p className="mt-5 leading-relaxed text-[#52695b]">Convidada por Graziela, interpretou visualmente as pesquisas, os símbolos e as narrativas do projeto, criando personagens e cenas entre o íntimo e o coletivo, o natural e o mítico.</p>
                <p className="mt-8 text-sm font-semibold uppercase tracking-[0.15em] text-[#365042]">Thaís Teófilo · ilustrações</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-[#c95736] px-5 py-16 text-[#fffaf2] sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.19em] text-[#ffe1b4]">uma ideia pode começar numa conversa</p>
            <h2 className="mt-5 font-serif text-4xl leading-[.98] tracking-[-0.06em] sm:text-5xl">Se este jardim encontrou lugar na sua curadoria, vamos fazê-lo crescer.</h2>
          </div>
          <div className="flex flex-col items-start gap-4 md:items-end">
            <Button asChild size="lg" className="rounded-full bg-[#fffaf2] px-6 text-[#c95736] hover:bg-[#172d24] hover:text-[#fffaf2]">
              <a href="#inicio">Voltar ao início <ArrowUpRight size={18} weight="bold" aria-hidden="true" /></a>
            </Button>
            <p className="text-sm text-[#ffe1b4]">Jardim Arquetípico · Graziela Peres & Thaís Teófilo</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
