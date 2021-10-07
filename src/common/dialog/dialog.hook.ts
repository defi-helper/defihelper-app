import { useCallback, useEffect, useRef } from 'react'
import { nanoid } from 'nanoid'
import { useKey } from 'react-use'

import { useDialogContext } from './dialog.context'

type Arg<T> = T extends { onConfirm: (value: infer Y) => void } ? Y : never

export const useDialog = <T extends React.ElementType>(
  Dialog: T,
  closable?: boolean
) => {
  const { onOpen, onClose, closeOnOverlay } = useDialogContext()

  const id = useRef(nanoid())

  type Props = T extends React.ElementType<infer Y>
    ? Omit<Y, 'onCancel' | 'onConfirm'>
    : never

  type Result = T extends React.ElementType<infer Y> ? Arg<Y> : never

  const handleOpen = useCallback(
    (props?: Props): Promise<Result> => {
      const promise = new Promise<Result>((resolve, reject) =>
        onOpen(
          {
            Dialog,
            props,
            id: id.current,
          },
          resolve,
          reject
        )
      )

      return promise
    },
    [Dialog, onOpen]
  )

  useEffect(() => {
    if (closable !== undefined) {
      closeOnOverlay(closable)
    }
  }, [closable, closeOnOverlay])

  useKey('Escape', onClose(id.current))

  return [handleOpen, onClose(id.current)] as const
}
