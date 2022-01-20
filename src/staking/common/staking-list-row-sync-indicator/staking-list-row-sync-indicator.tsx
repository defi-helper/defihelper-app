import { useInterval } from 'react-use'
import { useMemo, useState } from 'react'
import axios from 'axios'
import { StakingContractFragmentFragment } from '~/graphql/_generated-types'
import { bignumberUtils } from '~/common/bignumber-utils'
import { walletNetworkModel } from '~/wallets/wallet-networks'

export type StakingContractCardProps = {
  row: StakingContractFragmentFragment
}

export const StakingListRowSyncIndicator: React.VFC<StakingContractCardProps> =
  (props) => {
    const { row } = props

    const [currentBlock, setCurrentBlock] = useState(-1)
    const [latestSyncBlock, setLatestSyncBlock] = useState(-1)

    const average = (arr: number[]) =>
      arr.reduce((p, c) => p + c, 0) / arr.length
    const seemsUnusual = bignumberUtils.gt(
      bignumberUtils.minus(currentBlock, latestSyncBlock),
      100
    )

    const walletNetwork = walletNetworkModel.useWalletNetwork()
    const networkProvider = walletNetwork
      ? walletNetworkModel.getNetwork(
          walletNetwork.provider,
          walletNetwork.chainId
        )
      : null

    useMemo(async () => {
      const { id }: { id: string } = (
        await axios.get(
          `https://scanner.defihelper.io/api/contract?network=${row.network}&address=${row.address}`
        )
      ).data

      if (!id) {
        return
      }

      const syncedHeights: { syncHeight: number }[] = (
        await axios.get(
          `https://scanner.defihelper.io/api/contract/${id}/event-listener`
        )
      ).data

      setLatestSyncBlock(average(syncedHeights.map((v) => v.syncHeight)))
    }, [row.address, row.network])

    useInterval(async () => {
      if (!networkProvider) return

      try {
        setCurrentBlock(await networkProvider.getBlockNumber())
      } catch {
        setCurrentBlock(-1)
      }
    }, 3000)

    if (!row.deployBlockNumber || row.blockchain !== 'ethereum') {
      return <>not deployed</>
    }

    return (
      <span
        style={{
          color: seemsUnusual // && props.row.network === props.activeChain
            ? 'red'
            : 'white',
        }}
      >
        {latestSyncBlock}/{currentBlock}
      </span>
    )
  }
