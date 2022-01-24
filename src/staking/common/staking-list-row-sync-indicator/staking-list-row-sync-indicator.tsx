import { useMemo, useState } from 'react'
import {
  BlockchainEnum,
  StakingContractFragmentFragment,
} from '~/graphql/_generated-types'
import { bignumberUtils } from '~/common/bignumber-utils'
import { walletNetworkModel } from '~/wallets/wallet-networks'

export type StakingContractCardProps = {
  row: StakingContractFragmentFragment & {
    syncedBlock: number
    scannerId?: string
  }
  currentBlock: number
}

export const StakingListRowSyncIndicator: React.VFC<StakingContractCardProps> =
  (props) => {
    const { row, currentBlock } = props

    const [seemsUnusual, setSeemsUnusual] = useState(false)
    const walletNetwork = walletNetworkModel.useWalletNetwork()

    useMemo(
      () =>
        setSeemsUnusual(
          bignumberUtils.gt(
            bignumberUtils.minus(currentBlock, row.syncedBlock),
            100
          )
        ),
      [currentBlock, row.syncedBlock]
    )

    if (!row.deployBlockNumber || row.blockchain !== BlockchainEnum.Ethereum) {
      return <>not deployed</>
    }

    if (row.network !== walletNetwork?.chainId) {
      return <>wrong network</>
    }

    return (
      <a
        href={`https://scanner.defihelper.io/contract/${row.scannerId}`}
        target="_blank"
        rel="noreferrer"
        style={{
          color: seemsUnusual ? 'red' : 'white',
        }}
      >
        {row.syncedBlock}/{currentBlock}
      </a>
    )
  }
