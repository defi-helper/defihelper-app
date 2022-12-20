import { bignumberUtils } from '~/common/bignumber-utils'
import { ButtonBase } from '~/common/button-base'
import { Icon } from '~/common/icon'
import * as styles from './trade-plus-minus.css'

export type TradePlusMinusProps = {
  onPlus: (value: string | number) => void
  onMinus: (value: string | number) => void
  min: string | number
  max: string | number
  value?: string | number
  disabled?: boolean
}

export const TradePlusMinus: React.VFC<TradePlusMinusProps> = (props) => {
  const { value = 0 } = props

  const handleMinus = () => {
    if (bignumberUtils.eq(props.min, value)) return

    props.onMinus(bignumberUtils.minus(value, 1))
  }

  const handlePlus = () => {
    if (bignumberUtils.eq(props.max, value)) return

    props.onPlus(bignumberUtils.plus(value, 1))
  }

  return (
    <div className={styles.root}>
      <ButtonBase
        className={styles.button}
        onClick={handleMinus}
        disabled={props.disabled}
      >
        <Icon icon="minus" width="24" height="24" />
      </ButtonBase>
      <ButtonBase
        className={styles.button}
        onClick={handlePlus}
        disabled={props.disabled}
      >
        <Icon icon="plus" width="24" height="24" />
      </ButtonBase>
    </div>
  )
}
