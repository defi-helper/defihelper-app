import clsx from 'clsx'

import { escapeRegex } from '~/common/escape-regex'
import { createComponent } from '~/common/create-component'
import { Input } from '~/common/input'
import { bignumberUtils } from '~/common/bignumber-utils'
import * as styles from './numerical-input.css'

const INPUT_REGEX = RegExp(`^\\d*(?:\\\\[.])?\\d*$`)

export type NumericalInputProps = Omit<
  React.ComponentProps<typeof Input>,
  'size'
> & {
  negative?: boolean
  min?: number | string
  max?: number | string
  size?: 'small'
}

export const NumericalInput = createComponent<
  HTMLInputElement,
  NumericalInputProps
>(function NumericalInput(props, ref) {
  const { negative, onChange, value, size, className, ...restProps } = props

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const eventValue = event.target.value.replace(/,/g, '.').replace(/-/g, '')

    const regex = INPUT_REGEX.test(escapeRegex(eventValue))

    const valuePassed = eventValue === '' || regex

    if (
      !valuePassed ||
      (props.min !== undefined &&
        props.max !== undefined &&
        bignumberUtils.gt(eventValue, props.min) &&
        bignumberUtils.gt(eventValue, props.max))
    )
      return

    onChange?.({
      ...event,
      target: { ...event.target, value: eventValue },
      currentTarget: { ...event.currentTarget, value: eventValue },
    })
  }

  return (
    <Input
      {...restProps}
      className={clsx(size === 'small' && styles.small, className)}
      value={value}
      ref={ref}
      onChange={handleChange}
      inputMode="decimal"
      autoComplete="off"
      autoCorrect="off"
      type="text"
      pattern="^[0-9]*[.,]?[0-9]*$"
      minLength={1}
      maxLength={79}
      spellCheck="false"
    />
  )
})
