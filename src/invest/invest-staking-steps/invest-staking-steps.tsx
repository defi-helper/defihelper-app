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
import { InvestStakingStepsTelegramConnected } from './invest-staking-steps-telegram-connected'
import { InvestStopLoss } from '../common/invest-stop-loss'
import * as automationsListModel from '~/automations/automation-list/automation-list.model'
import { NULL_ADDRESS } from '~/common/constants'
import { stakingApi } from '~/staking/common'
import * as styles from './invest-staking-steps.css'
import { InvestBuyUni3 } from '../invest-buy-uni3'

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
      contractAddress: props.contract.address,
      isUniV3,
    })
  }, [props.contract, currentWallet, isUniV3])

  const balanceOfLp = useAsync(async () => {
    if (!props.contract.tokens.stakeBase) return

    return lp.value?.buyLiquidity?.methods.balanceOf(
      props.contract.tokens.stakeBase.address
    )
  }, [lp.value, props.contract])

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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    deployedContract.trigger = {}

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    Object.assign(deployedContract.trigger!, createdTrigger)

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

    if (!currentUserWallet) return

    stakingAutomatesModel
      .scanWalletMetricFx({
        contract: props.contract.id,
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

  const deployedContract = useAsync(async () => {
    if (
      !currentWallet?.account ||
      !deployState.value?.contract ||
      !deployState.value.contract.automate.autorestake
    )
      return

    const contract = await stakingAutomatesModel.fetchAdapterFx({
      protocolAdapter: deployState.value.contract.protocol.adapter,
      contractAdapter: deployState.value.contract.automate.autorestake,
      contractId: deployState.value.id,
      contractAddress: deployState.value.address,
      provider: currentWallet.provider,
      chainId: String(currentWallet.chainId),
      action: 'stopLoss',
    })

    const tokens = await stakingApi.tokens({
      network: deployState.value.contract.network,
      protocol: deployState.value.contract.blockchain,
    })

    return {
      stopLoss: contract?.stopLoss,
      tokens,
    }
  }, [currentWallet, deployState.value])

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
    if (!balanceOf.value || canWithdraw.value === undefined) return

    if (bignumberUtils.gt(balanceOf.value, 0) && canWithdraw.value === true) {
      setCurrentStep(0)
    }
  }, [balanceOf.value, canWithdraw.value])

  useEffect(() => {
    if (!balanceOfLp.value) return

    if (bignumberUtils.gt(balanceOfLp.value, 0)) {
      setCurrentStep(1)
    }
  }, [balanceOfLp.value])

  useInterval(
    () => {
      if (!isUniV3) return

      positions.retry()
    },
    isUniV3 ? 15000 : null
  )

  const initialSteps = {
    buy: [
      ...(!hasPositions && isUniV3
        ? [
            <InvestBuyUni3
              key={0}
              contract={props.contract}
              onSubmit={(values) => {
                handleNextStep(values.tx)

                lpTokensModel.zapFeePayCreateFx(values)
              }}
              adapter={lp.value?.buyLiquidityUniv3}
              tokens={lp.value?.tokens}
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
          ]),
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
        const id = automateId ?? deployState.value?.id

        if (!currentUserWallet || !id || !values.txHash) return

        model.automateInvestCreateFx({
          input: {
            tx: values.txHash,
            contract: id,
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
    <InvestStopLoss
      key={4}
      onCancel={handleNextStep}
      onConfirm={async (res) => {
        if (!deployState.value) return

        if (res.active) {
          await stakingAutomatesModel.enableStopLossFx({
            contract: deployState.value.id,
            path: res.path,
            amountOut: res.amountOut,
            amountOutMin: res.amountOutMin,
            inToken: res.mainToken,
            outToken: res.withdrawToken,
          })
        } else {
          await stakingAutomatesModel.disableStopLossFx({
            contract: deployState.value.id,
          })
        }

        handleNextStep()
      }}
      adapter={deployedContract.value?.stopLoss}
      mainTokens={deployState.value?.contract?.tokens.stake
        .map((token) => ({
          id: token.id,
          logoUrl: token.alias?.logoUrl ?? '',
          symbol: token.symbol,
          address: token.address,
        }))
        .filter(({ address }) => address !== NULL_ADDRESS)}
      withdrawTokens={
        deployedContract.value?.tokens.filter(
          ({ address }) => address !== NULL_ADDRESS
        ) ?? []
      }
      initialStopLoss={null}
      onDelete={() => {
        if (!deployState.value) return Promise.resolve()

        return automationsListModel.deleteContractFx(deployState.value?.id)
      }}
      onToggleAutoCompound={(active) => {
        if (!deployState.value) return

        stakingAutomatesModel.toggleAutoCompoundFx({
          id: deployState.value?.id,
          active,
        })
      }}
      autoCompoundActive={deployState.value?.trigger?.active ?? null}
      canDelete={
        bignumberUtils.eq(deployState.value?.metric.invest, 0) ||
        deployState.value?.stopLoss?.amountOut !== null
      }
      isUniV3={deployState.value?.contract?.protocol.adapter === 'uniswap3'}
      rebalanceEnabled={Boolean(deployState.value?.rebalance)}
      onRebalanceToggle={(active) => {
        if (!deployState.value) return

        const method = active
          ? stakingAutomatesModel.automateContractRebalanceEnableFx
          : stakingAutomatesModel.automateContractRebalanceDisableFx

        method({
          contract: deployState.value?.id,
        })
      }}
      inline
    />,
    <InvestStakingStepsSuccess key={5} onSubmit={handleNextStep} />,
    <InvestStakingStepsTelegram key={6} onSubmit={handleNextStep} />,
    <InvestStakingStepsTelegramConnected key={7} />,
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
