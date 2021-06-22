import { createContext, useContext } from 'react'

export const DialogContext = createContext<{
  onOpen: <T = unknown, Y = unknown>(
    node: React.ReactNode,
    resolve: (value: T) => void,
    reject: (value: Y) => void
  ) => void
  onClose: (value?: unknown) => void
  closeOnOverlay: (value: boolean) => void
} | null>(null)

const ERROR_MESSAGE = 'DialogContext is null'

export const useDialogContext = () => {
  const context = useContext(DialogContext)

  if (!context) throw new Error(ERROR_MESSAGE)

  return context
}
