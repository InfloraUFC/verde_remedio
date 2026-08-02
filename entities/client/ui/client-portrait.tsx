import { UserRound } from "lucide-react"
import { ItemImage } from "@/shared/ui"
import { cn } from "@/lib/utils"
import { Client } from "../model"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  client: Client
}

export function ClientPortrait({ client, ...props }: Props) {
  return (
    <ItemImage
      src={client.portrait}
      alt={client.name}
      icon={<UserRound className="size-10" />}
      {...props}
      className={cn(
        "rounded-full bg-white/70 text-amber-900 ring-2 ring-amber-900/15",
        props.className
      )}
    />
  )
}
