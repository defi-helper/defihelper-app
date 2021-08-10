import React, { forwardRef } from 'react'
import clsx from 'clsx'

import * as styles from './paper.css'

export type PaperProps = React.ComponentProps<'div'> & {
  as?: React.ElementType
}

export const Paper = forwardRef<HTMLElement, PaperProps>(function Paper(
  props,
  ref
) {
  const { as = 'div', className, ...restOfProps } = props

  const Component = as

  return (
    <Component
      {...restOfProps}
      ref={ref}
      className={clsx(styles.root, className)}
    />
  )
})
