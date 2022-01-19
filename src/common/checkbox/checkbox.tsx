import clsx from 'clsx'

import { createComponent } from '~/common/create-component'
import * as styles from './checkbox.css'

export type CheckboxProps = Omit<React.ComponentProps<'input'>, 'type'>

export const Checkbox = createComponent<HTMLInputElement, CheckboxProps>(
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
