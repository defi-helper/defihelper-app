import clsx from 'clsx'

import { createComponent } from '~/common/create-component'
import * as styles from './link.css'

type Props<C extends React.ElementType = 'a'> = {
  as?: C
  className?: string
  underline?: 'always' | 'hover' | 'none'
  color?: 'blue' | 'primary'
}

export type LinkProps<C extends React.ElementType = 'a'> = Props<C> &
  Omit<React.ComponentProps<C>, keyof Props<C>>

const Link = <
  C extends React.ElementType = 'a',
  R extends HTMLElement = HTMLAnchorElement
>(
  props: LinkProps<C>,
  ref: React.ForwardedRef<R>
) => {
  const {
    as = 'a',
    underline = 'none',
    className,
    color = 'primary',
    ...restOfProps
  } = props

  const Component = as

  const classNames = clsx(
    styles.root,
    className,
    styles.underlines[underline],
    styles.colors[color]
  )

  return (
    <Component
      ref={ref as React.ForwardedRef<HTMLAnchorElement>}
      className={classNames}
      {...restOfProps}
    />
  )
}

const Component = createComponent(Link)

export { Component as Link }
