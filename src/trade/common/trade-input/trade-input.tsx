import clsx from 'clsx'

import { createComponent } from '~/common/create-component'
import { NumericalInput, NumericalInputProps } from '~/common/numerical-input'
import * as styles from './trade-input.css'

export type TradeInputProps = unknown

export const TradeInput = createComponent<
  HTMLInputElement,
  NumericalInputProps
>(function TradeInput(props, ref) {
  const { className, ...restProps } = props

  return (
    <NumericalInput
      {...restProps}
      ref={ref}
      className={clsx(styles.root, className)}
    />
  )
})
