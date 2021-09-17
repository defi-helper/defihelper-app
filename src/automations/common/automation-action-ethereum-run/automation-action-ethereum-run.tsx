import clsx from 'clsx'

import { Button } from '~/common/button'
import { Input } from '~/common/input'
import { WalletType } from '~/graphql/_generated-types'
import * as styles from './automation-action-ethereum-run.css'

export type AutomationActionEthereumRunProps = {
  className?: string
  onSubmit: () => void
  wallets: Pick<
    WalletType,
    'address' | 'id' | 'network' | 'createdAt' | 'blockchain' | 'publicKey'
  >[]
}

export const AutomationActionEthereumRun: React.VFC<AutomationActionEthereumRunProps> =
  (props) => {
    return (
      <form className={clsx(styles.root, props.className)}>
        <Input />
        <Button type="submit" size="small">
          Save
        </Button>
      </form>
    )
  }
