import { forwardRef, useEffect, useState } from 'react'

import { escapeRegex } from '~/common/escape-regex'
import { Input } from '../input'

const INPUT_REGEX = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group

export const NumericalInput = forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof Input>
>(function NumericalInput(props, ref) {
  const [value, setValue] = useState(props.value as string)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const eventValue = event.target.value.replace(/,/g, '.')
    const valuePassed =
      eventValue === '' || INPUT_REGEX.test(escapeRegex(eventValue))

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
      {...props}
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
