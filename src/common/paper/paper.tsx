import React from 'react'
import clsx from 'clsx'

import * as styles from './paper.css'

export type PaperProps = React.ComponentProps<'div'> & {
  as?: React.ElementType
}

export const Paper: React.FC<PaperProps> = (props) => {
  const { as = 'div', className, ...restOfProps } = props

  const Component = as

  return <Component {...restOfProps} className={clsx(styles.root, className)} />
}
