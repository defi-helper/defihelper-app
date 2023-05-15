import clsx from 'clsx'
import React from 'react'

import * as styles from './invest-steps-progress.css'

export type InvestStepsProgressProps = {
  current?: number
  success?: number
  className?: string
  steps?: number
}

export const InvestStepsProgress: React.VFC<InvestStepsProgressProps> = (
  props
) => {
  return (
    <div className={clsx(styles.steps, props.className)}>
      {Array.from(Array(props.steps ?? 4), (_, i) => i).map((step) => (
        <div
          key={step}
          className={clsx(styles.stepsItem, {
            [styles.stepsItemCurrent]:
              props.current !== undefined && props.current >= step,
            [styles.stepsItemSuccess]:
              props.success !== undefined && props.success >= step,
          })}
        />
      ))}
    </div>
  )
}
