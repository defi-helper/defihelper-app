import { useAsync, useAsyncFn, useAsyncRetry } from 'react-use'
import { useStore } from 'effector-react'
import clsx from 'clsx'
import { useCallback, useState } from 'react'

import { InvestContract } from '~/invest/common/invest.types'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { authModel } from '~/auth'
import { Loader } from '~/common/loader'
import { settingsWalletModel } from '~/settings/settings-wallets'
import { InvestSell } from '~/invest/invest-sell'
import { InvestUnstakingStepsUnstake } from './invest-unstaking-steps-unstake'
import { InvestUnstakingStepsSuccess } from './invest-unstaking-steps-success'
import { useQueryParams } from '~/common/hooks'
import * as automationsListModel from '~/automations/automation-list/automation-list.model'
import * as stakingAutomatesModel from '~/invest/invest-deployed-contracts/invest-deployed-contracts.model'
import * as stakingAdaptersModel from '~/staking/staking-adapters/staking-adapters.model'
import * as model from '~/invest/invest-detail/invest-detail.model'
import * as lpTokensModel from '~/lp-tokens/lp-tokens.model'
import * as styles from './invest-unstaking-steps.css'
import { Restake } from '~/common/load-adapter'

export type InvestUnstakingStepsProps = {
  className?: string
  contract: InvestContract
}

export const InvestUnstakingSteps: React.VFC<InvestUnstakingStepsProps> = (
  props
) => {
  const user = useStore(authModel.$user)
  const currentWallet = walletNetworkModel.useWalletNetwork()
  const currentUserWallet = useStore(settingsWalletModel.$currentUserWallet)

  const [currentStep, setCurrentStep] = useState(0)
  const [sellToken, setSellToken] = useState('')
  const [withdrawedBalance, setWithdrawedBalance] = useState('0')

  const queryParams = useQueryParams()

  const automateId = queryParams.get('automateId')

  const isUniV3 = props.contract.protocol.adapter === 'uniswap3'

  const lp = useAsync(async () => {
    if (!currentWallet?.account || !props.contract.automate.lpTokensManager)
      return

    return stakingAdaptersModel.buyLPFx({
      account: currentWallet.account,
      provider: currentWallet.provider,
      chainId: props.contract.network,
      router: props.contract.automate.lpTokensManager.router,
      pair: props.contract.automate.lpTokensManager.pair,
      network: props.contract.network,
      protocol: props.contract.blockchain,
    })
  }, [props.contract, currentWallet])

  const handleNextStep = useCallback(
    (txId?: string) => {
      setCurrentStep(currentStep + 1)

      if (!txId || !currentUserWallet) return

      stakingAutomatesModel
        .scanWalletMetricFx({
          wallet: currentUserWallet.id,
          contract: props.contract.id,
          txId,
        })
        .catch(console.error)
    },
    [currentStep, currentUserWallet, props.contract.id]
  )

  const adapter = useAsync(async () => {
    if (!user || !automateId || isUniV3) return

    const deployedContracts =
      await stakingAutomatesModel.fetchAutomatesContractsFx({
        userId: user.id,
      })

    const deployedContract = deployedContracts.list.find(
      (contract) => contract?.id === automateId
    )

    if (
      !currentWallet ||
      !props.contract.automate.autorestake ||
      !deployedContract
    )
      return

    return stakingAutomatesModel.fetchAdapterFx({
      protocolAdapter: props.contract.protocol.adapter,
      contractAdapter: props.contract.automate.autorestake,
      contractId: props.contract.id,
      contractAddress: deployedContract.address,
      provider: currentWallet.provider,
      chainId: String(currentWallet.chainId),
      action: 'migrate',
    })
  }, [currentWallet, automateId, isUniV3])

  const adapterUniV3 = useAsync(async () => {
    if (!user || !automateId || !isUniV3) return

    const deployedContracts =
      await stakingAutomatesModel.fetchAutomatesContractsFx({
        userId: user.id,
      })

    const deployedContract = deployedContracts.list.find(
      (contract) => contract?.id === automateId
    )

    if (
      !currentWallet ||
      !props.contract.automate.autorestake ||
      !deployedContract
    )
      return

    return stakingAutomatesModel.fetchAdapterFx({
      protocolAdapter: props.contract.protocol.adapter,
      contractAdapter: 'Restake',
      contractId: props.contract.id,
      contractAddress: deployedContract.address,
      provider: currentWallet.provider,
      chainId: String(currentWallet.chainId),
      action: 'migrate',
    }) as unknown as Promise<Restake | undefined>
  }, [currentWallet, automateId, isUniV3])

  const canRefund = useAsyncRetry(async () => {
    const can = isUniV3
      ? adapterUniV3.value?.refund.methods.can
      : adapter.value?.refund.methods.can

    return can?.()
  }, [adapter.value, isUniV3, adapterUniV3.value])

  const [refund, handleRefund] = useAsyncFn(async () => {
    const refundMethod = isUniV3
      ? adapterUniV3.value?.refund.methods.refund
      : adapter.value?.refund.methods.refund

    const res = await refundMethod?.()

    const resTx = await res?.tx.wait()

    if (isUniV3 && automateId) {
      await automationsListModel.deleteContractFx(automateId)
    }
    if (!resTx?.transactionHash) return

    handleNextStep(resTx?.transactionHash)
  }, [adapter.value, adapterUniV3.value, handleNextStep, automateId, isUniV3])

  const steps = [
    <InvestUnstakingStepsUnstake
      key={0}
      loading={refund.loading}
      onSubmit={() => {
        handleRefund()

        if (!currentUserWallet || !automateId) return

        model.automateInvestRefundFx({
          input: {
            contract: automateId,
            wallet: currentUserWallet.id,
          },
        })
      }}
      contract={props.contract}
    />,
    isUniV3 ? null : (
      <InvestSell
        key={3}
        contract={props.contract}
        onSubmit={(values) => {
          handleNextStep(values.tx)

          lpTokensModel.zapFeePayCreateFx(values)
        }}
        adapter={lp.value?.sellLiquidity}
        tokens={lp.value?.tokens}
        onChangeToken={setSellToken}
        onSell={setWithdrawedBalance}
      />
    ),
    <InvestUnstakingStepsSuccess
      key={4}
      contract={props.contract}
      onSubmit={handleNextStep}
      token={sellToken}
      isUniV3={isUniV3}
      balanceOf={withdrawedBalance}
    />,
  ].filter(Boolean)

  const currentStepObj = steps[currentStep % steps.length]

  return (
    <div className={clsx(styles.root, props.className)}>
      <div className={styles.content}>
        {canRefund.loading || adapter.loading || lp.loading ? (
          <div className={styles.loader}>
            <Loader height="36" />
          </div>
        ) : (
          currentStepObj
        )}
      </div>
    </div>
  )
}
