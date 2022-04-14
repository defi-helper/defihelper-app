import { useAsyncFn, useAsyncRetry } from 'react-use'
import { ethers } from 'ethers'
import { useMemo } from 'react'

import { bignumberUtils } from '~/common/bignumber-utils'
import { Button } from '~/common/button'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { AppLayout } from '~/layouts'
import { WalletConnect } from '~/wallets/wallet-connect'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { dateUtils } from '~/common/date-utils'
import abi1 from './vesting1.abi.json'
import abi2 from './vesting2.abi.json'
import * as styles from './vesting.css'

export type VestingProps = unknown

const WALLET_MAP = new Map([
  [
    '0x90079B15eAf30388D71E5e194ABcdD5b39C3B404',
    {
      address: '0x45948e9ad7b3fbCbD27FBBf7CfDec814267b443c',
      abi: abi1,
    },
  ],
  [
    '0xdDBB9d55fc46D789ae20A47eBF09aF024df4D692',
    {
      address: '0x420F18789F6d8E7b04f73e7bB42448C702d2aA83',
      abi: abi2,
    },
  ],
])

const NUM = 1 + '0'.repeat(18)
const BLOCK_PER_DAY = '13.3'

export const Vesting: React.VFC<VestingProps> = () => {
  const wallet = walletNetworkModel.useWalletNetwork()

  const correctAccount = WALLET_MAP.has(wallet?.account ?? '')

  const contract = useMemo(() => {
    const contractInterface = WALLET_MAP.get(wallet?.account ?? '')
    const networkProvider = walletNetworkModel.getNetwork(
      wallet?.provider,
      wallet?.chainId
    )

    if (!contractInterface || !networkProvider) return null

    return new ethers.Contract(
      contractInterface.address,
      contractInterface.abi,
      networkProvider.getSigner()
    )
  }, [wallet])

  const isOwner = useAsyncRetry(async () => {
    if (!contract || !wallet?.account) return false

    return contract.owner(wallet.account)
  }, [wallet])

  const periodFinish = useAsyncRetry(async () => {
    if (!contract || !wallet?.account) return null

    return contract.periodFinish(wallet.account)
  }, [contract])
  const earned = useAsyncRetry(async () => {
    if (!contract || !wallet?.account) return null

    return contract.earned(wallet.account)
  }, [contract])
  const rate = useAsyncRetry(async () => {
    if (!contract || !wallet?.account) return null

    return contract.rate(wallet.account)
  }, [contract])

  const [claimState, handleClaim] = useAsyncFn(async () => {
    if (!contract || !wallet?.account) return null

    const gasLimit = bignumberUtils.estimateGas(
      await contract.estimateGas.claim()
    )

    return contract.claim(undefined, {
      gasLimit,
    })
  }, [])

  const dropDate = bignumberUtils.mul(
    bignumberUtils.div(rate.value, NUM),
    BLOCK_PER_DAY
  )

  const dropEnd = bignumberUtils.div(periodFinish.value, BLOCK_PER_DAY)

  return (
    <AppLayout>
      <WalletConnect fallback={<Button>Connect</Button>}>
        <Typography variant="h3" className={styles.title}>
          Pre seed
        </Typography>
        <Paper radius={8} className={styles.root}>
          {correctAccount ? (
            <>
              {isOwner.loading && 'loading...'}
              {isOwner.value === true && !isOwner.loading && (
                <>
                  <div className={styles.row}>
                    <Typography variant="body2" className={styles.label}>
                      Tokens left
                    </Typography>
                    <Typography
                      variant="h4"
                      transform="uppercase"
                      family="mono"
                    >
                      {bignumberUtils.format(
                        bignumberUtils.div(earned.value, NUM)
                      )}
                    </Typography>
                  </div>
                  <div className={styles.row}>
                    <Typography variant="body2" className={styles.label}>
                      Drop date
                    </Typography>
                    <Typography
                      variant="h4"
                      transform="uppercase"
                      family="mono"
                    >
                      {dateUtils.format(dropDate)} DFH / day
                    </Typography>
                  </div>
                  <div className={styles.row}>
                    <Typography variant="body2" className={styles.label}>
                      Drop end
                    </Typography>
                    <Typography
                      variant="h4"
                      transform="uppercase"
                      family="mono"
                    >
                      {dateUtils.format(dropEnd)}
                    </Typography>
                  </div>
                  <Button onClick={handleClaim} loading={claimState.loading}>
                    Claim
                  </Button>
                </>
              )}
              {isOwner.value === false && !isOwner.loading && (
                <Typography variant="body2">you&apos;re not owner</Typography>
              )}
            </>
          ) : (
            <Typography variant="body2">incorrect account</Typography>
          )}
        </Paper>
      </WalletConnect>
    </AppLayout>
  )
}
