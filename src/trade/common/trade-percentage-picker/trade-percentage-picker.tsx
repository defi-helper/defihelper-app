import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { ButtonBase } from '~/common/button-base'
import * as styles from './trade-percentage-picker.css'

export type TradePercentagePickerProps = {
  className?: string
  onChange?: (value: number) => void
}

const PERCENTAGES = [5, 10, 25, 50, 100]

export const TradePercentagePicker: React.VFC<TradePercentagePickerProps> = (
  props
) => {
  const [currentValue, setCurrentValue] = useState(PERCENTAGES[0])

  const handleChange = (percent: number) => () => {
    setCurrentValue(percent)
  }

  useEffect(() => {
    props.onChange?.(currentValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentValue])

  return (
    <div className={clsx(styles.root, props.className)}>
      {PERCENTAGES.map((percent) => (
        <ButtonBase
          key={percent}
          onClick={handleChange(percent)}
          className={clsx(styles.item, {
            [styles.itemActive]: currentValue === percent,
          })}
        >
          {percent}%
        </ButtonBase>
      ))}
    </div>
  )
}
