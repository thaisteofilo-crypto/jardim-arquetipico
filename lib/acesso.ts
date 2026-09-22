/** Proteção do site por chave de acesso (definida na variável de ambiente SITE_SENHA). */

export const COOKIE_ACESSO = "jardim_acesso";

/** Caminhos liberados sem a chave: a própria tela de entrada e o que ela usa. */
export function caminhoLivre(pathname: string) {
  return (
    pathname === "/entrar" ||
    pathname === "/api/entrar" ||
    pathname.startsWith("/acesso/") ||
    pathname.startsWith("/_next/") ||
    pathname === "/logo-horizontal.svg" ||
    pathname === "/favicon.svg" ||
    pathname === "/favicon.ico"
  );
}

/** O cookie guarda um resumo da chave, nunca a chave em si. */
export async function tokenDaSenha(senha: string) {
  const dados = new TextEncoder().encode(`jardim-arquetipico:${senha}`);
  const hash = await crypto.subtle.digest("SHA-256", dados);
  return Array.from(new Uint8Array(hash), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Só aceita destinos internos, para o redirecionamento não levar para fora do site. */
export function destinoSeguro(valor: string | null | undefined) {
  if (!valor || !valor.startsWith("/") || valor.startsWith("//")) return "/";
  return valor;
}
