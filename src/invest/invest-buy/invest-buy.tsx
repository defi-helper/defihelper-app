import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { useAsync, useAsyncFn, useAsyncRetry } from 'react-use'

import { Button } from '~/common/button'
import { Select, SelectOption } from '~/common/select'
import { Typography } from '~/common/typography'
import { settingsWalletModel } from '~/settings/settings-wallets'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { InvestPoolTokens } from '~/invest/common/invest-pool-tokens'
import { InvestContract } from '~/invest/common/invest.types'
import { InvestStepsProgress } from '~/invest/common/invest-steps-progress'
import { NumericalInput } from '~/common/numerical-input'
import { InvestFee } from '~/invest/common/invest-fee'
import * as model from '~/staking/staking-adapters/staking-adapters.model'
import * as styles from './invest-buy.css'
import { bignumberUtils } from '~/common/bignumber-utils'
import { ButtonBase } from '~/common/button-base'
import { toastsService } from '~/toasts'
import { analytics } from '~/analytics'

export type InvestBuyProps = {
  onSubmit?: (transactionHash?: string) => void
  contract: InvestContract
}

export const InvestBuy = (props: InvestBuyProps) => {
  const [amount, setAmount] = useState('0')
  const [tokenAddress, setTokenAddress] = useState('')

  const billingBalance = useAsync(async () => {
    return settingsWalletModel.fetchBillingBalanceFx({
      blockchain: props.contract.blockchain,
      network: props.contract.network,
    })
  }, [props.contract])

  const currentWallet = walletNetworkModel.useWalletNetwork()

  const lp = useAsync(async () => {
    if (!currentWallet?.account || !props.contract.automate.lpTokensManager)
      return

    return model.buyLPFx({
      account: currentWallet.account,
      provider: currentWallet.provider,
      chainId: props.contract.network,
      router: props.contract.automate.lpTokensManager.router,
      pair: props.contract.automate.lpTokensManager.pair,
      network: props.contract.network,
      protocol: props.contract.blockchain,
    })
  }, [props.contract, currentWallet])

  const approved = useAsyncRetry(async () => {
    if (bignumberUtils.eq(amount, 0) || !lp.value) return true

    return lp.value.buyLiquidity.methods.isApproved(tokenAddress, amount)
  }, [lp.value, tokenAddress, amount])

  const tokens = useAsyncRetry(async () => {
    if (!lp.value) return

    const { balanceOf } = lp.value.buyLiquidity.methods

    const tokensWithBalances = await Promise.all(
      lp.value.tokens.map(async (token) => ({
        ...token,
        balance: await balanceOf(token.address),
      }))
    )

    return tokensWithBalances.reduce<
      Record<string, typeof tokensWithBalances[number]>
    >((acc, token) => {
      acc[token.address] = token

      return acc
    }, {})
  }, [lp.value])

  const [buyState, handleBuy] = useAsyncFn(async () => {
    if (!lp.value) return

    const { buy, canBuy } = lp.value.buyLiquidity.methods

    try {
      const can = await canBuy(tokenAddress, amount)

      if (can instanceof Error) throw can
      if (!can) throw new Error("can't buy")

      const { tx } = await buy(tokenAddress, amount, '1')

      const result = await tx?.wait()
      analytics.log('lp_tokens_purchase_success', {
        amount: bignumberUtils.floor(amount),
      })

      props.onSubmit?.(result?.transactionHash)

      return true
    } catch {
      analytics.log('lp_tokens_purchase_unsuccess', {
        amount: bignumberUtils.floor(amount),
      })

      return false
    }
  }, [lp.value, tokenAddress, amount])

  const [approveState, handleApprove] = useAsyncFn(async () => {
    if (!lp.value) return

    const { approve } = lp.value.buyLiquidity.methods

    try {
      const { tx } = await approve(tokenAddress, amount)

      await tx?.wait()

      tokens.retry()
      toastsService.info('tokens approved!')

      return true
    } catch {
      return false
    }
  }, [lp.value, tokenAddress, amount])

  useEffect(() => {
    approved.retry()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approved.value, approveState.value, amount])

  const fee = useAsync(
    async () => lp.value?.buyLiquidity.methods.fee(),
    [lp.value]
  )

  return (
    <React.Fragment>
      <InvestStepsProgress current={0} />
      <Typography
        family="mono"
        transform="uppercase"
        as="div"
        align="center"
        className={styles.title}
      >
        BUY TOKENS
      </Typography>
      <div className={styles.row}>
        <Typography variant="body2" family="mono">
          Pool
        </Typography>
        <div className={styles.poolRight}>
          <InvestPoolTokens tokens={props.contract.tokens.stake} />
          {props.contract.name}
        </div>
      </div>
      <div className={styles.inputs}>
        <Select
          label="Token"
          className={styles.input}
          disabled={approveState.loading || buyState.loading}
          value={tokenAddress}
          onChange={(event) => setTokenAddress(event.target.value)}
        >
          {Object.values(tokens.value ?? {}).map((option) => (
            <SelectOption key={option.address} value={option.address}>
              {option.logoUrl ? (
                <img src={option.logoUrl} className={styles.img} alt="" />
              ) : (
                <span className={styles.imgPlaceHolder} />
              )}
              {option.symbol}
            </SelectOption>
          ))}
        </Select>
        <NumericalInput
          label={
            <>
              Amount{' '}
              <ButtonBase
                className={styles.balance}
                onClick={() =>
                  setAmount(tokens.value?.[tokenAddress]?.balance ?? '0')
                }
              >
                {tokens.value?.[tokenAddress]?.balance ?? '0'} MAX
              </ButtonBase>
            </>
          }
          className={styles.input}
          disabled={approveState.loading || buyState.loading}
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
      </div>
      <InvestFee
        tokenSymbol={billingBalance.value?.token ?? ''}
        fee={fee.value}
      />
      <div className={clsx(styles.stakeActions, styles.mt)}>
        {!approved.value && (
          <Button
            onClick={handleApprove}
            color="green"
            loading={approveState.loading}
          >
            Approve{' '}
            {props.contract.tokens.stake.map(({ symbol }) => symbol).join('-')}
          </Button>
        )}
        <Button
          onClick={handleBuy}
          loading={buyState.loading}
          disabled={approveState.loading || !approved.value}
          color="green"
        >
          BUY TOKENS
        </Button>
      </div>
    </React.Fragment>
  )
}
