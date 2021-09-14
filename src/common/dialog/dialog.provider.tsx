/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useRef, useState } from 'react'

import { Portal } from '~/common/portal'
import { UserRejectionError } from './dialog.error'
import { DialogContext, Node } from './dialog.context'
import * as styles from './dialog.css'

type Fn = (value: unknown) => void

export const DialogProvider: React.FC = (props) => {
  const [dialogNode, setDialogNode] = useState<Node | null>(null)
  const [closeOnOverlayClick, setCloseOnOverlayClick] = useState(true)

  const resolveRef = useRef<Fn | null>(null)
  const rejectRef = useRef<Fn | null>(null)

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

  const handleOpen = useCallback((node: Node, resolve, reject) => {
    setDialogNode(node)

    resolveRef.current = resolve
    rejectRef.current = reject
  }, [])

  return (
    <DialogContext.Provider
      value={{
        onClose: handleClose,
        onOpen: handleOpen,
        closeOnOverlay: setCloseOnOverlayClick,
      }}
    >
      {dialogNode && (
        <Portal>
          <div onClick={handleClose} className={styles.root}>
            <dialogNode.Dialog
              {...dialogNode.props}
              onCancel={handleClose}
              onConfirm={handleOnConfirm}
            />
          </div>
        </Portal>
      )}
      {props.children}
    </DialogContext.Provider>
  )
}
