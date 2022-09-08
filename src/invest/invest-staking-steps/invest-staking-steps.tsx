import { useAsyncFn } from 'react-use'
import { useStore } from 'effector-react'
import clsx from 'clsx'
import React, { useState } from 'react'

import { Button } from '~/common/button'
import { ButtonBase } from '~/common/button-base'
import { Icon } from '~/common/icon'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { InvestContractInfo } from '~/invest/common/invest-contract-info'
import { InvestPoolTokens } from '~/invest/common/invest-pool-tokens'
import { InvestContract } from '~/invest/common/invest.types'
import { InvestStepsProgress } from '~/invest/common/invest-steps-progress'
import { InvestBuy } from '~/invest/invest-buy'
import { InvestMigrate } from '../invest-migrate'
import {
  AutomateActionTypeEnum,
  AutomateConditionTypeEnum,
  AutomateTriggerTypeEnum,
} from '~/api'
import { useDialog } from '~/common/dialog'
import { InvestDeployDialog } from '~/invest/common/invest-deploy-dialog'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import * as deployModel from '~/automations/automation-deploy-contract/automation-deploy-contract.model'
import * as walletsModel from '~/settings/settings-wallets/settings-wallets.model'
import * as automationUpdateModel from '~/automations/automation-update/automation-update.model'
import * as model from '~/invest/invest-detail/invest-detail.model'
import * as styles from './invest-staking-steps.css'

export type InvestStakingStepsProps = {
  className?: string
  initialStep: 'migrate' | 'buy'
  contract: InvestContract
}

const DeployContractStep = (props: {
  onSubmit: () => void
  contract: InvestContract
}) => {
  const [openInvestDeployDialog] = useDialog(InvestDeployDialog)
  const currentWallet = walletNetworkModel.useWalletNetwork()
  const wallets = useStore(walletsModel.$wallets)

  const [deploy, handleDeploy] = useAsyncFn(async () => {
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

    const deployAdapter = await deployModel.fetchDeployAdapterFx({
      address: prototypeAddress,
      protocol: props.contract.protocol.adapter,
      contract: props.contract.automate.autorestake,
      chainId: String(currentWallet.chainId),
      provider: currentWallet.provider,
      contractAddress: props.contract.address,
    })

    const stepsResult = await openInvestDeployDialog({
      steps: deployAdapter.deploy,
    })

    const deployedContract = await deployModel.deployFx({
      proxyAddress: stepsResult.address,
      inputs: stepsResult.inputs,
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

    props.onSubmit()
  }, [currentWallet, props.contract])

  return (
    <React.Fragment>
      <InvestStepsProgress current={1} success={0} />
      <Typography
        family="mono"
        transform="uppercase"
        as="div"
        align="center"
        className={styles.title}
      >
        DEPLOY CONTRACT
      </Typography>
      <div className={styles.deployContent}>
        <Icon
          icon="deploy"
          width={100}
          height={100}
          className={styles.checked}
        />
        <Typography as="div" align="center">
          To control your investments you need to deploy your personal contract.
          Later you can set up stop-loss and take profit.
        </Typography>
        <Typography
          variant="body2"
          as={Paper}
          radius={6}
          className={styles.deployHint}
        >
          DeFiHelper don&apos;t have any access to your funds. If you will loose
          your wallet - funds will be lost.
        </Typography>
      </div>
      <Button
        onClick={handleDeploy}
        loading={deploy.loading}
        color="green"
        className={styles.mt}
      >
        DEPLOY CONTRACT
      </Button>
    </React.Fragment>
  )
}

const StakeTokensStep = (props: {
  onSubmit: () => void
  contract: InvestStakingStepsProps['contract']
}) => {
  return (
    <React.Fragment key={3}>
      <InvestStepsProgress success={1} current={2} />
      <Typography
        family="mono"
        transform="uppercase"
        as="div"
        align="center"
        className={styles.title}
      >
        STAKE TOKENS
      </Typography>
      <InvestContractInfo
        contract={props.contract}
        className={styles.contractInfo}
      />
      <Typography align="center" className={styles.stakeHint}>
        To earn{' '}
        {props.contract.tokens.reward.map(({ symbol }) => symbol).join('-')}{' '}
        tokens as a reward - your need to stake your investment in
        {props.contract.protocol.name} protocol.
      </Typography>
      <div className={clsx(styles.stakeActions, styles.mt)}>
        <Button onClick={props.onSubmit} color="green">
          Approve{' '}
          {props.contract.tokens.stake.map(({ symbol }) => symbol).join('-')}
        </Button>
        <Button onClick={props.onSubmit} color="green">
          STAKE TOKENS
        </Button>
      </div>
    </React.Fragment>
  )
}

export const InvestStakingSteps: React.VFC<InvestStakingStepsProps> = (
  props
) => {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  const initialSteps = {
    buy: [
      <InvestBuy key={0} contract={props.contract} onSubmit={handleNextStep} />,
      <React.Fragment key={1}>
        <InvestStepsProgress success={0} />
        <Typography
          family="mono"
          transform="uppercase"
          as="div"
          align="center"
          className={styles.title}
        >
          BUY TOKENS
        </Typography>
        <div className={styles.successContent}>
          <Icon
            icon="checkboxCircle"
            width={100}
            height={100}
            className={styles.checked}
          />
          <Typography as="div" align="center">
            You have successfully invested in pool. To earn rewards you need to
            deploy your
          </Typography>
          <Typography as="div" align="center" className={styles.pool}>
            <div className={styles.pool}>
              <InvestPoolTokens tokens={props.contract.tokens.stake} />
              {props.contract.name}
            </div>{' '}
            contract
          </Typography>
          <Typography as="div" align="center">
            and stake tokens.
          </Typography>
        </div>
        <Button onClick={handleNextStep} color="green" className={styles.mt}>
          NEXT STEP
        </Button>
      </React.Fragment>,
    ],
    migrate: [
      <InvestMigrate
        key={0}
        onSubmit={handleNextStep}
        contract={props.contract}
      />,
      <React.Fragment key={1}>
        <InvestStepsProgress success={0} />
        <Typography
          family="mono"
          transform="uppercase"
          as="div"
          align="center"
          className={styles.title}
        >
          MIGRATE TOKENS
        </Typography>
        <div className={styles.successContent}>
          <Icon
            icon="checkboxCircle"
            width={100}
            height={100}
            className={styles.checked}
          />
          <Typography as="div" align="center">
            You have invested in
          </Typography>
          <Typography as="div" align="center" className={styles.pool}>
            <div className={styles.pool}>
              <InvestPoolTokens tokens={props.contract.tokens.stake} />
              {props.contract.name}
            </div>{' '}
            earlier.
          </Typography>
          <Typography as="div" align="center">
            We can boost your investment with auto-staking and stop-loss
            features. To continue you need unstake your tokens and deploy your
            own contract to control investments.
          </Typography>
        </div>
        <Button onClick={handleNextStep} color="green" className={styles.mt}>
          UNSTAKE TOKENS
        </Button>
      </React.Fragment>,
    ],
  }

  const steps = [
    ...initialSteps[props.initialStep],
    <DeployContractStep
      key={2}
      onSubmit={handleNextStep}
      contract={props.contract}
    />,
    <StakeTokensStep
      key={3}
      onSubmit={handleNextStep}
      contract={props.contract}
    />,
    <React.Fragment key={4}>
      <InvestStepsProgress success={2} />
      <Typography
        family="mono"
        transform="uppercase"
        as="div"
        align="center"
        className={styles.title}
      >
        &nbsp;
      </Typography>
      <div className={styles.successContent}>
        <Icon
          icon="checkboxCircle"
          width={100}
          height={100}
          className={styles.checked}
        />
        <Typography as="div" align="center">
          GREAT! You succefully
          <br />
          staked your tokens
        </Typography>
      </div>
      <Typography
        as="div"
        align="center"
        variant="body2"
        className={styles.connnectTelegramHint1}
      >
        Connect your telegram and get daily updates
        <br />
        about your portfolio
      </Typography>
      <div className={clsx(styles.connectTelegramActions, styles.mt)}>
        <Button onClick={handleNextStep} color="green">
          CONNECT TELEGRAM
        </Button>
        <ButtonBase onClick={handleNextStep}>SKIP</ButtonBase>
      </div>
    </React.Fragment>,
    <React.Fragment key={5}>
      <div className={styles.connectTelegramText}>
        <Icon icon="telegram" width={100} height={100} />
        <Typography as="div" align="center" variant="h4">
          Please confirm your
          <br />
          Telegram username
        </Typography>
      </div>
      <Typography
        variant="body2"
        as={Paper}
        radius={6}
        className={clsx(styles.deployHint, styles.connnectTelegramHint2)}
      >
        Don&apos;t forget to press START in the chat to confirm your username
      </Typography>
      <Button onClick={handleNextStep} color="green" className={styles.mt}>
        OPEN TELEGRAM
      </Button>
    </React.Fragment>,
  ]

  const currentStepObj = steps[currentStep % steps.length]

  return (
    <div className={clsx(styles.root, props.className)}>
      <div className={styles.content}>{currentStepObj}</div>
    </div>
  )
}
