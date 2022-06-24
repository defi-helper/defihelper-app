import { ButtonBase } from '~/common/button-base'
import { Icon } from '~/common/icon'
import * as styles from './trade-plus-minus.css'

export type TradePlusMinusProps = unknown

export const TradePlusMinus: React.VFC<TradePlusMinusProps> = () => {
  return (
    <div className={styles.root}>
      <ButtonBase className={styles.button}>
        <Icon icon="minus" width="24" height="24" />
      </ButtonBase>
      <ButtonBase className={styles.button}>
        <Icon icon="plus" width="24" height="24" />
      </ButtonBase>
    </div>
  )
}
