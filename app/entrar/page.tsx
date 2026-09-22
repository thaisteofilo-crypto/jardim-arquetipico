import type { Metadata } from "next";
import { LockSimple } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { destinoSeguro } from "@/lib/acesso";

export const metadata: Metadata = {
  title: "Entrar · Jardim Arquetípico",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ erro?: string; de?: string }> };

export default async function Entrar({ searchParams }: Props) {
  const { erro, de } = await searchParams;

  return (
    // Cobre a navegação e o rodapé: a tela de entrada é a única coisa visível
    <main className="fixed inset-0 z-[60] overflow-y-auto">
      <picture>
        <source media="(max-width: 767px)" srcSet="/acesso/fundo-mobile.webp" />
        <img
          src="/acesso/fundo.webp"
          alt=""
          width={2000}
          height={1121}
          fetchPriority="high"
          className="fixed inset-0 -z-10 h-full w-full object-cover"
        />
      </picture>

      <div className="flex min-h-full items-center justify-center p-4 sm:p-8">
        <form
          action="/api/entrar"
          method="post"
          className="surgir w-full max-w-[26rem] rounded-[28px] bg-white/95 p-7 shadow-[0_40px_80px_-30px_rgba(28,27,25,0.5)] backdrop-blur-md sm:p-10"
        >
          <img src="/logo-horizontal.svg" alt="Jardim Arquetípico" width={226} height={28} className="h-[22px] w-auto" />
          <h1 className="mt-8 font-serif text-[2.2rem] leading-[1.05]">Um jardim ainda guardado</h1>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-[#6b6a65]">
            Este oráculo está florescendo em segredo. Digite a chave de acesso para entrar.
          </p>

          <input type="hidden" name="de" value={destinoSeguro(de)} />
          <label htmlFor="senha" className="mt-7 block text-[0.85rem] text-[#6b6a65]">
            Chave de acesso
          </label>
          <div className="relative mt-2">
            <LockSimple size={18} aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a8983]" />
            <input
              id="senha"
              name="senha"
              type="password"
              required
              autoFocus
              autoComplete="current-password"
              aria-invalid={erro ? true : undefined}
              aria-describedby={erro ? "erro-senha" : undefined}
              className="h-12 w-full rounded-full border-0 bg-[#f2f1ed] pl-11 pr-4 text-[0.95rem] outline-none focus-visible:ring-2 focus-visible:ring-[#1c1b19]/20"
            />
          </div>
          {erro && (
            <p id="erro-senha" role="alert" className="mt-3 text-[0.85rem] text-[#b3412a]">
              Essa chave não abre o jardim. Tente de novo.
            </p>
          )}

          <Button type="submit" size="lg" className="mt-6 w-full">
            Entrar
          </Button>
        </form>
      </div>
    </main>
  );
}
