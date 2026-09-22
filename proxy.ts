import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_ACESSO, caminhoLivre, tokenDaSenha } from "@/lib/acesso";

// Todo o site fica atrás da chave de acesso. Sem SITE_SENHA configurada, nada é liberado.
export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (caminhoLivre(pathname)) return NextResponse.next();

  const senha = process.env.SITE_SENHA;
  const cookie = request.cookies.get(COOKIE_ACESSO)?.value;
  if (senha && cookie && cookie === (await tokenDaSenha(senha))) return NextResponse.next();

  const entrar = new URL("/entrar", request.url);
  if (pathname !== "/") entrar.searchParams.set("de", pathname + search);
  return NextResponse.redirect(entrar);
}

export const config = {
  matcher: "/((?!_next/static|_next/image).*)",
};
