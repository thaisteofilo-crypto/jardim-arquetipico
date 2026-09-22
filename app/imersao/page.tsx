import type { Metadata } from "next";
import { Imersao } from "@/components/imersao";

export const metadata: Metadata = {
  title: "Imersão · Jardim Arquetípico",
  description:
    "Três respirações lentas e uma carta se revela. Entre na imersão do Jardim Arquetípico e descubra qual arquétipo feminino veio encontrar você hoje.",
};

export default function ImersaoPage() {
  return (
    <main>
      {/* Verso em alta resolução já carregado para a fileira e a carta escolhida */}
      <link rel="prefetch" as="image" href="/cartas/verso-p.webp" />
      <link rel="prefetch" as="image" href="/cartas/verso.webp" />
      <Imersao />
    </main>
  );
}
