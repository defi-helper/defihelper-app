import { AnimatedProps, animated } from '@react-spring/web'
import { createContext, useContext } from 'react'

export type Node = {
  Dialog: React.ElementType
  props: unknown
  id: string
}

const DIALOG_ERROR_MESSAGE = 'DialogContext is null'
const ANIMATED_ERROR_MESSAGE = 'AnimatedContext is null'

export const DialogContext = createContext<{
  onOpen: <T = unknown, Y = unknown>(
    node: Node,
    resolve: (value: T) => void,
    reject: (value: Y) => void
  ) => void
  onClose: (id: string) => (...args: unknown[]) => void
  closeOnOverlay: (value: boolean) => void
} | null>(null)

DialogContext.displayName = 'DialogContext'

export const useDialogContext = () => {
  const context = useContext(DialogContext)

  if (!context) throw new Error(DIALOG_ERROR_MESSAGE)

  return context
}

export const AnimatedContext = createContext<AnimatedProps<
  React.ComponentProps<typeof animated.div>
> | null>(null)

AnimatedContext.displayName = 'AnimatedContext'

export const useAnimatedContext = () => {
  const context = useContext(AnimatedContext)

  if (!context) throw new Error(ANIMATED_ERROR_MESSAGE)

  return context
}
