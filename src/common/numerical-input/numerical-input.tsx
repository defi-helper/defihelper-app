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
  const { negativeOrPositive, onChange, value, ...restProps } = props

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const eventValue = event.target.value.replace(/,/g, '.')

    let regex = INPUT_REGEX.test(escapeRegex(eventValue))

    if (negativeOrPositive) {
      regex = INPUT_REGEX_NEGATIVE_POSITIVE.test(escapeRegex(eventValue))
    }

    const valuePassed = eventValue === '' || regex

    if (!valuePassed) return

    onChange?.({
      ...event,
      target: { ...event.target, value: eventValue },
    })
  }

  return (
    <Input
      {...restProps}
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
