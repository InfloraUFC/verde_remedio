"use client"

import { ClipboardList } from "lucide-react"
import { Button } from "@/shared/ui"

type Props = {
  title: string
  description?: string
  /** Link do Google Forms. Ver comentário no local de uso — hoje é placeholder. */
  formUrl: string
  onContinue: () => void
  continueLabel?: string
}

export function ExternalFormScreen({
  title,
  description,
  formUrl,
  onContinue,
  continueLabel = "Continuar",
}: Props) {
  return (
    <div className="bg-brick-frame flex min-h-dvh items-center justify-center p-6">
      <div className="bg-parchment flex w-full max-w-lg flex-col items-center gap-5 rounded-xl p-10 text-center shadow-2xl ring-1 ring-black/10">
        <ClipboardList className="size-14 text-indigo-700" />

        <h2 className="font-serif text-xl font-bold text-emerald-900">
          {title}
        </h2>

        {description && (
          <p className="text-sm text-amber-900/80">{description}</p>
        )}

        <a href={formUrl} target="_blank" rel="noopener noreferrer">
          <Button size="lg" className="gap-2">
            Abrir formulário
          </Button>
        </a>

        <button
          onClick={onContinue}
          className="text-sm text-amber-900/60 underline underline-offset-2 hover:text-amber-900"
        >
          {continueLabel}
        </button>
      </div>
    </div>
  )
}
