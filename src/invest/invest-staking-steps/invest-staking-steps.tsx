import { useAsync, useAsyncFn, useAsyncRetry, useInterval } from 'react-use'
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
import * as stakingAutomatesModel from '~/invest/invest-deployed-contracts/invest-deployed-contracts.model'
import * as stakingAdaptersModel from '~/staking/staking-adapters/staking-adapters.model'
import * as lpTokensModel from '~/lp-tokens/lp-tokens.model'
import * as styles from './invest-staking-steps.css'
import { InvestStakingStepsTelegramConnected } from './invest-staking-steps-telegram-connected'
import { InvestStakingStepsDontHaveInvest } from './invest-staking-steps-dont-have-invest'

export type InvestStakingStepsProps = {
  className?: string
  contract: InvestContract
}

export const InvestStakingSteps: React.VFC<InvestStakingStepsProps> = (
  props
) => {
  const currentWallet = walletNetworkModel.useWalletNetwork()
  const currentUserWallet = useStore(settingsWalletModel.$currentUserWallet)

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

  const isUniV3 = props.contract.protocol.adapter === 'uniswap3'

  const [deployState, handleDeploy] = useAsyncFn(async () => {
    if (
      !currentWallet ||
      !currentUserWallet ||
      !props.contract.automate.autorestake
    )
      return

    const addresses = await model.fetchContractAddressesFx({
      contracts: [props.contract],
      protocolAdapter: props.contract.protocol.adapter,
    })
    const { prototypeAddress = undefined } = addresses[props.contract.id]

    if (!prototypeAddress) return

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
      account: currentUserWallet.address,
      chainId: String(currentWallet.chainId),
      provider: currentWallet.provider,
    })

    const createdTrigger = await automationUpdateModel.createTriggerFx({
      wallet: currentUserWallet.id,
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
  }, [currentWallet, props.contract, isUniV3])

  const handleNextStep = (txId?: string) => {
    setCurrentStep(currentStep + 1)

    if (!txId) return

    const wallet = walletId ?? deployState.value?.contractWallet?.id

    if (wallet) {
      stakingAutomatesModel
        .scanWalletMetricFx({
          contract: props.contract.id,
          wallet,
          txId,
        })
        .catch(console.error)
    }

    const id = automateId ?? deployState.value?.id

    if (!currentUserWallet || !id) return

    stakingAutomatesModel
      .scanWalletMetricFx({
        contract: id,
        wallet: currentUserWallet.id,
        txId,
      })
      .catch(console.error)
  }

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

  const positions = useAsyncRetry(async () => {
    if (!currentWallet?.account) return

    return (await adapter.value?.positions?.(currentWallet.account))?.positions
  }, [adapter.value, currentWallet])

  const hasPositions = Boolean(positions.value?.length)

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

  useInterval(
    () => {
      if (!isUniV3) return

      positions.retry()
    },
    isUniV3 ? 15000 : null
  )

  const initialSteps = {
    buy:
      !hasPositions && isUniV3
        ? [
            <InvestStakingStepsDontHaveInvest
              key={0}
              contract={props.contract}
            />,
          ]
        : [
            <InvestBuy
              key={0}
              contract={props.contract}
              onSubmit={(values) => {
                handleNextStep(values.tx)

                lpTokensModel.zapFeePayCreateFx(values)
              }}
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
        onSubmit={isUniV3 ? handleNextStep : handleWithDraw}
        contract={props.contract}
        isUniV3={isUniV3}
      />,
    ],
  }

  const canMigrate =
    bignumberUtils.gt(balanceOf.value, 0) && canWithdraw.value === true

  const steps = [
    ...initialSteps[
      canMigrate || (hasPositions && isUniV3) ? 'migrate' : 'buy'
    ],
    !deploy ? (
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
      }}
      createInvest={(values) => {
        if (!currentUserWallet || !deployState.value || !values.txHash) return

        model.automateInvestCreateFx({
          input: {
            tx: values.txHash,
            contract: automateId ?? deployState.value.id,
            wallet: currentUserWallet.id,
            amount: values.amount,
            amountUSD: values.amountInUSD,
          },
        })
      }}
      contract={props.contract}
      deployedContract={deploy ?? deployState.value?.address}
      isUniV3={isUniV3}
      positions={positions.value}
    />,
    <InvestStakingStepsSuccess key={4} onSubmit={handleNextStep} />,
    <InvestStakingStepsTelegram key={5} onSubmit={handleNextStep} />,
    <InvestStakingStepsTelegramConnected key={6} />,
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
