import clsx from 'clsx'

import * as styles from './char-indicator.css'

export type CharIndicatorProps = {
  color: 'green' | 'red'
  className?: string
}

export const CharIndicator: React.FC<CharIndicatorProps> = (props) => {
  const { color, className, ...restOfProps } = props

  return <div className={clsx(styles.root, className)} {...restOfProps} />
}
