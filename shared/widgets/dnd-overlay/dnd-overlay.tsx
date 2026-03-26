"use client"

import { DragOverlay } from "@dnd-kit/core"
import { motion } from "framer-motion"

type Props<T> = {
  activeItem: T | undefined
  render: (item: T) => React.ReactNode
}

export function DndOverlay<T>({ activeItem, render }: Props<T>) {
  return (
    <DragOverlay>
      {activeItem ? (
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="shadow-xl"
        >
          {render(activeItem)}
        </motion.div>
      ) : null}
    </DragOverlay>
  )
}