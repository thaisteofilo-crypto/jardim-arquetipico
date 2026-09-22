"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { List, X } from "@phosphor-icons/react";

/** Menu do celular: ícone à direita que abre os links num painel. */
export function MenuMobile({ links }: { links: { href: string; label: string }[] }) {
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [aberto]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setAberto((a) => !a)}
        aria-expanded={aberto}
        aria-controls="menu-celular"
        aria-label={aberto ? "Fechar menu" : "Abrir menu"}
        className="grid size-10 place-items-center rounded-full bg-[#f2f1ed] text-[#1c1b19]"
      >
        {aberto ? <X size={20} /> : <List size={20} />}
      </button>

      {aberto &&
        createPortal(
        <div id="menu-celular" className="fixed inset-x-0 bottom-0 top-16 z-30 bg-white md:hidden">
          <nav className="conteiner flex flex-col pt-4" aria-label="Menu">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setAberto(false)}
                className="border-b border-black/[0.07] py-5 font-serif text-[1.8rem] text-[#1c1b19]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/imersao"
              onClick={() => setAberto(false)}
              className="mt-8 rounded-full bg-[#1c1b19] py-4 text-center text-[0.95rem] font-medium text-white"
            >
              Tirar uma carta
            </a>
          </nav>
        </div>,
          document.body,
        )}
    </div>
  );
}
