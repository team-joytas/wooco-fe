import type { DroppableProvidedProps } from 'react-beautiful-dnd'

interface Props {
  children: React.ReactNode
  innerRef?: (element: HTMLElement | null) => void
  droppableProps?: DroppableProvidedProps
}

export default function PlaceListComponent(props: Props) {
  const { children, innerRef, droppableProps } = props
  return (
    <div ref={innerRef} {...droppableProps}>
      {children}
    </div>
  )
}
