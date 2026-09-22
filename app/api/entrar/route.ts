import { NextResponse } from "next/server";
import { COOKIE_ACESSO, destinoSeguro, tokenDaSenha } from "@/lib/acesso";

export async function POST(request: Request) {
  const dados = await request.formData();
  const tentativa = String(dados.get("senha") ?? "");
  const destino = destinoSeguro(String(dados.get("de") ?? ""));
  const senha = process.env.SITE_SENHA;

  if (!senha || tentativa !== senha) {
    const volta = new URL("/entrar", request.url);
    volta.searchParams.set("erro", "1");
    if (destino !== "/") volta.searchParams.set("de", destino);
    return NextResponse.redirect(volta, 303);
  }

  const resposta = NextResponse.redirect(new URL(destino, request.url), 303);
  resposta.cookies.set(COOKIE_ACESSO, await tokenDaSenha(senha), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return resposta;
}
