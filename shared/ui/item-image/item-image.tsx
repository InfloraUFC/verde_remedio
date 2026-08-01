"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type Props = {
  src?: string
  alt: string
  icon: React.ReactNode
  className?: string
  iconClassName?: string
}

/**
 * Slot de imagem com fallback para um ícone.
 *
 * Enquanto a arte final (planta/instrumento) não é adicionada em
 * `/public/images/...`, o `<img>` falha silenciosamente e o ícone
 * é exibido no lugar. Basta colocar o arquivo no caminho esperado
 * (`ingredient.image` / `instrument.img`) para a imagem aparecer.
 */
export function ItemImage({ src, alt, icon, className, iconClassName }: Props) {
  const [failed, setFailed] = React.useState(false)

  const showFallback = !src || failed

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        className
      )}
    >
      {!showFallback && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className="h-full w-full object-contain"
        />
      )}

      {showFallback && (
        <span className={cn("text-current opacity-70", iconClassName)}>
          {icon}
        </span>
      )}
    </div>
  )
}
