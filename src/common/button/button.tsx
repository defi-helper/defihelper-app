import clsx from 'clsx'

import { ButtonBase } from '~/common/button-base'
import { CircularProgress } from '~/common/circular-progress'
import { createComponent } from '~/common/create-component'
import * as styles from './button.css'

type Props<C extends React.ElementType = 'button'> = {
  variant?: 'contained' | 'outlined' | 'light'
  color?: 'primary' | 'secondary' | 'green' | 'blue' | 'pink' | 'lime' | 'red'
  loading?: boolean
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
  as?: C
}

export type ButtonProps<C extends React.ElementType = 'button'> = Props<C> &
  Omit<React.ComponentProps<C>, keyof Props<C>>

const Button = <
  C extends React.ElementType = 'button',
  R extends HTMLElement = HTMLButtonElement
>(
  props: ButtonProps<C>,
  ref: React.ForwardedRef<R>
) => {
  const {
    className,
    children,
    loading,
    variant = 'contained',
    color = 'primary',
    size = 'medium',
    ...restOfProps
  } = props

  const classNames = clsx(
    styles.root,
    className,
    styles.varinats[variant],
    styles.colors[color],
    styles.sizes[size],
    {
      [styles.loading]: loading,
    }
  )

  return (
    <ButtonBase
      className={classNames}
      ref={ref as React.ForwardedRef<HTMLButtonElement>}
      {...restOfProps}
    >
      {loading && <CircularProgress className={styles.circularProgess} />}
      <span
        className={clsx(styles.content, {
          [styles.contentLoading]: loading,
        })}
      >
        {children}
      </span>
    </ButtonBase>
  )
}

const Component = createComponent(Button)

export { Component as Button }
