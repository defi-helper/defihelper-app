import { useEffect, useState } from 'react'

import { escapeRegex } from '~/common/escape-regex'
import { createComponent } from '~/common/create-component'
import { Input } from '~/common/input'

const INPUT_REGEX = RegExp(`^\\d*(?:\\\\[.])?\\d*$`)
const INPUT_REGEX_NEGATIVE_POSITIVE = RegExp(`^\\d*(?:\\\\[.])?\\d*$`)

export type NumericalInputProps = React.ComponentProps<typeof Input> & {
  negativeOrPositive?: boolean
}

export const NumericalInput = createComponent<
  HTMLInputElement,
  NumericalInputProps
>(function NumericalInput(props, ref) {
  const [value, setValue] = useState(props.value as string)

  const { negativeOrPositive, ...restProps } = props

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const eventValue = event.target.value.replace(/,/g, '.')

    let regex = INPUT_REGEX.test(escapeRegex(eventValue))

    if (negativeOrPositive) {
      regex = INPUT_REGEX_NEGATIVE_POSITIVE.test(escapeRegex(eventValue))
    }

    const valuePassed = eventValue === '' || regex

    if (!valuePassed) return

    // eslint-disable-next-line no-param-reassign
    event.target.value = eventValue

    props.onChange?.(event)

    setValue(eventValue)
  }

  useEffect(() => {
    if (!props.value) return

    setValue(props.value as string)
  }, [props.value])

  return (
    <Input
      {...restProps}
      value={value || ''}
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
