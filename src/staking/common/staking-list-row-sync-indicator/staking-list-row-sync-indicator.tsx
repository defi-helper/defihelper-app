import {
  BlockchainEnum,
  StakingContractFragmentFragment,
} from '~/api/_generated-types'
import { bignumberUtils } from '~/common/bignumber-utils'
import { Link } from '~/common/link'
import { ButtonBase } from '~/common/button-base/button-base'
import { WatcherEventListener } from '../staking.api'

export type StakingListRowSyncIndicatorProps = {
  row: StakingContractFragmentFragment & {
    pools: WatcherEventListener[]
    scannerId?: string
  }
  onContractRegister: () => void
}

const SCANNER_URL = 'https://watcher.defihelper.io/contract'

export const StakingListRowSyncIndicator: React.VFC<StakingListRowSyncIndicatorProps> =
  (props) => {
    const { row, onContractRegister } = props

    if (!row.deployBlockNumber || row.blockchain !== BlockchainEnum.Ethereum) {
      return <>not deployed</>
    }

    if (!row.scannerId || !row.pools.length) {
      return (
        <ButtonBase as={Link} onClick={onContractRegister}>
          register in scanner
        </ButtonBase>
      )
    }

    const seemsUnusual = bignumberUtils.gt(
      bignumberUtils.minus(
        row.pools[0].sync.currentBlock,
        row.pools[0].sync.syncHeight
      ),
      100
    )

    return (
      <Link
        href={`${SCANNER_URL}/${row.scannerId}`}
        target="_blank"
        rel="noreferrer"
        style={{
          color: seemsUnusual ? '#ff0000' : '#3eab3a',
        }}
      >
        {row.pools[0].sync.syncHeight}/{row.pools[0].sync.currentBlock}
      </Link>
    )
  }
