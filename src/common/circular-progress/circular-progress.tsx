import clsx from 'clsx'

import * as styles from './circular-progress.css'

export type CircularProgressProps = {
  className?: string
  width?: React.CSSProperties['width']
  height?: React.CSSProperties['height']
}

export const CircularProgress: React.VFC<CircularProgressProps> = (props) => {
  const { width = '1em', height = '1em' } = props

  return (
    <div
      className={clsx(styles.root, props.className)}
      style={{ width, height }}
    >
      <svg className={styles.svg} viewBox="22 22 44 44">
        <circle
          className={styles.circle}
          cx="44"
          cy="44"
          r="20.2"
          fill="none"
          strokeWidth="3.6"
        />
      </svg>
    </div>
  )
}
