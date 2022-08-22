import { ButtonBase } from '~/common/button-base'
import { Icon } from '~/common/icon'
import * as styles from './trade-plus-minus.css'

export type TradePlusMinusProps = {
  onPlus: (value: number) => void
  onMinus: (value: number) => void
  min: number
  max: number
  value?: number
}

export const TradePlusMinus: React.VFC<TradePlusMinusProps> = (props) => {
  const { value = 0 } = props

  const handleMinus = () => {
    if (props.min === value) return

    props.onMinus(value - 1)
  }

  const handlePlus = () => {
    if (props.max === value) return

    props.onPlus(value + 1)
  }

  return (
    <div className={styles.root}>
      <ButtonBase className={styles.button} onClick={handleMinus}>
        <Icon icon="minus" width="24" height="24" />
      </ButtonBase>
      <ButtonBase className={styles.button} onClick={handlePlus}>
        <Icon icon="plus" width="24" height="24" />
      </ButtonBase>
    </div>
  )
}
