import TextField from '@material-ui/core/TextField'
import { forwardRef, useEffect, useState } from 'react'

import { escapeRegex } from '~/common/escape-regex'

const INPUT_REGEX = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group

export const NumericalInput = forwardRef<
  HTMLTextAreaElement | HTMLInputElement,
  React.ComponentProps<typeof TextField>
>((props, ref) => {
  const [value, setValue] = useState(props.value as string)

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
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
    setValue(props.value as string)
  }, [props.value])

  return (
    <TextField
      {...props}
      value={value || ''}
      inputRef={ref}
      onChange={handleChange}
      inputMode="decimal"
      title="Token Amount"
      autoComplete="off"
      autoCorrect="off"
      type="text"
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      pattern="^[0-9]*[.,]?[0-9]*$"
      placeholder="0.0"
      minLength={1}
      maxLength={79}
      spellCheck="false"
    />
  )
})
