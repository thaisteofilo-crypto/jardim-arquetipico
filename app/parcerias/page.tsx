import type { Metadata } from "next";
import {
  BookOpenText,
  Books,
  Cards,
  Diamond,
  FlowerLotus,
  Gift,
  Globe,
  Handshake,
  ImageSquare,
  Leaf,
  Moon,
  PaintBrush,
  Palette,
  PenNib,
  Storefront,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import { Imagem } from "@/components/imagem";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FormularioContato } from "@/components/parcerias/formulario-contato";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Editoras e parcerias · Jardim Arquetípico",
  description:
    "Um oráculo visual de 30 arquétipos femininos, com ilustrações autorais finalizadas, textos, livreto e identidade prontos. Conheça formatos de edição, coedição, licenciamento e parcerias.",
};

const pill = "inline-flex items-center gap-2 rounded-full bg-[#f2f1ed] px-4 py-2 text-[0.85rem] text-[#1c1b19]";
const titulo = "font-serif text-[2.3rem] font-normal leading-[1.03] sm:text-[3.4rem]";
const apoio = "text-[1.02rem] leading-relaxed text-[#6b6a65]";


const pronto = [
  {
    icone: PaintBrush,
    titulo: "30 ilustrações autorais",
    texto: "Todas finalizadas. Uma linguagem visual única, coesa do primeiro ao último arquétipo.",
  },
  {
    icone: PenNib,
    titulo: "Texto de cada carta",
    texto: "Frase, palavras-semente, luz, sombra e um ritual de ativação. Escrita breve, feita para ser lida em voz alta.",
  },
  {
    icone: BookOpenText,
    titulo: "Livreto e glossário",
    texto: "O caminho das seis famílias e os símbolos do jardim, explicados com leveza.",
  },
  {
    icone: Palette,
    titulo: "Identidade visual",
    texto: "Tipografia, paleta e linguagem visual definidas. Pronta para virar caixa, livreto e vitrine.",
  },
  {
    icone: Globe,
    titulo: "Site interativo de demonstração",
    texto: "Tiragem, leitura e galeria online. Um jeito de sentir o baralho antes de tê-lo nas mãos.",
    link: { href: "/imersao", rotulo: "Experimentar" },
  },
];

const motivos = [
  {
    icone: FlowerLotus,
    titulo: "Autoconhecimento",
    texto: "Cada vez mais gente busca rituais simples para olhar para dentro, sem dogma e sem pressa.",
  },
  {
    icone: Moon,
    titulo: "Ciclos",
    texto: "Lua, estações, fases da vida. Um vocabulário que voltou a fazer sentido no cotidiano.",
  },
  {
    icone: Leaf,
    titulo: "Sagrado feminino",
    texto: "Arquétipos que acolhem muitas mulheres, em muitas idades, com imagens que não são clichê.",
  },
  {
    icone: Gift,
    titulo: "Objeto de design",
    texto: "Oráculos viraram presente, coleção e peça de mesa. Beleza também é motivo de compra.",
  },
];

const formatos = [
  { icone: Books, titulo: "Edição e distribuição", texto: "Uma editora cuida da produção e leva o jardim às livrarias." },
  { icone: Handshake, titulo: "Coedição", texto: "Custos, decisões e alcance divididos, cada parte com o que faz de melhor." },
  { icone: ImageSquare, titulo: "Licenciamento de imagens", texto: "As ilustrações em cadernos, papelaria, têxteis e objetos." },
  { icone: Diamond, titulo: "Edições especiais", texto: "Tiragens colecionáveis, acabamentos nobres, caixas que pedem para ser guardadas." },
  { icone: Storefront, titulo: "Lojas e marcas parceiras", texto: "Collabs com marcas que conversam com bem-estar, beleza e casa." },
  { icone: UsersThree, titulo: "Rodas e experiências", texto: "Vivências, cursos e encontros guiados pelas cartas." },
];

// Seis famílias em uma linha cada, para ler de relance
const canteiros: [string, string][] = [
  ["Direções e Centro", "Nove caminhos, do Leste ao Centro."],
  ["Animais Mestres", "Serpente, puma e condor: os guardiões."],
  ["Três Mundos", "O que mora embaixo, no meio e em cima."],
  ["Quatro Elementos", "Terra, ar, fogo e água em você."],
  ["Arquétipos do Feminino", "Sete rostos que toda mulher reconhece."],
  ["Ciclo Lunar", "Plantar, crescer, florescer, soltar."],
];

const perguntas = [
  {
    p: "O baralho já está pronto?",
    r: "Sim. As 30 ilustrações estão finalizadas, os textos de todas as cartas estão escritos e a identidade visual está definida. Falta o que uma boa parceria traz: produção gráfica, distribuição e alcance.",
  },
  {
    p: "Vocês têm arquivos em alta resolução?",
    r: "Sim. Os arquivos originais podem ser enviados a editoras e parceiros interessados, junto com uma amostra dos textos.",
  },
  {
    p: "O projeto pode ser adaptado ao catálogo da editora?",
    r: "Pode. Formato das cartas, livreto, acabamento e embalagem são conversas abertas. O coração do jardim, as imagens e os arquétipos, permanece.",
  },
  {
    p: "Existe interesse em edições em outros idiomas?",
    r: "Sim. Os textos são curtos e simbólicos, o que facilita a tradução. Adoraríamos ver o jardim florescer fora do Brasil.",
  },
  {
    p: "Qual é o próximo passo?",
    r: "Uma conversa. Preencha o formulário abaixo e nós enviamos o material de apresentação completo.",
  },
];

export default function Parcerias() {
  return (
    <main className="overflow-x-clip pb-28 sm:pb-36">
      {/* Abertura */}
      <section className="conteiner grid gap-y-8 pt-14 sm:pt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-x-10 lg:gap-y-9">
        <div className="surgir lg:col-start-1 lg:row-start-1 lg:self-end">
          <span className={pill}>Para editoras e parcerias</span>
          <h1 className="mt-7 max-w-[13ch] font-serif text-[2.9rem] font-normal leading-[1.02] sm:text-[4.8rem]">
            Um oráculo pronto para florescer.
          </h1>
          <p className={cn(apoio, "mt-7 max-w-[32rem] text-[1.1rem]")}>
            Trinta arquétipos femininos, ilustrados e escritos com cuidado. O jardim já está plantado. Procuramos
            quem queira levá-lo ao mundo.
          </p>
        </div>

        <div className="surgir aspect-[16/11] w-full overflow-hidden rounded-[28px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
          <Imagem
            src="/secoes/parcerias-hero.webp"
            alt="Paisagem com rio azul, papoulas vermelhas e flores brancas"
            width={1800}
            height={1009}
            priority
          />
        </div>
        <div className="surgir lg:col-start-1 lg:row-start-2 lg:self-start flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href="#contato">
                Quero conversar
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href="/imersao">
                Tirar uma carta
              </a>
            </Button>
          </div>
      </section>

      {/* O que é */}
      <section className="conteiner mt-28 sm:mt-36">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <span className={pill}>O que é</span>
            <h2 className={cn(titulo, "mt-6 max-w-[16ch]")}>Um jardim de 30 arquétipos femininos.</h2>
          </div>
          <div className="space-y-5 lg:pt-14">
            <p className={apoio}>
              Um oráculo visual. Cada carta é uma mulher, uma força, um jeito de estar na vida. Juntas, elas crescem em
              seis canteiros.
            </p>
          </div>
        </div>

        <ol className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-12">
          {canteiros.map(([nome, frase], i) => (
            <li key={nome} className="border-b border-black/[0.08] py-7">
              <span className="font-serif text-[1.05rem] text-[#b3b1aa]">0{i + 1}</span>
              <h3 className="mt-2 font-serif text-[1.55rem] font-normal leading-tight">{nome}</h3>
              <p className="mt-1.5 text-[0.95rem] leading-snug text-[#6b6a65]">{frase}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* O que está pronto */}
      <section className="conteiner mt-28 sm:mt-36">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className={pill}>O que está pronto</span>
            <h2 className={cn(titulo, "mt-6 max-w-[14ch]")}>Tudo o que um baralho precisa.</h2>
          </div>
          <p className={cn(apoio, "max-w-[26rem]")}>
            Não é uma ideia. É um projeto concluído, esperando papel, caixa e boas mãos.
          </p>
        </div>

        <ul className="mt-12 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
          {pronto.map(({ icone: Icone, titulo: t, texto, link }) => (
            <li key={t} className="flex flex-col rounded-[22px] bg-[#f2f1ed] p-6">
              <span className="grid size-10 place-items-center rounded-full bg-white">
                <Icone className="size-5" weight="light" />
              </span>
              <h3 className="mt-5 font-serif text-[1.25rem] font-normal leading-tight">{t}</h3>
              <p className="mt-2 text-[0.86rem] leading-relaxed text-[#6b6a65]">{texto}</p>
              {link && (
                <a href={link.href} className="mt-3 text-[0.86rem] font-medium text-[#1c1b19] underline underline-offset-4 hover:opacity-70">
                  {link.rotulo}
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Por que agora */}
      <section className="conteiner mt-28 sm:mt-36">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className={pill}>Por que agora</span>
            <h2 className={cn(titulo, "mt-6 max-w-[14ch]")}>O tempo das perguntas bonitas.</h2>
            <p className={cn(apoio, "mt-6 max-w-[28rem]")}>
              O oráculo saiu da prateleira esotérica e entrou na mesa de cabeceira, na lista de presentes, no feed.
              O Jardim chega falando essa língua.
            </p>
          </div>
          <ul className="border-t border-black/[0.08]">
            {motivos.map(({ icone: Icone, titulo: t, texto }) => (
              <li key={t} className="grid grid-cols-[3rem_1fr] items-start gap-5 border-b border-black/[0.08] py-8 sm:grid-cols-[3.5rem_minmax(0,14rem)_1fr] sm:gap-8">
                <span className="grid size-12 place-items-center rounded-full bg-[#f2f1ed]">
                  <Icone className="size-6" weight="light" />
                </span>
                <h3 className="font-serif text-[1.6rem] font-normal leading-tight sm:pt-2">{t}</h3>
                <p className="col-start-2 text-[0.98rem] leading-relaxed text-[#6b6a65] sm:col-start-auto sm:pt-3">{texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Formatos: faixa escura, colunas com linhas finas */}
      <section className="conteiner mt-28 sm:mt-36">
        <div className="rounded-[28px] bg-[#1f3d2b] px-6 py-12 text-white sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[0.85rem] text-white">
                Formatos de parceria
              </span>
              <h2 className={cn(titulo, "mt-6 max-w-[16ch] text-white")}>Muitos jeitos de cultivar juntos.</h2>
            </div>
          </div>
          <ul className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3">
            {formatos.map(({ icone: Icone, titulo: t, texto }) => (
              <li key={t} className="border-t border-white/20 py-8 sm:pr-8 lg:pr-10">
                <Icone className="size-7 text-white" weight="light" />
                <h3 className="mt-6 font-serif text-[1.45rem] font-normal leading-tight">{t}</h3>
                <p className="mt-2 max-w-[22rem] text-[0.92rem] leading-relaxed text-white/85">{texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Perguntas */}
      <section className="conteiner mt-28 sm:mt-36">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div>
            <span className={pill}>Perguntas</span>
            <h2 className={cn(titulo, "mt-6 max-w-[12ch]")}>Antes da conversa.</h2>
          </div>
          <Accordion type="single" collapsible className="border-t border-[#1c1b19]/10">
            {perguntas.map(({ p, r }, i) => (
              <AccordionItem key={p} value={`p${i}`} className="border-[#1c1b19]/10">
                <AccordionTrigger className="py-6 font-serif text-[1.25rem] font-normal hover:no-underline sm:text-[1.4rem]">
                  {p}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-[0.98rem] leading-relaxed text-[#6b6a65]">{r}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="conteiner mt-28 scroll-mt-24 sm:mt-36">
        {/* Banner do formulário: imagem ao fundo, caixa branca com o texto e o formulário */}
        <div
          className="relative overflow-hidden rounded-[28px] bg-[#a9c1dd] bg-cover bg-center p-4 sm:p-10 lg:p-20"
          style={{ backgroundImage: "url(/secoes/parcerias-formulario.webp)" }}
        >
          <div className="grid gap-10 rounded-[24px] bg-white p-6 sm:p-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:p-12">
            <div className="flex flex-col">
              <span className="inline-flex self-start rounded-full bg-[#f2f1ed] px-4 py-2 text-[0.85rem]">Contato</span>
              <h2 className={cn(titulo, "mt-6 max-w-[12ch]")}>Vamos conversar?</h2>
              <p className={cn(apoio, "mt-6 max-w-[26rem]")}>
                Conte quem você é e o que imagina. Respondemos com o material de apresentação e com vontade de ouvir.
              </p>
              <a
                href="/sobre"
                className="mt-8 inline-flex items-center gap-2 text-[0.9rem] lg:mt-auto text-[#1c1b19] underline-offset-4 hover:underline"
              >
                Conheça quem criou o Jardim
              </a>
            </div>
            <FormularioContato />
          </div>
        </div>
      </section>
    </main>
  );
}
