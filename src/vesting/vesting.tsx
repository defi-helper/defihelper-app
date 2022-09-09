import { useAsyncFn, useAsyncRetry, useInterval } from 'react-use'
import { ethers } from 'ethers'
import { useMemo } from 'react'
import contracts from '@defihelper/networks/contracts.json'
import optionAbi from '@defihelper/networks/abi/Option.json'
import { abi as vestingAbi } from '@defihelper/networks/abi/Vesting.json'

import { bignumberUtils } from '~/common/bignumber-utils'
import { Button } from '~/common/button'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { AppLayout } from '~/layouts'
import { WalletConnect } from '~/wallets/wallet-connect'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { dateUtils } from '~/common/date-utils'
import { config } from '~/config'
import { abi } from '~/abi'
import * as styles from './vesting.css'

export type VestingProps = unknown

const WALLET_MAP = new Map<
  string,
  { address: string; abi?: typeof optionAbi.abi }
>([
  [
    '0x9C3c6cF9D29Ab9E9e14503dbfC9aD8bB2A0E37EF'.toLowerCase(),
    {
      address: '0x8F25e48e27C17331565136C75171690192760fD1',
    },
  ],
  [
    '0x4AD9a5549241d61b9f07E27e997BDd351CD35934'.toLowerCase(),
    {
      address: '0x780903c0475E1d02ad46d1C2321c629725A16296',
    },
  ],
  [
    '0x9853372055811fA68ba489824dB417EbfF3F3Bdc'.toLowerCase(),
    {
      address: '0xc4DAC4BC47A29a52d80a47315A14C820369e69B1',
    },
  ],
  [
    '0x45ec3b0b163e868D9AA1E4eAA02c754B33bde9e2'.toLowerCase(),
    {
      address: '0xf52F784333349991f8Bd9952d070b2c12F68dbF2',
    },
  ],
  [
    '0x2032190fc119bbec562e8a557c225410fc1dd10d'.toLowerCase(),
    {
      address: '0x42a4b77D6cCE2FE320c7fc3219A8D3D63a7B44D2',
    },
  ],
  [
    '0xfefa4a9e064f8071e286c590ada4842c8e97cce8'.toLowerCase(),
    {
      address: '0x583d6234ca0c73C750b6E10e973E9506553Ffd3e',
    },
  ],
  [
    '0x4a8b77f8577a6943f0834ab614797f9e63c72b42'.toLowerCase(),
    {
      address: '0xd9ea507785222fA767bB098F909A0D5a63eA8156',
    },
  ],
  [
    '0xc0819e1e01204bcb9cb5a0a3be826afedad6edef'.toLowerCase(),
    {
      address: '0xBd2469EE1092B78953F898EE8c44C4D797270460',
    },
  ],
  [
    '0x8e2f571bcd253fbfd0f614646eba17ac77a7538d'.toLowerCase(),
    {
      address: '0xaFFcd11266ED19a4e0Cf9D2be6feA22c5fCD7dbd',
    },
  ],
  [
    '0xeB9531d74fed20945B07ea34e7978D7E95f0c068'.toLowerCase(),
    {
      address: '0x3f7dCBe6B7eCD57B0021681489D619d67746ddf9',
    },
  ],
  [
    '0x12d3D411d010891a88BFf2401bD73FA41fb1316e'.toLowerCase(),
    {
      address: '0x115289B270b4BD5d5b82Bc1D23155De2A9ef905A',
    },
  ],
  [
    '0xb7E33f3A3B3B9ea9Fa4FD844A088C0aa33E27b3c'.toLowerCase(),
    {
      address: '0x950120715aB48f9c9f7b91893C4CAe4983733b82',
    },
  ],
  [
    '0xcdD67911FFee693412Af9E554670110997f1839F'.toLowerCase(),
    {
      address: '0x0D41bcB99Daea7908a74C0873D5182823a52BD40',
    },
  ],
  [
    '0x90079B15eAf30388D71E5e194ABcdD5b39C3B404'.toLowerCase(), // OptionOne DEMO
    {
      address: '0xeFAE88b210fE47538A23856bD5b319B01890f9fD',
      abi: optionAbi.abi,
    },
  ],
  [
    '0x8d22dbDD383Eff153025108f803AB3F2CFf6c795'.toLowerCase(), // OptionOne DEMO
    {
      address: '0x40925E0Be6A984878E163fFb8B9a42e615269f2C',
      abi: optionAbi.abi,
    },
  ],
])

const NUM = 1 + '0'.repeat(18)

const BLOCK = '13.3'

const BLOCK_PER_DAY = bignumberUtils.div(
  bignumberUtils.mul(bignumberUtils.mul(24, 60), 60),
  BLOCK
)
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
      contractInterface.abi ?? vestingAbi,
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

  const periodStart = useAsyncRetry(async () => {
    const contractInterface = WALLET_MAP.get(account)

    if (!vestingContract || !contractInterface?.abi) return null

    const period = await vestingContract.periodStart()

    return period.toString()
  }, [vestingContract, wallet, account])

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

    const transactionReceipt = await vestingContract.claim({
      gasLimit,
    })

    await transactionReceipt.wait()

    rate.retry()
    earned.retry()
    periodFinish.retry()
    currentBlockNumber.retry()
    balanceOf.retry()

    return true
  }, [vestingContract, wallet])

  const dropRate = bignumberUtils.div(
    bignumberUtils.mul(rate.value, BLOCK_PER_DAY),
    NUM
  )

  const dropEnd = bignumberUtils.mul(
    bignumberUtils.minus(periodFinish.value, currentBlockNumber.value),
    BLOCK
  )
  const dropStart = bignumberUtils.mul(
    bignumberUtils.minus(periodStart.value, currentBlockNumber.value),
    BLOCK
  )

  useInterval(() => {
    rate.retry()
    earned.retry()
    periodFinish.retry()
    currentBlockNumber.retry()
    balanceOf.retry()
  }, 15000)

  return (
    <AppLayout>
      <WalletConnect fallback={<Button>Connect</Button>}>
        <div>
          <Typography variant="h3" className={styles.title}>
            DFH Vesting contract
          </Typography>
          <Paper radius={8} className={styles.root}>
            {correctAccount ? (
              <>
                {isOwner.loading && 'loading...'}
                {isOwner.value && !isOwner.loading && (
                  <>
                    <div className={styles.row}>
                      <Typography variant="body3" className={styles.label}>
                        Tokens left
                      </Typography>
                      <Typography
                        variant="body2"
                        transform="uppercase"
                        family="mono"
                      >
                        {bignumberUtils.format(balanceOf.value)} DFH
                      </Typography>
                    </div>
                    <div className={styles.row}>
                      <Typography variant="body3" className={styles.label}>
                        Claimable tokens
                      </Typography>
                      <Typography
                        variant="body2"
                        transform="uppercase"
                        family="mono"
                      >
                        {bignumberUtils.format(
                          bignumberUtils.div(earned.value, NUM)
                        )}{' '}
                        DFH
                      </Typography>
                    </div>
                    <div className={styles.row}>
                      <Typography variant="body3" className={styles.label}>
                        Drop rate
                      </Typography>
                      <Typography
                        variant="body2"
                        transform="uppercase"
                        family="mono"
                      >
                        ~{bignumberUtils.format(dropRate)} dfh per day
                      </Typography>
                    </div>
                    {periodStart.value && (
                      <div className={styles.row}>
                        <Typography variant="body3" className={styles.label}>
                          Vesting start
                        </Typography>
                        <Typography
                          variant="body2"
                          transform="uppercase"
                          family="mono"
                        >
                          {dateUtils.format(
                            dateUtils.addDate(Number(dropStart), 'seconds')
                          )}{' '}
                          (at block: {String(periodStart.value ?? 0)})
                        </Typography>
                      </div>
                    )}
                    <div className={styles.row}>
                      <Typography variant="body3" className={styles.label}>
                        Vesting end
                      </Typography>
                      <Typography
                        variant="body2"
                        transform="uppercase"
                        family="mono"
                      >
                        {dateUtils.format(
                          dateUtils.addDate(Number(dropEnd), 'seconds')
                        )}{' '}
                        (at block: {String(periodFinish.value ?? 0)})
                      </Typography>
                    </div>
                    {periodStart.value &&
                    bignumberUtils.gt(
                      periodStart.value,
                      currentBlockNumber.value
                    ) ? null : (
                      <Button
                        onClick={handleClaim}
                        loading={claimState.loading}
                      >
                        Claim
                      </Button>
                    )}
                  </>
                )}
                {!isOwner.value && !isOwner.loading && (
                  <Typography variant="body3">
                    you&apos;re not the owner
                  </Typography>
                )}
              </>
            ) : (
              <Typography variant="body3">Wrong address</Typography>
            )}
          </Paper>
        </div>
      </WalletConnect>
    </AppLayout>
  )
}
