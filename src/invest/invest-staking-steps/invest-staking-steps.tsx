import { useAsync, useAsyncFn, useAsyncRetry } from 'react-use'
import { useStore } from 'effector-react'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { InvestContract } from '~/invest/common/invest.types'
import { InvestBuy } from '~/invest/invest-buy'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { bignumberUtils } from '~/common/bignumber-utils'
import { useQueryParams } from '~/common/hooks'
import { Loader } from '~/common/loader'
import { settingsWalletModel } from '~/settings/settings-wallets'
import { InvestStakingStepsDeploy } from './invest-staking-steps-deploy'
import { InvestStakingStepsStake } from './invest-staking-steps-stake'
import { InvestStakingStepsSuccessBuy } from './invest-staking-steps-success-buy'
import { InvestStakingStepsMigrate } from './invest-staking-steps-migrate'
import { InvestStakingStepsSuccess } from './invest-staking-steps-success'
import { InvestStakingStepsTelegram } from './invest-staking-steps-telegram'
import {
  AutomateActionTypeEnum,
  AutomateConditionTypeEnum,
  AutomateTriggerTypeEnum,
} from '~/api'
import * as deployModel from '~/automations/automation-deploy-contract/automation-deploy-contract.model'
import * as automationUpdateModel from '~/automations/automation-update/automation-update.model'
import * as model from '~/invest/invest-detail/invest-detail.model'
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
  const currentWallet = walletNetworkModel.useWalletNetwork()
  const wallets = useStore(settingsWalletModel.$wallets)

  const queryParams = useQueryParams()

  const deploy = queryParams.get('deploy')
  const automateId = queryParams.get('automateId')
  const walletId = queryParams.get('walletId')

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

    if (walletId) {
      stakingAutomatesModel
        .scanWalletMetricFx({
          contract: props.contract.id,
          wallet: walletId,
          txId,
        })
        .catch(console.error)
    }

    if (!findedWallet) return

    stakingAutomatesModel
      .scanWalletMetricFx({
        contract: props.contract.id,
        wallet: findedWallet.id,
        txId,
      })
      .catch(console.error)
  }

  const [deployState, handleDeploy] = useAsyncFn(async () => {
    if (!currentWallet || !props.contract.automate.autorestake) return

    const findedWallet = wallets.find((wallet) => {
      const sameAddreses =
        String(currentWallet.chainId) === 'main'
          ? currentWallet.account === wallet.address
          : currentWallet.account?.toLowerCase() === wallet.address

      return sameAddreses && String(currentWallet.chainId) === wallet.network
    })

    const addresses = await model.fetchContractAddressesFx({
      contracts: [props.contract],
      protocolAdapter: props.contract.protocol.adapter,
    })
    const { prototypeAddress = undefined } = addresses[props.contract.id]

    if (!findedWallet || !prototypeAddress) return

    const adapter = await deployModel.fetchDeployAdapterFx({
      address: prototypeAddress,
      protocol: props.contract.protocol.adapter,
      contract: props.contract.automate.autorestake,
      chainId: String(currentWallet.chainId),
      provider: currentWallet.provider,
      contractAddress: props.contract.address,
    })

    const [deployAdapter] = adapter.deploy

    const info = await deployAdapter.info()

    const values = info.inputs?.map(({ value }) => value)

    if (!values) return

    const can = await deployAdapter.can(...values)

    if (can instanceof Error) return

    const { tx, getAddress } = await deployAdapter.send(...values)

    await tx.wait()

    const deployedContract = await deployModel.deployFx({
      proxyAddress: await getAddress(),
      inputs: values,
      protocol: props.contract.protocol.id,
      adapter: props.contract.automate.autorestake,
      contract: props.contract.id,
      account: findedWallet.address,
      chainId: String(currentWallet.chainId),
      provider: currentWallet.provider,
    })

    const createdTrigger = await automationUpdateModel.createTriggerFx({
      wallet: findedWallet.id,
      params: JSON.stringify({}),
      type: AutomateTriggerTypeEnum.EveryHour,
      name: `Autostaking ${props.contract.name}`,
      active: true,
    })

    const action = await automationUpdateModel.createActionFx({
      trigger: createdTrigger.id,
      type: AutomateActionTypeEnum.EthereumAutomateRun,
      params: JSON.stringify({
        id: deployedContract.id,
      }),
      priority: 0,
    })

    await automationUpdateModel.createConditionFx({
      trigger: createdTrigger.id,
      type: AutomateConditionTypeEnum.EthereumOptimalAutomateRun,
      params: JSON.stringify({
        id: action.id,
      }),
      priority: 0,
    })

    setCurrentStep((lastStep) => lastStep + 1)

    return deployedContract
  }, [currentWallet, props.contract])

  const adapter = useAsync(async () => {
    if (!currentWallet?.account) return

    const contract = await stakingAdaptersModel.fetchContractAdapterFx({
      protocolAdapter: props.contract.protocol.adapter,
      contract: {
        address: props.contract.address,
        adapter: props.contract.adapter,
      },
      chainId: String(currentWallet.chainId),
      account: currentWallet.account,
      provider: currentWallet.provider,
    })

    return contract
  }, [currentWallet])

  const balanceOf = useAsyncRetry(async () => {
    return adapter.value?.actions?.unstake.methods?.balanceOf()
  }, [adapter.value])

  const canWithdraw = useAsyncRetry(async () => {
    if (!balanceOf.value) return

    return adapter.value?.actions?.unstake.methods.can(balanceOf.value)
  }, [adapter.value, balanceOf.value])

  const [withDraw, handleWithDraw] = useAsyncFn(async () => {
    if (!balanceOf.value) return

    const res = await adapter.value?.actions?.unstake.methods.unstake(
      balanceOf.value
    )

    return res?.tx
      .wait()
      .then(({ transactionHash }) => handleNextStep(transactionHash))
  }, [adapter.value, balanceOf.value])

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
        onDeploy={handleDeploy}
        loading={deployState.loading}
        contract={props.contract}
      />
    ) : null,
    <InvestStakingStepsStake
      key={3}
      onSubmit={(values) => {
        handleNextStep(values.txHash)

        const findedWallet = wallets.find((wallet) => {
          const sameAddreses =
            String(currentWallet?.chainId) === 'main'
              ? currentWallet?.account === wallet.address
              : currentWallet?.account?.toLowerCase() === wallet.address

          return (
            sameAddreses && String(currentWallet?.chainId) === wallet.network
          )
        })

        if (!findedWallet) return

        model.automateInvestCreateFx({
          input: {
            contract: automateId ?? props.contract.id,
            wallet: findedWallet.id,
            amount: values.amount,
            amountUSD: values.amountInUSD,
          },
        })
      }}
      contract={props.contract}
      deployedContract={deploy ?? deployState.value?.address}
    />,
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
        adapter.loading ||
        balanceOf.loading ||
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
