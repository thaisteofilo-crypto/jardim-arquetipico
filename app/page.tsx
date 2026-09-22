import { BookOpenText, Cards, FlowerLotus, HandHeart, MoonStars, Storefront, UsersThree, Wind } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { SecaoDividida } from "@/components/secao-dividida";
import { cartas, familias } from "@/lib/cartas";

// Leque da abertura: posição no arco, giro e altura de cada carta
const leque = [
  { n: 4, giro: -21, y: 58, x: -3 },
  { n: 6, giro: -14, y: 24, x: -2 },
  { n: 19, giro: -7, y: 6, x: -1 },
  { n: 1, giro: 0, y: 0, x: 0 },
  { n: 20, giro: 7, y: 6, x: 1 },
  { n: 24, giro: 14, y: 24, x: 2 },
  { n: 27, giro: 21, y: 58, x: 3 },
];

// Esferas do card "Um baralho completo": cada uma representa um tipo de parceria
const esferas = [
  { imagem: "/secoes/esfera-1.webp", Icone: BookOpenText, rotulo: "Edição e distribuição por editora" },
  { imagem: "/secoes/esfera-2.webp", Icone: Storefront, rotulo: "Lojas, marcas e licenciamento" },
  { imagem: "/secoes/esfera-3.webp", Icone: UsersThree, rotulo: "Rodas e experiências" },
];

const tituloSecao = "font-serif text-[2.2rem] leading-[1.08] sm:text-[2.9rem]";

/** Ilustração sem texto (pasta "Baralho de Arquétipos"). */
function Arte({ n, className, prioridade = false }: { n: number; className?: string; prioridade?: boolean }) {
  return (
    <img
      src={`/cartas/${n}-arte.webp`}
      alt={cartas[n - 1].nome}
      width={720}
      height={1122}
      loading={prioridade ? "eager" : "lazy"}
      fetchPriority={prioridade ? "high" : "auto"}
      decoding="async"
      className={className}
    />
  );
}

export default function Home() {
  return (
    <main className="overflow-x-clip">
      {/* Abertura */}
      <section className="conteiner flex flex-col pt-14 text-center sm:block sm:pt-20">
        <h1 className="surgir mx-auto max-w-[15ch] font-serif text-[2.9rem] leading-[1.02] sm:text-[4.8rem]">
          O campo onde os arquétipos florescem
        </h1>
        <p className="surgir mx-auto mt-6 max-w-[46rem] text-[1rem] leading-relaxed text-[#55544f]" style={{ animationDelay: "150ms" }}>
          Trinta mulheres, cada uma guardando um pedaço do seu ciclo.
          <br className="hidden sm:block" /> Respire, escolha uma carta e deixe a imagem dizer o que as palavras ainda não sabem.
        </p>
        <div className="surgir order-last mt-14 flex flex-wrap items-center justify-center gap-3 sm:order-none sm:mt-9" style={{ animationDelay: "300ms" }}>
          <Button asChild size="lg">
            <a href="/imersao">Tirar uma carta</a>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <a href="/parcerias">
              Para editoras e parcerias
            </a>
          </Button>
        </div>

        {/* Leque de ilustrações */}
        <div
          className="relative mx-auto mt-4 h-[15.5rem] max-w-[62rem] [--passo:5.6rem] sm:mt-14 sm:h-[18rem] sm:[--passo:5.2rem] md:h-[20rem] md:[--passo:6.6rem] lg:h-[23rem] lg:[--passo:8.8rem]"
          aria-label="Algumas ilustrações do baralho"
        >
          {leque.map((c, i) => (
            <div
              key={c.n}
              className={`group absolute bottom-0 left-1/2 w-[9rem] sm:w-[10rem] md:w-[11.5rem] lg:w-[13.5rem] ${i === 0 || i === 6 ? "hidden sm:block" : ""}`}
              style={
                {
                  "--x": `${c.x}`,
                  transform: `translateX(calc(-50% + var(--x) * var(--passo))) translateY(${c.y}px) rotate(${c.giro}deg)`,
                  transformOrigin: "50% 120%",
                  zIndex: 10 - Math.abs(c.x),
                } as React.CSSProperties
              }
            >
              <span className="surgir block" style={{ animationDelay: `${200 + Math.abs(c.x) * 90}ms` }}>
                <Arte
                  n={c.n}
                  prioridade={Math.abs(c.x) <= 1}
                  className="w-full rounded-[14px] shadow-[0_30px_60px_-30px_rgba(40,20,10,0.45)] transition-transform duration-500 group-hover:-translate-y-5 sm:rounded-[18px]"
                />
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Banner da imersão: imagem em todo o banner, tarja branca com o texto à direita */}
      <section className="conteiner mt-36 sm:mt-48">
        <div className="relative overflow-hidden rounded-[28px] bg-[#f2f1ed]">
          <img
            src="/banner-imersao.webp"
            alt="Mulher de olhos fechados entre folhas, sob a lua"
            width={2000}
            height={1121}
            loading="lazy"
            decoding="async"
            className="block aspect-[2000/1121] w-full object-cover md:absolute md:inset-0 md:h-full md:aspect-auto md:object-left"
          />
          <div className="relative md:flex md:min-h-[36rem] md:items-center md:justify-end md:p-10 lg:min-h-[42rem] lg:p-14">
            <div className="bg-[#f2f1ed] p-7 sm:p-10 md:max-w-[30rem] md:rounded-[24px] md:bg-white lg:max-w-[34rem] lg:p-12">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#f2f1ed] px-4 py-2 text-[0.85rem]">
                <Wind size={15} /> Imersão
              </span>
              <p className="mt-6 font-serif text-[1.5rem] leading-[1.25] sm:text-[1.8rem]">
                Três respirações. Trinta cartas viradas. Uma delas chama o seu olhar e se revela para você, com a frase que estava esperando para ser dita.
              </p>
              <Button asChild size="lg" className="mt-8">
                <a href="/imersao">Começar a imersão</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Seções em lista */}
      <section className="conteiner mt-32 sm:mt-40">
        <h2 className={`max-w-[17ch] ${tituloSecao}`}>Um oráculo para cada estação da alma</h2>
        <p className="mt-5 max-w-[36rem] text-[1rem] leading-relaxed text-[#55544f]">
          Às vezes a gente só precisa de uma imagem para lembrar do que já sabe. O jardim acompanha você do silêncio ao gesto.
        </p>

        <div className="mt-20 space-y-24 sm:space-y-32">
          <SecaoDividida
            etiqueta="O oráculo"
            titulo="Trinta espelhos para você se reconhecer"
            itens={[
              { titulo: "Uma frase na voz da própria carta", texto: "Cada arquétipo fala em primeira pessoa. Leia em voz alta e perceba o que se acomoda no corpo.", rotulo: "", imagem: "/secoes/espelhos-1.webp" },
              { titulo: "Luz e sombra, lado a lado", texto: "O dom de cada mulher e o que acontece quando ele passa do ponto. Nada é castigo: tudo é um aviso carinhoso.", rotulo: "", imagem: "/secoes/espelhos-2.webp" },
              { titulo: "Um pequeno ritual para levar para o dia", texto: "A ativação tira a carta do papel e a coloca nas suas mãos. Um gesto simples, para fazer ainda hoje.", rotulo: "", imagem: "/secoes/espelhos-3.webp" },
            ]}
          />
          <SecaoDividida
            invertida
            etiqueta="Seis famílias"
            titulo="Um jardim com canteiros, estações e luas"
            itens={[
              { titulo: "Direções e Centro", texto: familias[0].resumo, rotulo: "", imagem: "/secoes/familias-1.webp" },
              { titulo: "Animais Mestres e Três Mundos", texto: "A serpente, o puma e o condor guardam o mundo de baixo, o do meio e o de cima.", rotulo: "", imagem: "/secoes/familias-2.webp" },
              { titulo: "Quatro Elementos", texto: familias[3].resumo, rotulo: "", imagem: "/secoes/familias-3.webp" },
              { titulo: "Ciclo Lunar", texto: familias[5].resumo, rotulo: "", imagem: "/secoes/familias-4.webp" },
            ]}
          />
        </div>
      </section>

      {/* Grade de cards */}
      <section className="conteiner mt-36 sm:mt-44">
        <h2 className={`max-w-[17ch] ${tituloSecao}`}>Pronto para sair do jardim e chegar às mãos</h2>
        <p className="mt-5 max-w-[36rem] text-[1rem] leading-relaxed text-[#55544f]">
          Ilustrações finalizadas, textos escritos, identidade criada. O Jardim Arquetípico está esperando a editora e as parcerias certas para florescer.
        </p>
        <div className="mt-14 grid gap-3 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div className="flex flex-col items-center rounded-[28px] bg-[#f2f1ed] px-5 py-10 text-center sm:px-6 sm:py-16">
            <h3 className="font-serif text-[1.8rem] leading-tight sm:text-[2.6rem]">Um baralho completo</h3>
            <p className="mt-2 text-[0.92rem] text-[#77766f]">Cartas, livreto e um site para experimentar</p>
            <div className="my-9 flex items-center justify-center sm:my-12">
              {esferas.map(({ imagem, Icone, rotulo }, i) => (
                <div
                  key={imagem}
                  className={`relative shrink-0 overflow-hidden rounded-full border-[6px] border-[#f2f1ed] ${i === 1 ? "z-10 h-32 w-32 sm:h-52 sm:w-52" : "h-24 w-24 sm:h-40 sm:w-40"} ${i === 0 ? "-mr-6 sm:-mr-8" : ""} ${i === 2 ? "-ml-6 sm:-ml-8" : ""}`}
                >
                  <img src={imagem} alt="" width={600} height={600} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                  <span
                    title={rotulo}
                    className={`absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[#1c1b19] shadow-[0_6px_18px_-8px_rgba(28,27,25,0.5)] backdrop-blur-sm ${i === 1 ? "size-11 sm:size-16" : "size-9 sm:size-12"}`}
                  >
                    <Icone size={i === 1 ? 28 : 22} weight="regular" aria-hidden="true" />
                    <span className="sr-only">{rotulo}</span>
                  </span>
                </div>
              ))}
            </div>
            <p className="max-w-[20rem] text-[0.82rem] text-[#8a8983]">Material pronto para edição, coedição ou licenciamento.</p>
            <Button asChild size="lg" className="mt-5">
              <a href="/parcerias">Conhecer as possibilidades</a>
            </Button>
          </div>
          <div className="grid gap-3">
            {[
              { icone: Cards, t: "30 ilustrações autorais", d: "Da Visionária à Ceifadora, cada uma com seu mundo." },
              { icone: FlowerLotus, t: "6 famílias simbólicas", d: "Direções, animais, mundos, elementos, rostos do feminino e luas." },
              { icone: BookOpenText, t: "Textos para cada carta", d: "Frase, palavras-semente, luz, sombra e um ritual de ativação." },
            ].map(({ icone: Icone, t, d }) => (
              <div key={t} className="flex flex-col justify-between rounded-[28px] bg-[#f2f1ed] p-6 sm:min-h-[11rem] sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-serif text-[1.4rem] leading-tight sm:text-[1.7rem]">{t}</h3>
                  <Icone size={26} weight="light" className="shrink-0 text-[#8a8983]" />
                </div>
                <p className="mt-3 max-w-[18rem] text-[0.9rem] leading-relaxed text-[#77766f] sm:mt-6">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Convite */}
      <section className="conteiner mt-16 sm:mt-44">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="flex flex-col justify-between rounded-[28px] bg-[#1f3d2b] p-8 text-white sm:p-12">
            <MoonStars size={30} weight="light" className="text-white" />
            <div className="mt-10 sm:mt-16">
              <h2 className="font-serif text-[1.55rem] lg:whitespace-nowrap leading-[1.1] sm:text-[1.9rem] xl:text-[2.3rem]">Para quem busca um respiro</h2>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-white/85 lg:whitespace-nowrap">Uma carta pode ser a pausa mais bonita do seu dia.</p>
              <Button asChild size="lg" className="mt-8 bg-white text-[#1f3d2b] hover:bg-white/85">
                <a href="/imersao">Tirar uma carta</a>
              </Button>
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-[28px] bg-[#f2f1ed] p-8 sm:p-12">
            <HandHeart size={30} weight="light" className="text-[#8a8983]" />
            <div className="mt-10 sm:mt-16">
              <h2 className="font-serif text-[1.55rem] lg:whitespace-nowrap leading-[1.1] sm:text-[1.9rem] xl:text-[2.3rem]">Para quem quer fazer florescer</h2>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-[#6b6a65] lg:whitespace-nowrap">Editoras, lojas, marcas e rodas: vamos plantar este jardim juntas.</p>
              <Button asChild size="lg" className="mt-8">
                <a href="/parcerias#contato">Quero conversar</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
