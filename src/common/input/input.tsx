import clsx from 'clsx'
import { forwardRef, useEffect, useState } from 'react'
import { Typography } from '../typography'

import * as styles from './input.css'

export type InputProps = React.ComponentProps<'input'> & {
  label?: string
  helperText?: string
  error?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  props,
  ref
) {
  const {
    className,
    label,
    onFocus,
    onBlur,
    onChange,
    value = '',
    defaultValue = '',
    error,
    helperText,
    placeholder,
    ...restOfProps
  } = props

  const [focused, setFocus] = useState(false)
  const [localValue, setLocalValue] = useState(value || defaultValue)

  const handleOnFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    onFocus?.(event)

    setFocus(true)
  }

  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(event)

    setFocus(false)
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event)

    setLocalValue(event.target.value)
  }

  useEffect(() => {
    if (!value) return

    setLocalValue(value)
  }, [value])

  return (
    <>
      <div className={clsx(styles.root, className)}>
        <label
          htmlFor={restOfProps.id}
          className={clsx(styles.label, {
            [styles.focusedLabel]: focused || Boolean(localValue),
            [styles.error]: error,
          })}
        >
          {label}
        </label>
        <input
          {...restOfProps}
          className={styles.input}
          value={localValue}
          ref={ref}
          placeholder={focused ? placeholder : undefined}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onChange={handleOnChange}
        />
      </div>
      {helperText && <Typography>{helperText}</Typography>}
    </>
  )
})
