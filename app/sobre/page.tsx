import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Imagem } from "@/components/imagem";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sobre · Jardim Arquetípico",
  description:
    "Graziela Peres e Thaís Teófilo: o encontro entre pesquisa simbólica e imagem que deu origem ao Jardim Arquetípico, um oráculo visual de 30 arquétipos femininos.",
};

const pill = "inline-flex rounded-full bg-[#f2f1ed] px-4 py-2 text-[0.85rem] text-[#1c1b19]";


function Pessoa({
  pillTexto,
  nome,
  paragrafos,
  citacao,
  foto,
  imagem,
  invertido = false,
}: {
  pillTexto: string;
  nome: string;
  paragrafos: string[];
  citacao: string;
  foto: string;
  /** Caminho da foto em /public; sem ela, aparece o bloco cinza. */
  imagem?: string;
  invertido?: boolean;
}) {
  return (
    <section className="conteiner mt-28 sm:mt-36">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24">
        <div className={cn("aspect-square overflow-hidden rounded-[28px]", invertido && "md:order-2")}>
          <Imagem src={imagem} alt={`Retrato de ${nome}`} rotulo={foto} width={1000} height={1000} className="object-[50%_22%]" />
        </div>
        <div className="max-w-[36rem]">
          <span className={pill}>{pillTexto}</span>
          <h2 className="mt-6 font-serif text-[2.4rem] font-normal leading-[1.02] sm:text-[3.4rem]">{nome}</h2>
          <p className="mt-8 font-serif text-[1.35rem] font-normal leading-snug text-[#1c1b19] sm:text-[1.55rem]">
            {citacao}
          </p>
          <div className="mt-8 space-y-5 text-[1rem] leading-relaxed text-[#6b6a65]">
            {paragrafos.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Sobre() {
  return (
    <main className="pb-28 sm:pb-36">
      {/* Abertura */}
      <section className="conteiner surgir pt-16 sm:pt-24">
        <span className={pill}>Sobre o Jardim</span>
        <h1 className="mt-7 max-w-[15ch] font-serif text-[2.9rem] font-normal leading-[1.02] sm:text-[4.8rem]">
          Onde a pesquisa encontra a imagem.
        </h1>
        <div className="mt-10 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16">
          <p className="max-w-[34rem] text-[1.08rem] leading-relaxed text-[#6b6a65]">
            O Jardim Arquetípico nasceu de duas mãos. Uma investigou símbolos, sonhos e tradições. A outra deu
            corpo, cor e rosto a cada um deles.
          </p>
          <p className="max-w-[34rem] text-[1.08rem] leading-relaxed text-[#6b6a65]">
            Conceito e ilustração caminharam juntos, carta por carta, até formar um oráculo de 30 arquétipos
            femininos.
          </p>
        </div>
      </section>

      <Pessoa
        pillTexto="Autora · Conceito e pesquisa"
        nome="Graziela Peres"
        foto="Foto de Graziela Peres"
        imagem="/sobre/graziela.webp"
        citacao="Imagem, narrativa, cultura e intuição: é nesse encontro que o trabalho acontece."
        paragrafos={[
          "Graziela Peres é designer, diretora criativa, curiosa por natureza e pesquisadora. Ao longo de sua trajetória, construiu seu trabalho no encontro entre imagem, narrativa, cultura e intuição.",
          "Nos últimos anos, aprofundou sua pesquisa sobre arquétipos, sonhos, natureza e linguagens simbólicas de diferentes tradições, investigando como essas imagens permeiam a experiência contemporânea.",
          "Dessa pesquisa nasceu seu Jardim Arquetípico: um projeto autoral que reúne design, imaginação e reflexão como caminhos para ampliar a percepção de si e dos ciclos da vida. Para dar forma visual a esse imaginário, convidou a artista Thaís Teófilo, que deu vida às imagens do oráculo a partir desse universo simbólico.",
        ]}
      />

      <Pessoa
        invertido
        pillTexto="Ilustração · Artista visual"
        nome="Thaís Teófilo"
        foto="Foto de Thaís Teófilo"
        imagem="/sobre/thais.webp"
        citacao="Transformar ideias abstratas, emoções e imaginários em imagens com atmosfera, presença e significado."
        paragrafos={[
          "Thaís Teófilo é artista visual e designer, com uma prática atravessada pela criação de personagens, narrativas e universos simbólicos. Seu trabalho nasce do encontro entre sensibilidade e experimentação, transformando ideias abstratas, emoções e imaginários em imagens que carregam atmosfera, presença e significado.",
          "No Jardim Arquetípico, foi convidada por Graziela Peres para interpretar visualmente o universo conceitual do projeto. A partir das pesquisas, símbolos e narrativas desenvolvidos pela autora, Thaís criou as ilustrações do oráculo, dando corpo a personagens e cenas que transitam entre o íntimo e o coletivo, o natural e o mítico, o visível e aquilo que só pode ser percebido pela imaginação.",
        ]}
      />

      {/* Fechamento: imagem em todo o banner, caixa branca atrás do texto */}
      <section className="conteiner mt-28 sm:mt-36">
        <div className="relative overflow-hidden rounded-[28px] bg-[#f3c8b4]">
          <img
            src="/secoes/sobre-banner.webp"
            alt="Paisagem com terra vermelha, flores claras e colinas sob o céu rosado"
            width={2000}
            height={1121}
            loading="lazy"
            decoding="async"
            className="block aspect-[2000/1121] w-full object-cover md:absolute md:inset-0 md:h-full md:aspect-auto"
          />
          <div className="relative md:flex md:min-h-[36rem] md:items-center md:justify-end md:p-10 lg:min-h-[42rem] lg:p-14">
            <div className="bg-[#f2f1ed] p-7 sm:p-10 md:max-w-[30rem] md:rounded-[24px] md:bg-white lg:max-w-[34rem] lg:p-12">
              <h2 className="font-serif text-[2.1rem] font-normal leading-[1.06] sm:text-[2.9rem]">
                Um jardim pronto para ganhar o mundo.
              </h2>
              <p className="mt-5 text-[1rem] leading-relaxed text-[#6b6a65]">
                Estamos em busca de editoras e parceiros que queiram cultivar este oráculo com a gente. Ou, se preferir,
                comece sentindo uma carta.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href="/parcerias">Editoras e parcerias</a>
                </Button>
                <Button asChild size="lg" variant="secondary" className="bg-white hover:bg-white/80 md:bg-[#f2f1ed] md:hover:bg-[#e9e8e3]">
                  <a href="/imersao">Tirar uma carta</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
