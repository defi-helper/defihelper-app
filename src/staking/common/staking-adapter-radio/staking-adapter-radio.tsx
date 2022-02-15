import clsx from 'clsx'
import { createComponent } from '~/common/create-component'

import * as styles from './staking-adapter-radio.css'

export type StakingAdapterRadioProps = {
  value: string
  name?: string
  className?: string
  disabled?: boolean
  children?: React.ReactNode
  onChange?: () => void
  onBlur?: () => void
}

export const StakingAdapterRadio = createComponent<
  HTMLInputElement,
  StakingAdapterRadioProps
>(function Radio(props, ref) {
  return (
    <label
      htmlFor={props.value}
      className={clsx(
        styles.root,
        props.disabled && styles.disabled,
        props.className
      )}
    >
      <input
        type="radio"
        id={props.value}
        value={props.value}
        name={props.name}
        className={styles.input}
        ref={ref}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      <span className={styles.radio}>
        <span className={styles.text}>{props.children}</span>
      </span>
    </label>
  )
})
