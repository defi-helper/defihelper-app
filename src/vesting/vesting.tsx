import { useAsyncFn, useAsyncRetry } from 'react-use'
import { ethers } from 'ethers'
import { useMemo } from 'react'
import contracts from '@defihelper/networks/contracts.json'

import { bignumberUtils } from '~/common/bignumber-utils'
import { Button } from '~/common/button'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { AppLayout } from '~/layouts'
import { WalletConnect } from '~/wallets/wallet-connect'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { dateUtils } from '~/common/date-utils'
import vestingAbi from './vesting.abi.json'
import { config } from '~/config'
import { abi } from '~/abi'
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
const GOVERNOR_TOKEN =
  contracts[config.DEFAULT_CHAIN_ID].GovernanceToken.address

export const Vesting: React.VFC<VestingProps> = () => {
  const wallet = walletNetworkModel.useWalletNetwork()

  const account = (wallet?.account ?? '').toLowerCase()

  const correctAccount = WALLET_MAP.has(account)

  const governorBravo = useMemo(() => {
    const networkProvider = walletNetworkModel.getNetwork(
      wallet?.provider,
      wallet?.chainId
    )

    if (!networkProvider) return null

    return new ethers.Contract(
      GOVERNOR_TOKEN,
      abi.GovernanceToken.abi,
      networkProvider.getSigner()
    )
  }, [wallet])

  const vestingContract = useMemo(() => {
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

  const balanceOf = useAsyncRetry(async () => {
    const contractInterface = WALLET_MAP.get(account)

    if (!governorBravo || !contractInterface) return 0

    const result = (
      await governorBravo.balanceOf(contractInterface.address)
    ).toString()

    return bignumberUtils.div(result, NUM)
  }, [governorBravo])

  const currentBlockNumber = useAsyncRetry(async () => {
    const networkProvider = walletNetworkModel.getNetwork(
      wallet?.provider,
      wallet?.chainId
    )

    if (!networkProvider) return 0

    return networkProvider.getBlockNumber()
  }, [wallet])

  const isOwner = useAsyncRetry(async () => {
    if (!vestingContract || !account) return false

    const owner: string = await vestingContract.owner()

    return owner.toLowerCase() === account
  }, [account, vestingContract])

  const periodFinish = useAsyncRetry(async () => {
    if (!vestingContract) return null

    const period = await vestingContract.periodFinish()

    return period.toString()
  }, [vestingContract, wallet])
  const earned = useAsyncRetry(async () => {
    if (!vestingContract) return null

    const result = await vestingContract.earned()

    return result.toString()
  }, [vestingContract, wallet])
  const rate = useAsyncRetry(async () => {
    if (!vestingContract) return null

    const result = await vestingContract.rate()

    return result.toString()
  }, [vestingContract, wallet])

  const [claimState, handleClaim] = useAsyncFn(async () => {
    if (!vestingContract || !wallet?.account) return null

    const gasLimit = bignumberUtils.estimateGas(
      await vestingContract.estimateGas.claim()
    )

    return vestingContract.claim({
      gasLimit,
    })
  }, [vestingContract, wallet])

  const dropRate = bignumberUtils.div(
    bignumberUtils.mul(rate.value, BLOCK_PER_DAY),
    NUM
  )

  const dropEnd = bignumberUtils.mul(
    bignumberUtils.minus(periodFinish.value, currentBlockNumber.value),
    BLOCK_PER_DAY
  )

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
              {isOwner.value && !isOwner.loading && (
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
                      {bignumberUtils.format(balanceOf.value)}
                    </Typography>
                  </div>
                  <div className={styles.row}>
                    <Typography variant="body2" className={styles.label}>
                      Claimable tokens
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
                      Drop rate
                    </Typography>
                    <Typography
                      variant="h4"
                      transform="uppercase"
                      family="mono"
                    >
                      ~
                      {bignumberUtils.format(bignumberUtils.mul(dropRate, 100))}{' '}
                      dfh per day
                    </Typography>
                  </div>
                  <div className={styles.row}>
                    <Typography variant="body2" className={styles.label}>
                      Vesting end
                    </Typography>
                    <Typography
                      variant="h4"
                      transform="uppercase"
                      family="mono"
                    >
                      {dateUtils.format(
                        dateUtils.addDate(Number(dropEnd), 'seconds')
                      )}{' '}
                      (at block: {String(currentBlockNumber.value ?? 0)})
                    </Typography>
                  </div>
                  <Button onClick={handleClaim} loading={claimState.loading}>
                    Claim
                  </Button>
                </>
              )}
              {!isOwner.value && !isOwner.loading && (
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
