import clsx from 'clsx'

import { createComponent } from '~/common/create-component'
import * as styles from './typography.css'

type Variants =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'inherit'

type TagNames = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'

const variantMapping: Record<Variants, TagNames> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  body1: 'p',
  body2: 'p',
  body3: 'p',
  inherit: 'span',
}

type Props<C extends React.ElementType = 'p'> = {
  variant?: Variants
  align?: 'left' | 'center' | 'right'
  as?: C
  family?: 'square' | 'mono'
  transform?: 'uppercase' | 'lowercase' | 'normal'
}

export type TypographyProps<C extends React.ElementType = 'p'> = Props<C> &
  Omit<React.ComponentProps<C>, keyof Props<C>>

const Typography = <
  C extends React.ElementType = 'p',
  R extends HTMLElement = HTMLParagraphElement
>(
  props: TypographyProps<C>,
  ref: React.ForwardedRef<R>
) => {
  const {
    variant = 'body1',
    align = 'left',
    family = 'square',
    transform = 'normal',
    as,
    className,
    ...restOfProps
  } = props

  const classNames = clsx(
    styles.root,
    className,
    styles.variants[variant],
    styles.aligns[align],
    styles.fontFamilies[family],
    styles.transforms[transform]
  )

  const Component = as ?? variantMapping[variant]

  return (
    <Component
      {...restOfProps}
      className={classNames}
      ref={ref as React.ForwardedRef<HTMLParagraphElement>}
    />
  )
}

const Component = createComponent(Typography)

export { Component as Typography }
