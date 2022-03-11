import clsx from 'clsx'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useEffect, useState } from 'react'

import { bignumberUtils } from '~/common/bignumber-utils'
import { NumericalInput } from '~/common/numerical-input'
import * as styles from './referral-input-slider.css'

export type ReferralInputSliderProps = {
  className?: string
  max: number
  value?: string | number
  onChange?: (value: number | number[]) => void
}

export const ReferralInputSlider: React.VFC<ReferralInputSliderProps> = (
  props
) => {
  const [value, setValue] = useState(String(props.value ?? 0))

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (bignumberUtils.gt(event.target.value, props.max)) return

    props.onChange?.(Number(event.target.value))

    setValue(event.target.value)
  }

  useEffect(() => {
    setValue(props.value as string)
  }, [props.value])

  return (
    <div className={clsx(styles.root, props.className)}>
      <NumericalInput
        className={styles.input}
        onChange={handleChange}
        value={value}
      />
      <Slider
        className={styles.slider}
        min={0}
        value={Number(props.value)}
        max={props.max}
        onChange={props.onChange}
        defaultValue={3}
      />
    </div>
  )
}
