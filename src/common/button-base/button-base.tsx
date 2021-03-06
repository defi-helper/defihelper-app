import clsx from 'clsx'

import { createComponent } from '~/common/create-component'
import * as styles from './button-base.css'

type Props<C extends React.ElementType = 'button'> = {
  as?: C
  disabled?: boolean
}

export type ButtonBaseProps<C extends React.ElementType = 'button'> = Props<C> &
  Omit<React.ComponentProps<C>, keyof Props<C>>

export const ButtonBase = createComponent(function ButtonBase<
  C extends React.ElementType = 'button',
  R extends HTMLElement = HTMLButtonElement
>(props: ButtonBaseProps<C>, ref: React.ForwardedRef<R>) {
  const { as = 'button', type = 'button', className, ...restOfProps } = props

  const Component = as

  const classNames = clsx(styles.root, className, {
    [styles.disabled]: props.disabled,
  })

  return (
    <Component
      {...restOfProps}
      ref={ref as React.ForwardedRef<HTMLButtonElement>}
      className={classNames}
      type={as === 'button' ? type : undefined}
    />
  )
})
