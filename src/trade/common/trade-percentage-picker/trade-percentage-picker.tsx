import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { bignumberUtils } from '~/common/bignumber-utils'
import { ButtonBase } from '~/common/button-base'
import * as styles from './trade-percentage-picker.css'

export type TradePercentagePickerProps = {
  className?: string
  onChange?: (value: string) => void
  value?: string
  available?: string
}

const PERCENTAGES = [5, 10, 25, 50, 100].map(String)

export const TradePercentagePicker: React.VFC<TradePercentagePickerProps> = (
  props
) => {
  const [currentPercent, setCurrentPercent] = useState(PERCENTAGES[1])
  const [value, setValue] = useState(props.value ?? '0')

  const handleChange = (percent: string) => () => {
    setCurrentPercent(percent)
  }

  const newValue = bignumberUtils.mul(
    props.available,
    bignumberUtils.div(currentPercent, 100)
  )

  useEffect(() => {
    if (bignumberUtils.eq(value, newValue) || !currentPercent) return

    props.onChange?.(newValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, newValue, currentPercent])

  useEffect(() => {
    setValue(newValue)
  }, [newValue])

  useEffect(() => {
    const [percent] = PERCENTAGES.slice(-1)

    if (bignumberUtils.eq(props.value, props.available)) {
      setCurrentPercent(percent)
    }
  }, [props.value, props.available])

  useEffect(() => {
    if (bignumberUtils.eq(props.value, value)) return

    setCurrentPercent('')
  }, [props.value, value])

  return (
    <div className={clsx(styles.root, props.className)}>
      {PERCENTAGES.map((percent) => (
        <ButtonBase
          key={percent}
          onClick={handleChange(percent)}
          className={clsx(styles.item, {
            [styles.itemActive]: currentPercent === percent,
          })}
        >
          {percent}%
        </ButtonBase>
      ))}
    </div>
  )
}
