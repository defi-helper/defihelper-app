import React from 'react'
import clsx from 'clsx'

import * as styles from './gird.css'

export type GridContainerProps = {
  className?: string
  as?: React.ElementType
  variant?: 'md' | 'lg' | 'fluid'
}

export const GridContainer: React.FC<GridContainerProps> = (props) => {
  const { as = 'div', variant = 'lg' } = props

  const Component = as

  return (
    <Component
      className={clsx(
        styles.container,
        styles.variants[variant],
        props.className
      )}
    >
      {props.children}
    </Component>
  )
}
