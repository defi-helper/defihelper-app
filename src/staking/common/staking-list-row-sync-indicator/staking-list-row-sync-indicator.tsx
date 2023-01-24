import {
  BlockchainEnum,
  StakingContractFragmentFragment,
} from '~/api/_generated-types'
import { bignumberUtils } from '~/common/bignumber-utils'
import { Link } from '~/common/link'
import { ButtonBase } from '~/common/button-base/button-base'
import { config } from '~/config'
import { Watcher } from '../staking.api'

export type StakingListRowSyncIndicatorProps = {
  row: StakingContractFragmentFragment & {
    watcher?: Watcher
    scannerId?: string
  }
  onContractRegister: () => void
}

const SCANNER_URL = `${config.SCANNER_HOST}/contract`

const RED = '#ff0000'
const GREEN = '#3eab3a'

export const StakingListRowSyncIndicator: React.VFC<StakingListRowSyncIndicatorProps> =
  (props) => {
    const { row, onContractRegister } = props

    if (!row.deployBlockNumber || row.blockchain !== BlockchainEnum.Ethereum) {
      return <>not deployed</>
    }

    if (!row.scannerId || !row.watcher) {
      return (
        <ButtonBase as={Link} onClick={onContractRegister}>
          register in scanner
        </ButtonBase>
      )
    }

    const seemsUnusual = bignumberUtils.gt(
      bignumberUtils.minus(row.watcher?.currentBlock, row.watcher?.syncHeight),
      500
    )

    return (
      <Link
        href={`${SCANNER_URL}/${row.scannerId}`}
        target="_blank"
        rel="noreferrer"
        style={{
          color: seemsUnusual ? RED : GREEN,
        }}
      >
        {row.watcher?.syncHeight}/{row.watcher?.currentBlock}
      </Link>
    )
  }
