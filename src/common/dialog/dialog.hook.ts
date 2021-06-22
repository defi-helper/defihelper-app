import { createElement, useCallback, useEffect } from 'react'

import { useDialogContext } from './dialog.context'

type Arg<T> = T extends { onConfirm: (value: infer Y) => void } ? Y : never

export const useDialog = <T extends React.ElementType>(
  Dialog: T,
  closable?: boolean
) => {
  const { onOpen, onClose, closeOnOverlay } = useDialogContext()

  type Props = T extends React.ElementType<infer Y>
    ? Omit<Y, 'onCancel' | 'onConfirm'>
    : never

  type Result = T extends React.ElementType<infer Y> ? Arg<Y> : never

  const handleOpen = useCallback(
    (props?: Props): Promise<Result> =>
      new Promise((resolve, reject) =>
        onOpen(createElement(Dialog, props), resolve, reject)
      ),
    [Dialog, onOpen]
  )

  useEffect(() => {
    if (closable !== undefined) {
      closeOnOverlay(closable)
    }
  }, [closable, closeOnOverlay])

  return [handleOpen, onClose] as const
}
