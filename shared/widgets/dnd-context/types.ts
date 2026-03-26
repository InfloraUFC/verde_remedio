import {
  DragStartEvent,
  DragMoveEvent,
  DragOverEvent,
  DragEndEvent,
  DragCancelEvent
} from "@dnd-kit/core"

export type OnDragStartType = (event: DragStartEvent) => void
export type OnDragMoveType = (event: DragMoveEvent) => void
export type OnDragOverType = (event: DragOverEvent) => void
export type OnDragEndType = (event: DragEndEvent) => void
export type OnDragCancelType = (event: DragCancelEvent) => void