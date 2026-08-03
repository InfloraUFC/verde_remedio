"use client"

import { Button } from "@/shared/ui"

const CREDITS: { name: string; role: string }[] = [
  { name: "Sonia Hirth Alves Pereira", role: "Diretora" },
  { name: "Mariana Ribeiro de Brito", role: "Vice-diretora" },
  { name: "Gustavo Nepomuceno Nogueira", role: "Desenvolvedor" },
  { name: "Isabelly dos Santos Cardoso", role: "Pesquisadora" },
  { name: "Francisco Felipe Alves da Silva", role: "Pesquisador" },
  { name: "João Pedro Pinheiro Bibiano", role: "Pesquisador" },
  { name: "Pâmela Maria Alves De Oliveira", role: "Pesquisadora" },
  { name: "Davi da Silva Lopes", role: "Pesquisador" },
  { name: "Geovanna Braga Sales", role: "Pesquisadora" },
  { name: "Livia Miranda Costa", role: "Persona" },
  { name: "Ivyna Elias da Silva", role: "Designer (personagens)" },
  { name: "Gabriel Nobrega Maia", role: "Designer (personagens)" },
  { name: "Stefany dos Santos Oliveira Lima", role: "Designer (plantas)" },
  { name: "Rylle Alexandre Ribeiro Alves da Silva", role: "Designer (plantas)" },
  { name: "Selma Freire de Brito", role: "Professora orientadora" },
]

type Props = {
  onBack: () => void
}

export function CreditsScreen({ onBack }: Props) {
  return (
    <div className="bg-brick-frame flex min-h-dvh items-center justify-center p-6">
      <div className="bg-parchment flex max-h-[85vh] w-full max-w-lg flex-col gap-4 rounded-xl p-8 shadow-2xl ring-1 ring-black/10">
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold text-emerald-900">
            Créditos
          </h2>
          <p className="text-xs text-amber-900/60">Projeto Inflora — UFC</p>
        </div>

        <ul className="flex-1 space-y-1.5 overflow-y-auto pr-1 text-sm">
          {CREDITS.map((person) => (
            <li
              key={person.name}
              className="flex items-baseline justify-between gap-3 border-b border-amber-900/10 py-1.5 last:border-none"
            >
              <span className="text-amber-950">{person.name}</span>
              <span className="text-xs whitespace-nowrap text-amber-900/60">
                {person.role}
              </span>
            </li>
          ))}
        </ul>

        <Button onClick={onBack} variant="outline" className="self-center">
          Voltar
        </Button>
      </div>
    </div>
  )
}
