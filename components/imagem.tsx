import { cn } from "@/lib/utils";

/**
 * Imagem otimizada (lazy por padrão). Sem `src`, mostra um bloco neutro reservando o lugar.
 * Use `priority` para imagens acima da dobra.
 */
export function Imagem({
  src,
  alt,
  rotulo,
  className,
  width = 720,
  height = 1080,
  priority = false,
  sizes,
}: {
  src?: string;
  alt: string;
  rotulo?: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
}) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : undefined}
        className={cn("h-full w-full object-cover", className)}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={`${alt} (imagem em breve)`}
      className={cn("placeholder-img flex h-full w-full items-end p-3 text-[0.68rem] tracking-wide", className)}
    >
      {rotulo}
    </div>
  );
}
