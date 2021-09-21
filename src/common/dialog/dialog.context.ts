import { createContext, useContext } from 'react'

export type Node = {
  Dialog: React.ElementType
  props: unknown
  id: string
}

export const DialogContext = createContext<{
  onOpen: <T = unknown, Y = unknown>(
    node: Node,
    resolve: (value: T) => void,
    reject: (value: Y) => void
  ) => void
  onClose: (id: string) => () => void
  closeOnOverlay: (value: boolean) => void
} | null>(null)

DialogContext.displayName = 'DialogContext'

const ERROR_MESSAGE = 'DialogContext is null'

export const useDialogContext = () => {
  const context = useContext(DialogContext)

  if (!context) throw new Error(ERROR_MESSAGE)

  return context
}
