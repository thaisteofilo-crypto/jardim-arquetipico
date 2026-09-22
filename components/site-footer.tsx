export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-black/[0.07]">
      <div className="conteiner grid gap-10 py-14 text-[0.85rem] text-[#6b6a65] md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <img src="/logo-horizontal.svg" alt="Jardim Arquetípico" width={200} height={25} className="h-[22px] w-auto" loading="lazy" />
          <p className="mt-5 max-w-[22rem] leading-relaxed">
            Um oráculo visual de 30 arquétipos femininos. Conceito e textos de Graziela Peres, ilustrações de Thaís Teófilo.
          </p>
        </div>
        <nav className="flex flex-col gap-2.5" aria-label="Rodapé">
          <a href="/oraculo" className="hover:text-[#1c1b19]">O oráculo</a>
          <a href="/imersao" className="hover:text-[#1c1b19]">Imersão</a>
          <a href="/sobre" className="hover:text-[#1c1b19]">Sobre</a>
        </nav>
        <div className="flex flex-col gap-2.5">
          <a href="/parcerias" className="hover:text-[#1c1b19]">Editoras e parcerias</a>
          <a href="/parcerias#contato" className="hover:text-[#1c1b19]">Contato</a>
          <p className="mt-4 text-[0.78rem] text-[#8a8983]">© {new Date().getFullYear()} Jardim Arquetípico</p>
        </div>
      </div>
    </footer>
  );
}
