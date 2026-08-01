import { cn } from "@/lib/utils"
import { ScrollArea } from "@/shared/ui"

type Props = {
  title: string
  className?: string
  contentClassName?: string
  scrollable?: boolean
  children: React.ReactNode
}

export function Shelf({
  title,
  className,
  contentClassName,
  scrollable = false,
  children,
}: Props) {
  const content = (
    <div className={cn("flex flex-col items-center gap-4 p-3", contentClassName)}>
      {children}
    </div>
  )

  return (
    <div
      className={cn(
        "bg-wood-panel flex flex-col rounded-xl ring-1 ring-black/30 shadow-lg",
        className
      )}
    >
      <span className="pt-3 text-center text-[11px] font-bold tracking-wider text-amber-100/90 uppercase drop-shadow-sm">
        {title}
      </span>

      {scrollable ? (
        <ScrollArea className="min-h-0 flex-1">{content}</ScrollArea>
      ) : (
        content
      )}
    </div>
  )
}
