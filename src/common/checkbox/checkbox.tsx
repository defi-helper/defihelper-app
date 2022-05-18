import clsx from 'clsx'

import { createComponent } from '~/common/create-component'
import { Icon } from '~/common/icon'
import * as styles from './checkbox.css'

export type CheckboxProps = Omit<React.ComponentProps<'input'>, 'type'>

export const Checkbox = createComponent<HTMLInputElement, CheckboxProps>(
  function Checkbox(props, ref) {
    const { className, ...restOfProps } = props

    const checked = restOfProps.checked || restOfProps.defaultChecked

    return (
      <span className={clsx(styles.root, checked && styles.checked, className)}>
        <input
          {...restOfProps}
          ref={ref}
          type="checkbox"
          className={styles.input}
        />
        <Icon icon="checkbox" className={styles.checkbox} />
        <Icon icon="checkboxChecked" className={styles.checkboxChecked} />
      </span>
    )
  }
)
