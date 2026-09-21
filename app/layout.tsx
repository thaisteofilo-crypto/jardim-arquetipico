import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jardim Arquetípico — um oráculo visual feminino",
  description: "Um oráculo visual de arquétipos femininos para abrir espaço à imaginação, aos ciclos e à escuta simbólica.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
