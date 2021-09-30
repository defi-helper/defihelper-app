import clsx from 'clsx'
import { forwardRef } from 'react'

import { Typography } from '~/common/typography'
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
  const { className, error, helperText, ...restOfProps } = props

  return (
    <>
      <div className={clsx(styles.root, error && styles.error, className)}>
        <input {...restOfProps} className={styles.input} ref={ref} />
      </div>
      {helperText && <Typography>{helperText}</Typography>}
    </>
  )
})
