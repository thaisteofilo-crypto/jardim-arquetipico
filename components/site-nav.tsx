import { MenuMobile } from "@/components/menu-mobile";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/oraculo", label: "O oráculo" },
  { href: "/imersao", label: "Imersão" },
  { href: "/sobre", label: "Sobre" },
  { href: "/parcerias", label: "Parcerias" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md">
      <div className="conteiner flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
        <a href="/" className="shrink-0" aria-label="Jardim Arquetípico, início">
          <img src="/logo-horizontal.svg" alt="Jardim Arquetípico" width={226} height={28} className="h-[22px] w-auto sm:h-[28px]" />
        </a>
        <nav className="flex items-center gap-4 text-[0.85rem] text-[#55544f] lg:gap-9" aria-label="Navegação principal">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="hidden shrink-0 transition-colors hover:text-[#1c1b19] md:block">
              {link.label}
            </a>
          ))}
          <Button asChild size="sm" className="hidden h-10 px-5 text-[0.8rem] md:inline-flex">
            <a href="/imersao">Tirar uma carta</a>
          </Button>
          <MenuMobile links={links} />
        </nav>
      </div>
    </header>
  );
}
