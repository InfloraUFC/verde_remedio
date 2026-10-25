"use client"

import * as React from "react"
import {
  BookIcon,
  Button,
  CauldronIcon,
  ChatIcon,
  CurvedArrowIcon,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  HandPointerIcon,
  NotepadIcon,
  PotionIcon,
  StarBurstIcon,
  SwapIcon,
} from "@/shared/ui"
import { MAX_RECIPE_USES } from "@/entities"
import { useTutorialStore } from "../model"

type Step = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  title: string
  text: string
}

const STEPS: Step[] = [
  {
    icon: ChatIcon,
    title: "Atenda o cliente",
    text: "Leia a fala do cliente para descobrir o que ele precisa e escolha a receita certa.",
  },
  {
    icon: HandPointerIcon,
    title: "Arraste ou dê dois cliques",
    text: "Leve plantas, bases e utensílios até o caldeirão arrastando — ou dê dois cliques no item. Cabem até 5 ingredientes e 1 utensílio.",
  },
  {
    icon: SwapIcon,
    title: "Mudou de ideia?",
    text: "Soltar outro utensílio troca o anterior. Para tirar um item da barra, clique no X vermelho.",
  },
  {
    icon: PotionIcon,
    title: "Prepare a poção",
    text: "Com tudo no caldeirão, clique em “Preparar poção” para entregar o remédio ao cliente.",
  },
  {
    icon: StarBurstIcon,
    title: "Ganhe estrelas",
    text: "Receita certa dá 50★ e acerto parcial 25★. Errar custa 1 vida; sem vidas, você volta ao nível 1. Encha a barra para subir de nível.",
  },
  {
    icon: BookIcon,
    title: "Consulte o livro",
    text: "O livro ao lado do caldeirão mostra plantas e receitas. Atenção: abrir o livro em um nível cancela o bônus de 10★ daquele nível.",
  },
  {
    icon: CurvedArrowIcon,
    title: "Varie as receitas",
    text: `O cliente enjoa! Depois de usar a mesma receita ${MAX_RECIPE_USES} vezes, na 3ª ele recusa e você precisa preparar outra.`,
  },
  {
    icon: NotepadIcon,
    title: "Progresso salvo automaticamente",
    text: "Seu jogo é salvo neste navegador a cada jogada. Para continuar depois, use “Carregar Jogo” na tela inicial.",
  },
]

export function TutorialDialog() {
  const open = useTutorialStore((s) => s.open)
  const openTutorial = useTutorialStore((s) => s.openTutorial)
  const closeTutorial = useTutorialStore((s) => s.closeTutorial)

  // abre automaticamente só na primeira vez (flag `seen` vem do localStorage)
  React.useEffect(() => {
    Promise.resolve(useTutorialStore.persist.rehydrate()).then(() => {
      if (!useTutorialStore.getState().seen) openTutorial()
    })
  }, [openTutorial])

  return (
    <Dialog open={open} onOpenChange={(next) => !next && closeTutorial()}>
      <DialogContent className="bg-parchment max-h-[88vh] max-w-xl gap-3 overflow-y-auto">
        <div className="flex items-center gap-3">
          <CauldronIcon className="size-10 shrink-0 text-brand-green" />
          <div>
            <DialogTitle className="font-serif text-xl text-brand-brown">
              Como jogar
            </DialogTitle>
            <DialogDescription>
              Prepare os remédios tradicionais certos para cada cliente.
            </DialogDescription>
          </div>
        </div>

        <ol className="flex flex-col gap-2.5">
          {STEPS.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-start gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-green text-white">
                <Icon className="size-5" />
              </span>
              <div className="text-sm leading-snug text-amber-950">
                <strong className="text-brand-brown">{title}.</strong> {text}
              </div>
            </li>
          ))}
        </ol>

        <Button onClick={closeTutorial} className="mt-1 self-center">
          Entendi, vamos jogar!
        </Button>
      </DialogContent>
    </Dialog>
  )
}
