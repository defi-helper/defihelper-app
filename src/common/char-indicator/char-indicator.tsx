import clsx from 'clsx'

import { createComponent } from '~/common/create-component'
import * as styles from './char-indicator.css'

type Props<C extends React.ElementType = 'button'> = {
  as?: C
  color: keyof typeof styles.colors
  className?: string
}

export type CharIndicatorProps<C extends React.ElementType = 'div'> = Props<C> &
  Omit<React.ComponentProps<C>, keyof Props<C>>

export const CharIndicator = createComponent(function CharIndicator<
  C extends React.ElementType = 'div',
  R extends HTMLElement = HTMLDivElement
>(props: CharIndicatorProps<C>, ref: React.ForwardedRef<R>) {
  const { color, className, ...restOfProps } = props

  return (
    <span
      ref={ref}
      className={clsx(styles.root, className, styles.colors[color])}
      {...restOfProps}
    />
  )
})
