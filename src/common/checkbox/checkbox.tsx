import clsx from 'clsx'
import { forwardRef } from 'react'

import * as styles from './checkbox.css'

export type CheckboxProps = Omit<React.ComponentProps<'input'>, 'type'>

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(props, ref) {
    const { className, ...restOfProps } = props

    return (
      <span className={clsx(styles.root, className)}>
        <input
          {...restOfProps}
          ref={ref}
          type="checkbox"
          className={styles.input}
        />
        <span className={styles.checkbox} />
      </span>
    )
  }
)
