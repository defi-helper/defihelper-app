import React, { forwardRef } from 'react'
import clsx from 'clsx'

import * as styles from './typography.css'

type Variants = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'body1' | 'body2' | 'inherit'

type TagNames = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'

const variantMapping: Record<Variants, TagNames> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  body1: 'p',
  body2: 'p',
  inherit: 'span',
}

export type TypographyProps = {
  variant?: Variants
  className?: string
  align?: 'left' | 'center' | 'right'
  as?: TagNames | 'span' | 'div' | React.ElementType
  family?: 'square' | 'circle' | 'mono'
  transform?: 'uppercase' | 'lowercase' | 'normal'
  ref?:
    | ((instance: HTMLHeadingElement | null) => void)
    | React.MutableRefObject<HTMLHeadingElement | null>
    | null
  children?: React.ReactNode
} & React.ComponentProps<'div'>

export const Typography = forwardRef<HTMLHeadingElement, TypographyProps>(
  function Typography(props, ref) {
    const {
      variant = 'body1',
      align = 'left',
      family = 'square',
      transform = 'normal',
      as,
      ...restOfProps
    } = props

    const classNames = clsx(
      styles.root,
      props.className,
      styles.variants[variant],
      styles.aligns[align],
      styles.fontFamilies[family],
      styles.transforms[transform]
    )

    const Component = as ?? variantMapping[variant]

    return (
      <Component {...restOfProps} className={classNames} ref={ref}>
        {props.children}
      </Component>
    )
  }
)
