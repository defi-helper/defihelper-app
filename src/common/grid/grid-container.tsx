import React from 'react'
import clsx from 'clsx'

import * as styles from './gird.css'

export type GridContainerProps = {
  className?: string
  as?: React.ElementType
  variant?: 'md' | 'lg' | 'fluid'
  noGutter?: boolean
}

export const GridContainer: React.FC<GridContainerProps> = (props) => {
  const { as = 'div', variant = 'lg', noGutter = false } = props

  const Component = as

  return (
    <Component
      className={clsx(
        styles.container,
        styles.variants[variant],
        props.className,
        noGutter && styles.noGutter
      )}
    >
      {props.children}
    </Component>
  )
}
