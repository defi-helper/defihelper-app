import { useStore } from 'effector-react'
import { animated, useTransition } from '@react-spring/web'

import { Portal } from '~/common/portal'
import { ToastItem } from '~/toasts/common/toast-item'
import * as model from './toast.model'
import * as styles from './toast.css'

export type ToastProviderProps = {
  maxItems?: number
}

const DURATION = 6000

const AnimatedToastItem = animated(ToastItem)

export const ToastProvider: React.FC<ToastProviderProps> = (props) => {
  const toasts = useStore(model.$toasts)

  const handleClose = (key: string) => () => {
    model.removeToast(key)
  }

  const transitions = useTransition(toasts.slice(0, props.maxItems), {
    keys: (item) => item.key,
    from: {
      transform: 1000,
      maxHeight: 0,
      overflow: 0,
    },
    enter: () => async (next) => {
      await next({
        maxHeight: 1000,
        overflow: 1,
      })

      await next({
        transform: 0,
      })
    },
    leave: () => async (next) => {
      await next({
        transform: 1000,
      })

      await next({
        maxHeight: 0,
        overflow: 0,
      })
    },
    config: {
      duration: 200,
      tension: 300,
      friction: 10,
    },
  })

  return (
    <>
      <Portal>
        <div className={styles.root}>
          {transitions(({ transform, maxHeight, overflow }, toast) => (
            <AnimatedToastItem
              autoHideDuration={DURATION}
              key={toast.key}
              onClose={handleClose(toast.key)}
              variant={toast.variant}
              style={{
                transform: transform.to((num) => `translateX(${num}px)`),
                maxHeight: maxHeight.to((num) => `${num}px`),
                overflow: overflow.to((num) => (num ? 'visible' : 'hidden')),
              }}
            >
              {toast.message}
            </AnimatedToastItem>
          ))}
        </div>
      </Portal>
      {props.children}
    </>
  )
}
