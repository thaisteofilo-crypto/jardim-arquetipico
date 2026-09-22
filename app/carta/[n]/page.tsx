import { redirect } from "next/navigation";

// As cartas completas só aparecem na imersão.
export default function CartaPage() {
  redirect("/imersao");
}
