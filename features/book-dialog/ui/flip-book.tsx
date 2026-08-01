"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

type Identifiable = { id: string }

type Props<T extends Identifiable> = {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  /** Quantos itens aparecem em cada página (metade do livro). Default: 2. */
  itemsPerPage?: number
}

const FLIP_DURATION = 0.6

function chunk<T>(list: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < list.length; i += size) chunks.push(list.slice(i, i + size))
  return chunks
}

function Page<T extends Identifiable>({
  items,
  renderItem,
}: {
  items: T[]
  renderItem: (item: T) => React.ReactNode
}) {
  return (
    <div className="flex h-full flex-col divide-y divide-amber-900/10">
      {items.map((item) => (
        <div key={item.id} className="flex-1 py-4 first:pt-0 last:pb-0">
          {renderItem(item)}
        </div>
      ))}
    </div>
  )
}

export function FlipBook<T extends Identifiable>({
  items,
  renderItem,
  itemsPerPage = 2,
}: Props<T>) {
  // cada "página" (metade do livro) mostra `itemsPerPage` itens
  const pages = React.useMemo(
    () => chunk(items, itemsPerPage),
    [items, itemsPerPage]
  )

  // cada "spread" (abertura do livro) é formado por 2 páginas: esquerda e direita
  const spreads = React.useMemo(() => chunk(pages, 2), [pages])

  const [page, setPage] = React.useState(0)
  const [direction, setDirection] = React.useState<1 | -1>(1)
  const [isFlipping, setIsFlipping] = React.useState(false)

  // volta pra primeira página sempre que a lista de itens muda (ex: trocar de aba)
  React.useEffect(() => {
    setPage(0)
    setIsFlipping(false)
  }, [items])

  const total = spreads.length
  const current = spreads[page] ?? []
  const nextIndex = (page + 1) % Math.max(total, 1)
  const prevIndex = (page - 1 + total) % Math.max(total, 1)
  const next = spreads[nextIndex] ?? []
  const previous = spreads[prevIndex] ?? []

  const currentLeft = current[0] ?? []
  const currentRight = current[1] ?? []
  const nextLeft = next[0] ?? []
  const previousRight = previous[1] ?? []

  function goNext() {
    if (isFlipping || total <= 1) return
    setDirection(1)
    setIsFlipping(true)
    setTimeout(() => {
      setPage(nextIndex)
      setIsFlipping(false)
    }, FLIP_DURATION * 1000)
  }

  function goPrev() {
    if (isFlipping || total <= 1) return
    setDirection(-1)
    setIsFlipping(true)
    setTimeout(() => {
      setPage(prevIndex)
      setIsFlipping(false)
    }, FLIP_DURATION * 1000)
  }

  return (
    <div
      className="relative flex h-full w-full overflow-hidden"
      style={{ perspective: "1500px" }}
    >
      <div className="h-full w-1/2 overflow-y-auto border-r border-amber-900 bg-amber-50 p-6">
        <Page items={currentLeft} renderItem={renderItem} />
      </div>

      <div className="h-full w-1/2 overflow-y-auto bg-amber-50 p-6">
        <Page items={currentRight} renderItem={renderItem} />
      </div>

      <AnimatePresence>
        {isFlipping && direction === 1 && (
          <motion.div
            key={`next-${page}`}
            initial={{ rotateY: 0 }}
            animate={{ rotateY: -180 }}
            transition={{ duration: FLIP_DURATION, ease: "easeInOut" }}
            className="absolute top-0 right-0 h-full w-1/2"
            style={{ transformOrigin: "left", transformStyle: "preserve-3d" }}
          >
            <div
              className="absolute inset-0 overflow-y-auto bg-amber-50 p-6"
              style={{ backfaceVisibility: "hidden" }}
            >
              <Page items={currentRight} renderItem={renderItem} />
            </div>
            <div
              className="absolute inset-0 overflow-y-auto bg-amber-50 p-6"
              style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
            >
              <Page items={nextLeft} renderItem={renderItem} />
            </div>
          </motion.div>
        )}

        {isFlipping && direction === -1 && (
          <motion.div
            key={`prev-${page}`}
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 180 }}
            transition={{ duration: FLIP_DURATION, ease: "easeInOut" }}
            className="absolute top-0 left-0 h-full w-1/2"
            style={{ transformOrigin: "right", transformStyle: "preserve-3d" }}
          >
            <div
              className="absolute inset-0 overflow-y-auto bg-amber-50 p-6"
              style={{ backfaceVisibility: "hidden" }}
            >
              <Page items={currentLeft} renderItem={renderItem} />
            </div>
            <div
              className="absolute inset-0 overflow-y-auto bg-amber-50 p-6"
              style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
            >
              <Page items={previousRight} renderItem={renderItem} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {total > 1 && (
        <>
          <button
            onClick={goPrev}
            aria-label="Página anterior"
            className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-amber-900/10 p-1.5 hover:bg-amber-900/20"
          >
            <ChevronLeft className="size-5 text-amber-900" />
          </button>
          <button
            onClick={goNext}
            aria-label="Próxima página"
            className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-amber-900/10 p-1.5 hover:bg-amber-900/20"
          >
            <ChevronRight className="size-5 text-amber-900" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-amber-900/50">
            {page + 1} / {total}
          </div>
        </>
      )}
    </div>
  )
}
