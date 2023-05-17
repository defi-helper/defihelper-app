import { bignumberUtils } from '~/common/bignumber-utils'
import { ButtonBase } from '~/common/button-base'
import { Icon } from '~/common/icon'
import { NumericalInput } from '~/common/numerical-input'
import * as styles from './invest-plus-minus.css'

export type InvestPlusMinusProps = {
  onPlus: (value: string | number) => void
  onMinus: (value: string | number) => void
  min: string | number
  max: string | number
  value?: string | number
  width?: string | number
  disabled?: boolean
  label: string
  type?: 'minus' | 'plus'
}

export const InvestPlusMinus: React.VFC<InvestPlusMinusProps> = (props) => {
  const handleMinus = () => {
    if (bignumberUtils.eq(props.min, props.width)) return

    props.onMinus(Number(props.width) - 1)
  }

  const handlePlus = () => {
    if (bignumberUtils.eq(props.max, props.width)) return

    props.onPlus(Number(props.width) + 1)
  }

  return (
    <div className={styles.root}>
      {props.type === 'minus' && (
        <ButtonBase
          className={styles.button}
          onClick={handleMinus}
          disabled={props.disabled}
        >
          <Icon icon="minus" width="24" height="24" />
        </ButtonBase>
      )}
      <NumericalInput
        value={props.value}
        label={props.label}
        className={styles.input}
        readOnly
      />
      {props.type === 'plus' && (
        <ButtonBase
          className={styles.button}
          onClick={handlePlus}
          disabled={props.disabled}
        >
          <Icon icon="plus" width="24" height="24" />
        </ButtonBase>
      )}
    </div>
  )
}
