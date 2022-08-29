import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { ButtonBase } from '~/common/button-base'
import * as styles from './trade-percentage-picker.css'

export type TradePercentagePickerProps = {
  className?: string
  onChange?: (value: string) => void
  value?: string
}

const PERCENTAGES = [5, 10, 25, 50, 100].map(String)

export const TradePercentagePicker: React.VFC<TradePercentagePickerProps> = (
  props
) => {
  const [currentValue, setCurrentValue] = useState(PERCENTAGES[1])

  const handleChange = (percent: string) => () => {
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
