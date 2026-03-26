"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface {{componentName}}Props
  extends React.HTMLAttributes<HTMLDivElement> {}

export function {{componentName}}({
  className,
  ...props
}: {{componentName}}Props) {
  return (
    <div
      className={cn("{{fileName}}", className)}
      {...props}
    />
  )
}