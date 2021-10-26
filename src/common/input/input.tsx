import clsx from 'clsx'
import { forwardRef } from 'react'

import { Typography } from '~/common/typography'
import * as styles from './input.css'

export type InputProps = React.ComponentProps<'input'> & {
  label?: string
  helperText?: React.ReactNode
  error?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  props,
  ref
) {
  const { className, label, error, helperText, ...restOfProps } = props

  return (
    <div
      className={clsx(
        styles.root,
        {
          [styles.error]: error,
          [styles.disabled]: restOfProps.disabled,
        },
        className
      )}
    >
      {label && (
        <Typography
          as="label"
          id={restOfProps.id}
          variant="body2"
          className={clsx(styles.fs14, styles.label)}
        >
          {label}
        </Typography>
      )}
      <input {...restOfProps} className={styles.input} ref={ref} />
      {helperText && (
        <Typography
          variant="body2"
          className={clsx(
            styles.helperText,
            styles.fs14,
            !error && styles.helperTextColor
          )}
          as="span"
        >
          {helperText}
        </Typography>
      )}
    </div>
  )
})
