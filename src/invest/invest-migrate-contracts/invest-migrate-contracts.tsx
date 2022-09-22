import clsx from 'clsx'
import isEmpty from 'lodash.isempty'
import { useEffect, useMemo, useState } from 'react'
import { useLocalStorage, useMedia } from 'react-use'
import { useGate, useStore } from 'effector-react'

import { Link } from '~/common/link'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { InvestCarousel } from '~/invest/common/invest-carousel'
import { InvestMigrateCard } from '~/invest/common/invest-migrate-card'
import { useDialog, UserRejectionError } from '~/common/dialog'
import { StakingAdapterDialog, StakingMigrateDialog } from '~/staking/common'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { Button } from '~/common/button'
import * as automatesModel from '~/staking/staking-automates/staking-automates.model'
import * as walletsModel from '~/settings/settings-wallets/settings-wallets.model'
import * as model from './invest-migrate-contracts.model'
import { authModel } from '~/auth'
import { switchNetwork } from '~/wallets/common'
import { useWalletConnect } from '~/wallets/wallet-connect'
import { toastsService } from '~/toasts'
import {
  AutomateActionTypeEnum,
  AutomateConditionTypeEnum,
  AutomateTriggerTypeEnum,
} from '~/api'
import { analytics } from '~/analytics'
import { bignumberUtils } from '~/common/bignumber-utils'
import { InvestVideoDialog } from '../common/invest-video-dialog'
import { InvestDeployDialog } from '../common/invest-deploy-dialog'
import { InvestTabsDialog } from '../common/invest-tabs-dialog'
import { Loader } from '~/common/loader'
import * as automationUpdateModel from '~/automations/automation-update/automation-update.model'
import * as deployModel from '~/automations/automation-deploy-contract/automation-deploy-contract.model'
import { settingsWalletModel } from '~/settings/settings-wallets'
import { SettingsWalletBalanceDialog } from '~/settings/common'
import * as styles from './invest-migrate-contracts.css'

export type InvestMigrateContractsProps = {
  className?: string
  search: string
  onChangeTab: () => void
}

export const InvestMigrateContracts: React.VFC<InvestMigrateContractsProps> = (
  props
) => {
  const contracts = useStore(model.$contractsWithLoading)
  const hiddenContracts = useStore(model.$hiddenContractsWithLoading)
  const loading = useStore(model.fetchContractsFx.pending)

  const [enableAutostakingVideo, setEnableAutostakingVideo] = useLocalStorage(
    'enableAutostakingVideo',
    false
  )

  const [openMigrateDialog] = useDialog(StakingMigrateDialog)
  const [openAdapter] = useDialog(StakingAdapterDialog)
  const [openInvestVideoDialog] = useDialog(InvestVideoDialog)
  const [openAutostakingBalanceDialog] = useDialog(SettingsWalletBalanceDialog)
  const [openInvestDeployDialog] = useDialog(InvestDeployDialog)
  const [openInvestTabsDialog] = useDialog(InvestTabsDialog)
  const currentWallet = walletNetworkModel.useWalletNetwork()
  const wallets = useStore(walletsModel.$wallets)
  const user = useStore(authModel.$user)

  const automatesContracts = useStore(automatesModel.$automatesContracts)
  useGate(automatesModel.StakingAutomatesGate)

  const [hidden, setHidden] = useState(true)

  const isEmptyContracts = isEmpty(contracts)

  const Component = isEmptyContracts ? Paper : 'div'

  const isDesktop = useMedia('(min-width: 1440px)')
  const isTablet = useMedia('(min-width: 960px)')
  const isPhone = useMedia('(min-width: 600px)')

  const slidesToShow = useMemo(() => {
    if (isDesktop) {
      return 4
    }

    if (isTablet) {
      return 3
    }

    if (isPhone) {
      return 2
    }

    return 1
  }, [isDesktop, isTablet, isPhone])

  useEffect(() => {
    if (!user) return

    const abortController = new AbortController()

    model.fetchContractsFx({
      signal: abortController.signal,
      filter: props.search ? { search: props.search } : undefined,
    })
    return () => {
      model.resetContracts()
      model.resetHiddenContracts()

      abortController.abort()
    }
  }, [props.search, user])

  useEffect(() => {
    if (!user) return

    const abortController = new AbortController()

    model.fetchHiddenContractsFx({ signal: abortController.signal })

    return () => abortController.abort()
  }, [user])

  useEffect(() => {
    return () => {
      model.resetContracts()
      model.resetHiddenContracts()
    }
  }, [])

  const handleMigrate =
    (contract: typeof contracts[number] | typeof hiddenContracts[number]) =>
    async () => {
      analytics.log('auto_staking_migrate_tokens_click')
      model.migratingStart(contract.id)

      try {
        if (!currentWallet?.account || !user)
          return toastsService.error('wallet is not connected')
        if (!contract.automate.autorestake)
          return toastsService.error('adapter not found')

        const deployedContracts =
          await automatesModel.fetchAutomatesContractsFx({
            userId: user.id,
          })

        const deployedContract = deployedContracts.list.find(
          ({ contract: deployedStakingContract }) =>
            deployedStakingContract?.id === contract.id
        )

        if (!deployedContract) return toastsService.error('contract not found')

        const adapter = await automatesModel.fetchAdapterFx({
          protocolAdapter: contract.protocol.adapter,
          contractAdapter: contract.automate.autorestake,
          contractId: contract.id,
          contractAddress: deployedContract.address,
          provider: currentWallet.provider,
          chainId: String(currentWallet.chainId),
          action: 'migrate',
        })

        if (!adapter) return toastsService.error('adapter not found')

        const wallet = deployedContract.contractWallet

        if (!wallet) return toastsService.error('wrong wallet')

        const onLastStep = () => {
          automatesModel
            .scanWalletMetricFx({
              wallet: wallet.id,
              contract: contract.id,
            })
            .catch(console.error)
        }

        if ('methods' in adapter.migrate) {
          await openMigrateDialog({
            methods: adapter.migrate.methods,
            onLastStep,
          })
        } else {
          await openAdapter({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            steps: adapter[action],
            onLastStep,
          })
        }

        analytics.log('auto_staking_migrate_tokens_success', {
          contractAddress: contract.address,
          provider: currentWallet.provider,
          chainId: String(currentWallet.chainId),
        })
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
          analytics.log('auto_staking_migrate_tokens_failure', {
            contractAddress: contract.address,
            provider: currentWallet?.provider,
            chainId: String(currentWallet?.chainId),
          })
        }
      } finally {
        model.migratingEnd()
      }
    }

  const handleAutostake =
    (contract: typeof contracts[number] | typeof hiddenContracts[number]) =>
    async () => {
      analytics.log('auto_staking_migrate_tokens_click')
      model.migratingStart(contract.id)

      try {
        const addresses = await model.fetchContractAddressesFx({
          contracts: [contract],
          protocolAdapter: contract.protocol.adapter,
        })
        const { prototypeAddress = undefined } = addresses[contract.id]

        if (
          !contract.automate.autorestake ||
          !prototypeAddress ||
          !currentWallet ||
          !currentWallet.chainId
        )
          return

        if (!enableAutostakingVideo) {
          await openInvestVideoDialog({
            dontShowAgain: enableAutostakingVideo,
            onDontShowAgain: setEnableAutostakingVideo,
          }).catch(console.error)
        }

        const findedWallet = wallets.find((wallet) => {
          const sameAddreses =
            String(currentWallet.chainId) === 'main'
              ? currentWallet.account === wallet.address
              : currentWallet.account?.toLowerCase() === wallet.address

          return (
            sameAddreses && String(currentWallet.chainId) === wallet.network
          )
        })

        if (!findedWallet) throw new Error('wallet is not connected')

        const metrics = await walletsModel.fetchWalletListMetricsFx()

        const metric = metrics[findedWallet.id]

        if (
          !metric ||
          typeof metric?.billing.balance.netBalance === 'undefined'
        )
          throw Error('wallet is not connected')

        const billingBalance = await settingsWalletModel.fetchBillingBalanceFx({
          blockchain: contract.blockchain,
          network: contract.network,
        })

        if (
          bignumberUtils.lte(
            metric.billing.balance.netBalance,
            billingBalance.recomendedIncome
          )
        ) {
          const adapter = await settingsWalletModel.loadAdapterFx({
            provider: currentWallet.provider,
            chainId: currentWallet.chainId,
          })

          const result = await openAutostakingBalanceDialog({
            network: findedWallet.network,
            wallet: findedWallet.address,
            ...billingBalance,
            adapter,
            variant: 'deposit',
          })

          await walletsModel.depositFx({
            blockchain: findedWallet.blockchain,
            amount: result.amount,
            walletAddress: findedWallet.address,
            chainId: String(currentWallet.chainId),
            provider: currentWallet.provider,
            transactionHash: result.transactionHash,
          })
        }

        const deployAdapter = await deployModel.fetchDeployAdapterFx({
          address: prototypeAddress,
          protocol: contract.protocol.adapter,
          contract: contract.automate.autorestake,
          chainId: String(currentWallet.chainId),
          provider: currentWallet.provider,
          contractAddress: contract.address,
        })

        const stepsResult = await openInvestDeployDialog({
          steps: deployAdapter.deploy,
        })

        props.onChangeTab()

        const deployedContract = await deployModel.deployFx({
          proxyAddress: stepsResult.address,
          inputs: stepsResult.inputs,
          protocol: contract.protocol.id,
          adapter: contract.automate.autorestake,
          contract: contract.id,
          account: findedWallet.address,
          chainId: String(currentWallet.chainId),
          provider: currentWallet.provider,
        })

        const createdTrigger = await automationUpdateModel.createTriggerFx({
          wallet: findedWallet.id,
          params: JSON.stringify({}),
          type: AutomateTriggerTypeEnum.EveryHour,
          name: `Autostaking ${contract.name}`,
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

        const stakingAutomatesAdapter = await automatesModel.fetchAdapterFx({
          protocolAdapter: contract.protocol.adapter,
          contractAdapter: contract.automate.autorestake,
          contractId: contract.id,
          contractAddress: deployedContract.address,
          provider: currentWallet.provider,
          chainId: String(currentWallet.chainId),
          action: 'migrate',
        })

        const { contractWallet } = deployedContract

        if (!stakingAutomatesAdapter || !contractWallet)
          throw new Error('something went wrong')

        const cb = (txId?: string) => {
          automatesModel
            .scanWalletMetricFx({
              wallet: contractWallet.id,
              contract: contract.id,
              txId,
            })
            .catch(console.error)

          automatesModel
            .scanWalletMetricFx({
              wallet: findedWallet.id,
              contract: contract.id,
              txId,
            })
            .catch(console.error)
        }

        if ('methods' in stakingAutomatesAdapter.migrate) {
          await openInvestTabsDialog({
            methods: stakingAutomatesAdapter.migrate.methods,
            onLastStep: cb,
            contractId: contract.id,
          })
        } else {
          await openAdapter({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            steps: stakingAutomatesAdapter.migrate,
          })
            .catch(() => cb())
            .then(() => cb())
        }

        analytics.onAutoStakingEnabled()
        toastsService.success('success!')

        analytics.log('auto_staking_migrate_tokens_success', {
          contractAddress: contract.address,
          provider: currentWallet.provider,
          chainId: String(currentWallet.chainId),
        })
      } catch (error) {
        if (error instanceof Error && !(error instanceof UserRejectionError)) {
          toastsService.error(error.message)
        }

        analytics.log('auto_staking_migrate_tokens_failure', {
          contractAddress: contract.address,
          provider: currentWallet?.provider,
          chainId: String(currentWallet?.chainId),
        })
      } finally {
        model.migratingEnd()
      }
    }

  const handleToggleHidden = () => {
    setHidden(!hidden)
  }

  const handleHide =
    (contract: typeof contracts[number] | typeof hiddenContracts[number]) =>
    () => {
      if (!user?.id) return

      model.contractUserUnlinkFx({
        contract,
        userId: user.id,
      })
    }

  const handleShow =
    (contract: typeof contracts[number] | typeof hiddenContracts[number]) =>
    () => {
      if (!user?.id) return

      model.contractUserLinkFx({
        contract,
        userId: user.id,
      })
    }

  const wallet = walletNetworkModel.useWalletNetwork()

  const handleConnect = useWalletConnect()

  const handleSwitchNetwork =
    (contract: typeof contracts[number] | typeof hiddenContracts[number]) =>
    () =>
      switchNetwork(contract.network).catch(console.error)

  const automatesContractsMap = automatesContracts.reduce(
    (acc, automateContract) => {
      if (!automateContract.contract) return acc

      acc.set(
        automateContract.contract.id,
        automateContract.contract.metric.myStaked
      )

      return acc
    },
    new Map<string, string>()
  )

  return (
    <div className={clsx(styles.root, props.className)}>
      <Component
        className={clsx({
          [styles.empty]: isEmptyContracts,
        })}
        radius={isEmptyContracts ? 8 : undefined}
      >
        {isEmptyContracts && !loading && (
          <Typography variant="h4">
            You don&apos;t have any contracts to migrate to our service right
            now. We will notify you as soon as we will find the suitable one.
          </Typography>
        )}
        {loading && isEmptyContracts && (
          <div className={styles.loader}>
            <Loader height="36" />
          </div>
        )}
        {!isEmptyContracts && (
          <>
            <Typography variant="h4" className={styles.description}>
              We found some of your contracts. You can migrate them to
              DeFiHelper to get more income from each of them.{' '}
              <Link
                href="https://youtu.be/5tUnwK77y8c"
                target="_blank"
                color="blue"
              >
                Learn more about our automations
              </Link>
            </Typography>
            <InvestCarousel
              count={contracts.length}
              slidesToShow={slidesToShow}
            >
              {contracts.map((contract) => {
                const connect = handleConnect.bind(null, {
                  blockchain: contract.blockchain,
                  network: contract.network,
                })

                const wrongNetwork =
                  String(wallet?.chainId) !== contract.network
                    ? handleSwitchNetwork(contract)
                    : null

                const position = automatesContractsMap.get(contract.id)

                const migrate = bignumberUtils.gt(position, 0)
                  ? handleMigrate(contract)
                  : handleAutostake(contract)

                return (
                  <InvestMigrateCard
                    key={contract.id}
                    title={contract.name}
                    balance={contract.metric.myStaked}
                    tokenIcons={
                      contract.tokens.stake.map(
                        ({ alias }) => alias?.logoUrl ?? null
                      ) ?? []
                    }
                    protocol={contract.protocol.name}
                    apy={contract.metric.aprYear}
                    apyBoost={contract.metric.myAPYBoost}
                    onMigrate={!wallet ? connect : wrongNetwork ?? migrate}
                    onHide={handleHide(contract)}
                    hidding={contract.hidding}
                    migrating={contract.migrating}
                  />
                )
              })}
            </InvestCarousel>
          </>
        )}
      </Component>
      {!isEmpty(hiddenContracts) && (
        <>
          <Paper radius={8} className={styles.hiddenPaper}>
            <Typography variant="body2">
              You have {hiddenContracts.length} more hidden contracts
            </Typography>
            <Button
              variant="outlined"
              onClick={handleToggleHidden}
              className={styles.hiddenPaperButton}
            >
              {hidden ? 'show' : 'hide'}
            </Button>
          </Paper>
          <div>
            {!hidden && (
              <InvestCarousel
                count={hiddenContracts.length}
                slidesToShow={slidesToShow}
              >
                {hiddenContracts.map((contract) => {
                  const connect = handleConnect.bind(null, {
                    blockchain: contract.blockchain,
                    network: contract.network,
                  })

                  const wrongNetwork =
                    String(wallet?.chainId) !== contract.network
                      ? handleSwitchNetwork(contract)
                      : null

                  const position = automatesContractsMap.get(contract.id)

                  const migrate = bignumberUtils.gt(position, 0)
                    ? handleMigrate(contract)
                    : handleAutostake(contract)

                  return (
                    <InvestMigrateCard
                      key={contract.id}
                      title={contract.name}
                      balance={contract.metric.myStaked}
                      tokenIcons={
                        contract.tokens.stake.map(
                          ({ alias }) => alias?.logoUrl ?? null
                        ) ?? []
                      }
                      protocol={contract.protocol.name}
                      apy={contract.metric.aprYear}
                      apyBoost={contract.metric.myAPYBoost}
                      onMigrate={!wallet ? connect : wrongNetwork ?? migrate}
                      icon="eye"
                      onShow={handleShow(contract)}
                      showing={contract.showing}
                      migrating={contract.migrating}
                    />
                  )
                })}
              </InvestCarousel>
            )}
          </div>
        </>
      )}
    </div>
  )
}
