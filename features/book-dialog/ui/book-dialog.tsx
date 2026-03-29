"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogTrigger, Button, DialogTitle } from "@/shared/ui"
import { BookOpen } from "lucide-react"
import { useBookStore } from "../model"

const PAGES = [
  { left: "Fogo", right: "Água" },
  { left: "Terra", right: "Ar" },
  { left: "Luz", right: "Trevas" },
  { left: "Gelo", right: "Vapor" },
]

export function BookDialog() {
  const { page, isFlipping, nextPage } = useBookStore()

  const current = PAGES[page]
  const next = PAGES[(page + 1) % PAGES.length]

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <BookOpen className="w-5 h-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-175 h-125 p-0 bg-transparent border-none shadow-none">
        <DialogTitle className="hidden"></DialogTitle>
        <div
          className="relative w-full h-full flex rounded-xl overflow-hidden shadow-lg"
          style={{ perspective: "1500px" }}
        >
          <div className="w-1/2 bg-amber-100 p-6 border-r">
            <h2 className="font-bold mb-4">Esquerda</h2>
            <p>{current.left}</p>
          </div>

          <div className="w-1/2 bg-amber-50 p-6">
            <h2 className="font-bold mb-4">Direita</h2>
            <p>{current.right}</p>
          </div>

          <AnimatePresence>
            {isFlipping && (
              <motion.div
                key={page}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: -180 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                  transformOrigin: "left",
                  transformStyle: "preserve-3d",
                  position: "absolute",
                  right: 0,
                  top: 0,
                  width: "50%",
                  height: "100%",
                }}
              >
                <div
                  className="absolute inset-0 bg-amber-50 p-6"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <h2 className="font-bold mb-4">Direita</h2>
                  <p>{current.right}</p>
                </div>

                <div
                  className="absolute inset-0 bg-amber-200 p-6"
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <h2 className="font-bold mb-4">Próxima</h2>
                  <p>{next.left}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => nextPage(PAGES.length)}
            className="absolute right-4 bottom-4"
          >
            ▶
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}