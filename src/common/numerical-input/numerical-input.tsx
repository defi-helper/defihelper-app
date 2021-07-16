import { TextField } from '@material-ui/core'

import { escapeRegex } from '~/common/escape-regex'

const INPUT_REGEX = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group

export const NumericalInput: React.FC<React.ComponentProps<typeof TextField>> =
  (props) => {
    const handleChange = (
      event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      const value = event.target.value.replace(/,/g, '.')
      const valuePassed = value === '' || INPUT_REGEX.test(escapeRegex(value))

      if (!valuePassed) return

      props.onChange?.({ ...event, target: { ...event.target, value } })
    }

    return (
      <TextField
        {...props}
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
  }
