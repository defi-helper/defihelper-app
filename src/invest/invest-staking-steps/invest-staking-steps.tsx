import { useAsync, useAsyncFn, useAsyncRetry } from 'react-use'
import { useStore } from 'effector-react'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { InvestContract } from '~/invest/common/invest.types'
import { InvestBuy } from '~/invest/invest-buy'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { bignumberUtils } from '~/common/bignumber-utils'
import { authModel } from '~/auth'
import { useQueryParams } from '~/common/hooks'
import { Loader } from '~/common/loader'
import { settingsWalletModel } from '~/settings/settings-wallets'
import { InvestSell } from '~/invest/invest-sell'
import { InvestStakingStepsDeploy } from './invest-staking-steps-deploy'
import { InvestStakingStepsStake } from './invest-staking-steps-stake'
import { InvestStakingStepsSuccessBuy } from './invest-staking-steps-success-buy'
import { InvestStakingStepsMigrate } from './invest-staking-steps-migrate'
import { InvestStakingStepsSuccess } from './invest-staking-steps-success'
import { InvestStakingStepsTelegram } from './invest-staking-steps-telegram'
import * as stakingAutomatesModel from '~/staking/staking-automates/staking-automates.model'
import * as stakingAdaptersModel from '~/staking/staking-adapters/staking-adapters.model'
import * as styles from './invest-staking-steps.css'

export type InvestStakingStepsProps = {
  className?: string
  contract: InvestContract
}

export const InvestStakingSteps: React.VFC<InvestStakingStepsProps> = (
  props
) => {
  const user = useStore(authModel.$user)
  const currentWallet = walletNetworkModel.useWalletNetwork()
  const wallets = useStore(settingsWalletModel.$wallets)

  const deploy = useQueryParams().get('deploy')

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

  const balanceOfLp = useAsync(async () => {
    if (!props.contract.tokens.stakeBase) return

    return lp.value?.buyLiquidity.methods.balanceOf(
      props.contract.tokens.stakeBase.address
    )
  }, [lp.value, props.contract])

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
    if (deploy) return adapter.value?.refund.methods.staked()

    return adapter.value?.migrate.methods?.balanceOf()
  }, [adapter.value, deploy])

  const canWithdraw = useAsyncRetry(async () => {
    if (deploy) return adapter.value?.refund.methods.can()

    return adapter.value?.migrate.methods.canWithdraw()
  }, [adapter.value, deploy])

  const [withDraw, handleWithDraw] = useAsyncFn(async () => {
    const res = deploy
      ? await adapter.value?.refund.methods.refund()
      : await adapter.value?.migrate.methods.withdraw()

    return res?.tx
      .wait()
      .then(({ transactionHash }) => handleNextStep(transactionHash))
  }, [adapter.value, deploy])

  useEffect(() => {
    if (
      !balanceOfLp.value ||
      !balanceOf.value ||
      canWithdraw.value === undefined
    )
      return

    if (bignumberUtils.gt(balanceOf.value, 0) && canWithdraw.value === true) {
      setCurrentStep(0)
    } else if (bignumberUtils.gt(balanceOfLp.value, 0)) {
      setCurrentStep(1)
    }
  }, [balanceOfLp.value, balanceOf.value, canWithdraw.value])

  const initialSteps = {
    buy: [
      <InvestBuy
        key={0}
        contract={props.contract}
        onSubmit={handleNextStep}
        adapter={lp.value?.buyLiquidity}
        tokens={lp.value?.tokens}
      />,
      <InvestStakingStepsSuccessBuy
        key={1}
        contract={props.contract}
        onSubmit={handleNextStep}
      />,
    ],
    migrate: [
      <InvestStakingStepsMigrate
        key={0}
        loading={withDraw.loading}
        onSubmit={handleWithDraw}
        contract={props.contract}
        unstake={Boolean(deploy)}
      />,
    ],
  }

  const canMigrate =
    bignumberUtils.gt(balanceOf.value, 0) && canWithdraw.value === true

  const steps = [
    ...initialSteps[canMigrate ? 'migrate' : 'buy'],
    !deploy && !canMigrate ? (
      <InvestStakingStepsDeploy
        key={2}
        onSubmit={handleNextStep}
        contract={props.contract}
      />
    ) : null,
    canMigrate ? (
      <InvestSell
        key={3}
        contract={props.contract}
        onSubmit={handleNextStep}
        adapter={lp.value?.sellLiquidity}
        tokens={lp.value?.tokens}
      />
    ) : (
      <InvestStakingStepsStake
        key={3}
        onSubmit={handleNextStep}
        contract={props.contract}
      />
    ),
    <InvestStakingStepsSuccess
      key={4}
      contract={props.contract}
      onSubmit={handleNextStep}
    />,
    <InvestStakingStepsTelegram key={5} />,
  ].filter(Boolean)

  const currentStepObj = steps[currentStep % steps.length]

  return (
    <div className={clsx(styles.root, props.className)}>
      <div className={styles.content}>
        {canWithdraw.loading ||
        balanceOf.loading ||
        adapter.loading ||
        lp.loading ||
        balanceOfLp.loading ? (
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
