import { useCallback, useRef, useState } from 'react'
import omit from 'lodash.omit'
import { animated, useTransition } from '@react-spring/web'
import { useMedia } from 'react-use'

import { Portal } from '~/common/portal'
import { UserRejectionError } from './dialog.error'
import { DialogContext, Node, AnimatedContext } from './dialog.context'
import * as styles from './dialog.css'

type Fn = (value: unknown) => void

export const DialogProvider: React.FC = (props) => {
  const [dialogs, setDialogs] = useState<Record<string, Node>>({})
  const [closeOnOverlayClick, setCloseOnOverlayClick] = useState(true)

  const isDesktop = useMedia('(min-width: 960px)')

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

  const transitions = useTransition(Object.values(dialogs), {
    keys: (item) => item.id,
    from: {
      opacity: 0,
      transform: 50,
    },
    enter: {
      opacity: 1,
      transform: 0,
    },
    leave: {
      opacity: 0,
      transform: 50,
    },
    config: {
      duration: 200,
      tension: 300,
      friction: 10,
    },
  })

  return (
    <DialogContext.Provider
      value={{
        onClose: handleClose,
        onOpen: handleOpen,
        closeOnOverlay: setCloseOnOverlayClick,
      }}
    >
      {transitions(({ opacity, transform }, node) => (
        <Portal key={node.id}>
          <div className={styles.root}>
            <AnimatedContext.Provider
              value={{
                style: {
                  transform: transform.to(
                    (num) =>
                      `translate3d(0, ${isDesktop ? -num : num * 2}${
                        isDesktop ? 'px' : '%'
                      }, 0)`
                  ),
                  opacity: isDesktop ? opacity : undefined,
                },
              }}
            >
              <node.Dialog
                {...node.props}
                onCancel={handleClose(node.id)}
                onConfirm={handleOnConfirm(node.id)}
              />
            </AnimatedContext.Provider>
            <animated.div
              onMouseDown={handleClose(node.id)}
              aria-hidden="true"
              className={styles.backdrop}
              style={{ opacity }}
            />
          </div>
        </Portal>
      ))}
      {props.children}
    </DialogContext.Provider>
  )
}
