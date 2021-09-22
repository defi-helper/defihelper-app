import React, { useCallback, useRef, useState } from 'react'
import omit from 'lodash.omit'

import { Portal } from '~/common/portal'
import { UserRejectionError } from './dialog.error'
import { DialogContext, Node } from './dialog.context'
import * as styles from './dialog.css'

type Fn = (value: unknown) => void

export const DialogProvider: React.FC = (props) => {
  const [dialogs, setDialogs] = useState<Record<string, Node>>({})
  const [closeOnOverlayClick, setCloseOnOverlayClick] = useState(true)

  const resolveRef = useRef<Record<string, Fn>>({})
  const rejectRef = useRef<Record<string, Fn>>({})

  const handleClose = useCallback(
    (id: string) => () => {
      if (!closeOnOverlayClick) return

      setDialogs((previousDialogs) => omit(previousDialogs, id))
      rejectRef.current[id]?.(new UserRejectionError())
      rejectRef.current = omit(rejectRef.current, id)
    },
    [closeOnOverlayClick]
  )

  const handleOnConfirm = useCallback(
    (id: string) => (value?: unknown) => {
      if (!closeOnOverlayClick) return

      setDialogs((previousDialogs) => omit(previousDialogs, id))
      resolveRef.current[id]?.(value)
      resolveRef.current = omit(resolveRef.current, id)
    },
    [closeOnOverlayClick]
  )

  const handleOpen = useCallback((node: Node, resolve, reject) => {
    setDialogs((previousDialogs) => ({ ...previousDialogs, [node.id]: node }))

    resolveRef.current = {
      ...resolveRef.current,
      [node.id]: resolve,
    }
    rejectRef.current = {
      ...rejectRef.current,
      [node.id]: reject,
    }
  }, [])

  return (
    <DialogContext.Provider
      value={{
        onClose: handleClose,
        onOpen: handleOpen,
        closeOnOverlay: setCloseOnOverlayClick,
      }}
    >
      {Object.values(dialogs).map((node) => (
        <Portal key={node.id}>
          <div
            onMouseDown={handleClose(node.id)}
            aria-hidden="true"
            className={styles.root}
          >
            <node.Dialog
              {...node.props}
              onCancel={handleClose(node.id)}
              onConfirm={handleOnConfirm(node.id)}
            />
          </div>
        </Portal>
      ))}
      {props.children}
    </DialogContext.Provider>
  )
}
