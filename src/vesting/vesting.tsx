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
import vestingAbi from './vesting.abi.json'
import * as styles from './vesting.css'

export type VestingProps = unknown

const WALLET_MAP = new Map([
  [
    '0x7d69FdA38Ab7B7D0f348a472F219e81aA47C4FFF'.toLowerCase(), // Ar
    {
      address: '0x23a833f0058681700A50D8082D6BeC41BAA7DCeb',
    },
  ],
  [
    '0x5932758379c01779d42ba00A721f71a94bd7A35d'.toLowerCase(), // An
    {
      address: '0xDa6e2681B36862e30A380b07d0b14150206cA177',
    },
  ],
  [
    '0xdD52F3b42191c6A95630a949b8883c2e173bD78C'.toLowerCase(), // Demo
    {
      address: '0x2A8f11189E4702DbD10F76A3e4b5FCE53c620910',
    },
  ],
])

const NUM = 1 + '0'.repeat(18)
const BLOCK_PER_DAY = '13.3'

export const Vesting: React.VFC<VestingProps> = () => {
  const wallet = walletNetworkModel.useWalletNetwork()

  const account = (wallet?.account ?? '').toLowerCase()

  const correctAccount = WALLET_MAP.has(account)

  const contract = useMemo(() => {
    const contractInterface = WALLET_MAP.get(account)
    const networkProvider = walletNetworkModel.getNetwork(
      wallet?.provider,
      wallet?.chainId
    )

    if (!contractInterface || !networkProvider) return null

    return new ethers.Contract(
      contractInterface.address,
      vestingAbi,
      networkProvider.getSigner()
    )
  }, [wallet, account])

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
          Pre-seed round
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
                <Typography variant="body2">
                  you&apos;re not the owner
                </Typography>
              )}
            </>
          ) : (
            <Typography variant="body2">Wrong address</Typography>
          )}
        </Paper>
      </WalletConnect>
    </AppLayout>
  )
}
