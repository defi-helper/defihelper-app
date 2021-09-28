import clsx from 'clsx'

import { createComponent } from '~/common/create-component'
import * as styles from './paper.css'

type Props<C extends React.ElementType = 'div'> = {
  as?: C
  radius?: 8 | 24
}

export type PaperProps<C extends React.ElementType = 'div'> = Props<C> &
  Omit<React.ComponentProps<C>, keyof Props<C> | 'radioGroup'>

const Paper = <
  C extends React.ElementType = 'div',
  R extends HTMLElement = HTMLDivElement
>(
  props: PaperProps<C>,
  ref: React.ForwardedRef<R>
) => {
  const { as = 'div', className, radius = 24, ...restOfProps } = props

  const Component = as

  return (
    <Component
      {...restOfProps}
      ref={ref as React.ForwardedRef<HTMLDivElement>}
      className={clsx(styles.root, styles.radius[radius], className)}
    />
  )
}

const Component = createComponent(Paper)

export { Component as Paper }
