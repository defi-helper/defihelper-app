import clsx from 'clsx'

import { Input } from '~/common/input'
import * as styles from './automation-action-ethereum-balance.css'

export type AutomationActionEthereumBalanceProps = {
  className?: string
  onSubmit: () => void
}

export const AutomationActionEthereumBalance: React.VFC<AutomationActionEthereumBalanceProps> =
  (props) => {
    return (
      <form className={clsx(styles.root, props.className)}>
        <Input />
      </form>
    )
  }
