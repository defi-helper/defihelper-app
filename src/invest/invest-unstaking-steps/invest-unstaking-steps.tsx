import { useAsync, useAsyncFn, useAsyncRetry } from 'react-use'
import { useStore } from 'effector-react'
import clsx from 'clsx'
import { useState } from 'react'

import { InvestContract } from '~/invest/common/invest.types'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { authModel } from '~/auth'
import { Loader } from '~/common/loader'
import { settingsWalletModel } from '~/settings/settings-wallets'
import { InvestSell } from '~/invest/invest-sell'
import { InvestUnstakingStepsUnstake } from './invest-unstaking-steps-unstake'
import { InvestUnstakingStepsSuccess } from './invest-unstaking-steps-success'
import * as stakingAutomatesModel from '~/staking/staking-automates/staking-automates.model'
import * as stakingAdaptersModel from '~/staking/staking-adapters/staking-adapters.model'
import * as styles from './invest-unstaking-steps.css'

export type InvestUnstakingStepsProps = {
  className?: string
  contract: InvestContract
}

export const InvestUnstakingSteps: React.VFC<InvestUnstakingStepsProps> = (
  props
) => {
  const user = useStore(authModel.$user)
  const currentWallet = walletNetworkModel.useWalletNetwork()
  const wallets = useStore(settingsWalletModel.$wallets)

  const [currentStep, setCurrentStep] = useState(0)

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

  const handleNextStep = (txId?: string) => {
    setCurrentStep(currentStep + 1)

    if (!txId) return

    const findedWallet = wallets.find((wallet) => {
      const sameAddreses =
        String(currentWallet?.chainId) === 'main'
          ? currentWallet?.account === wallet.address
          : currentWallet?.account?.toLowerCase() === wallet.address

      return sameAddreses && String(currentWallet?.chainId) === wallet.network
    })

    if (!findedWallet) return

    stakingAutomatesModel
      .scanWalletMetricFx({
        wallet: findedWallet.id,
        contract: props.contract.id,
        txId,
      })
      .catch(console.error)
  }

  const adapter = useAsync(async () => {
    if (!user) return

    const deployedContracts =
      await stakingAutomatesModel.fetchAutomatesContractsFx({
        userId: user.id,
      })

    const deployedContract = deployedContracts.list.find(
      ({ contract: deployedStakingContract }) =>
        deployedStakingContract?.id === props.contract.id
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
  }, [currentWallet])

  const balanceOf = useAsyncRetry(async () => {
    return adapter.value?.refund.methods.staked()
  }, [adapter.value])

  const canRefund = useAsyncRetry(async () => {
    return adapter.value?.refund.methods.can()
  }, [adapter.value])

  const [refund, handleRefund] = useAsyncFn(async () => {
    const res = await adapter.value?.refund.methods.refund()

    return res?.tx
      .wait()
      .then(({ transactionHash }) => handleNextStep(transactionHash))
  }, [adapter.value])

  const steps = [
    <InvestUnstakingStepsUnstake
      key={0}
      loading={refund.loading}
      onSubmit={handleRefund}
      contract={props.contract}
    />,
    <InvestSell
      key={3}
      contract={props.contract}
      onSubmit={handleNextStep}
      adapter={lp.value?.sellLiquidity}
      tokens={lp.value?.tokens}
    />,
    <InvestUnstakingStepsSuccess
      key={4}
      contract={props.contract}
      onSubmit={handleNextStep}
    />,
  ]

  const currentStepObj = steps[currentStep % steps.length]

  return (
    <div className={clsx(styles.root, props.className)}>
      <div className={styles.content}>
        {canRefund.loading ||
        balanceOf.loading ||
        adapter.loading ||
        lp.loading ? (
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
