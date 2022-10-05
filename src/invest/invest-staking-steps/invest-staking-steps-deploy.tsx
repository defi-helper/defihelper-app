import { useAsyncFn } from 'react-use'
import { useStore } from 'effector-react'

import { Button } from '~/common/button'
import { Icon } from '~/common/icon'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { InvestContract } from '~/invest/common/invest.types'
import { InvestStepsProgress } from '~/invest/common/invest-steps-progress'
import {
  AutomateActionTypeEnum,
  AutomateConditionTypeEnum,
  AutomateTriggerTypeEnum,
} from '~/api'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import * as deployModel from '~/automations/automation-deploy-contract/automation-deploy-contract.model'
import * as walletsModel from '~/settings/settings-wallets/settings-wallets.model'
import * as automationUpdateModel from '~/automations/automation-update/automation-update.model'
import * as model from '~/invest/invest-detail/invest-detail.model'
import * as styles from './invest-staking-steps.css'

export type InvestStakingStepsDeployProps = {
  onSubmit: () => void
  contract: InvestContract
}

export const InvestStakingStepsDeploy: React.FC<InvestStakingStepsDeployProps> =
  (props) => {
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

      props.onSubmit()
    }, [currentWallet, props.contract])

    return (
      <>
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
            To control your investments, you need to deploy your own personal
            contract. Later, you can set up a Stop-Loss.
          </Typography>
          <Typography
            variant="body2"
            as={Paper}
            radius={6}
            className={styles.deployHint}
          >
            DeFiHelper doesn&apos;t have any access to your funds. If you lose
            access to your wallet, funds will be lost.
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
      </>
    )
  }
