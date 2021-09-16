import clsx from 'clsx'

import { Input } from '~/common/input'
import * as styles from './automation-condition-ethereum-run.css'

export type AutomationConditionEthereumRunProps = {
  className?: string
  onSubmit: () => void
}

export const AutomationConditionEthereumRun: React.VFC<AutomationConditionEthereumRunProps> =
  (props) => {
    return (
      <form className={clsx(styles.root, props.className)}>
        <Input />
      </form>
    )
  }
