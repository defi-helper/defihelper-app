/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { cloneElement, useCallback, useRef, useState } from 'react'

import { Portal } from '../portal'
import { UserRejectionError } from './dialog.error'
import { DialogContext } from './dialog.context'

type Fn = (value: unknown) => void

export const DialogProvider: React.FC = (props) => {
  const [dialogNode, setDialogNode] = useState<React.ReactNode | null>(null)
  const [closeOnOverlayClick, setCloseOnOverlayClick] = useState(true)

  const resolveRef = useRef<Fn | null>(null)
  const rejectRef = useRef<Fn | null>(null)

  const handleOpen = useCallback((node: React.ReactNode, resolve, reject) => {
    setDialogNode(node)

    resolveRef.current = resolve
    rejectRef.current = reject
  }, [])

  const handleClose = useCallback(() => {
    if (!closeOnOverlayClick || !rejectRef.current) return

    setDialogNode(null)
    rejectRef.current(new UserRejectionError())
  }, [closeOnOverlayClick])

  const handleOnConfirm = useCallback(
    (value?: unknown) => {
      if (!closeOnOverlayClick || !resolveRef.current) return

      setDialogNode(null)
      resolveRef.current(value)
    },
    [closeOnOverlayClick]
  )

  return (
    <DialogContext.Provider
      value={{
        onClose: handleClose,
        onOpen: handleOpen,
        closeOnOverlay: setCloseOnOverlayClick
      }}
    >
      {dialogNode && React.isValidElement(dialogNode) && (
        <Portal>
          <div onClick={handleClose}>
            {cloneElement(dialogNode, {
              ...dialogNode.props,
              onCancel: handleClose,
              onConfirm: handleOnConfirm
            })}
          </div>
        </Portal>
      )}
      {props.children}
    </DialogContext.Provider>
  )
}
