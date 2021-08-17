import clsx from 'clsx'

import { Typography } from '~/common/typography'
import * as styles from './chip.css'

export type ChipProps = {
  className?: string
  color:
    | 'grey'
    | 'blue'
    | 'red'
    | 'orange'
    | 'green'
    | 'beige'
    | 'pink'
    | 'purple'
    | 'black'
  variant?: keyof typeof styles.colors
}

export const Chip: React.FC<ChipProps> = (props) => {
  const { variant = 'outlined' } = props

  return (
    <Typography
      variant="h5"
      as="div"
      className={clsx(
        styles.root,
        styles.colors[variant][props.color],
        props.className
      )}
    >
      {props.children}
    </Typography>
  )
}
