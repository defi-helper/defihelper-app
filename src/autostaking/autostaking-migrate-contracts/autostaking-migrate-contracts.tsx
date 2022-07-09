import clsx from 'clsx'
import isEmpty from 'lodash.isempty'
import { useEffect, useMemo, useState } from 'react'
import { useLocalStorage, useMedia } from 'react-use'
import { useGate, useStore } from 'effector-react'

import { Link } from '~/common/link'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { AutostakingCarousel } from '~/autostaking/common/autostaking-carousel'
import { AutostakingMigrateCard } from '~/autostaking/common/autostaking-migrate-card'
import { useDialog, UserRejectionError } from '~/common/dialog'
import { StakingAdapterDialog, StakingMigrateDialog } from '~/staking/common'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { Button } from '~/common/button'
import * as automatesModel from '~/staking/staking-automates/staking-automates.model'
import * as walletsModel from '~/settings/settings-wallets/settings-wallets.model'
import * as model from './autostaking-migrate-contracts.model'
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
import { AutostakingVideoDialog } from '../common/autostaking-video-dialog'
import { AutostakingBalanceDialog } from '../common/autostaking-balance-dialog'
import { AutostakingDeployDialog } from '../common/autostaking-deploy-dialog'
import { AutostakingTabsDialog } from '../common/autostaking-tabs-dialog'
import * as autostakingContractsModel from '~/autostaking/autostaking-contracts/autostaking-contracts.model'
import * as automationUpdateModel from '~/automations/automation-update/automation-update.model'
import * as deployModel from '~/automations/automation-deploy-contract/automation-deploy-contract.model'
import * as styles from './autostaking-migrate-contracts.css'
import { Loader } from '~/common/loader'

export type AutostakingMigrateContractsProps = {
  className?: string
  search: string
}

export const AutostakingMigrateContracts: React.VFC<AutostakingMigrateContractsProps> =
  (props) => {
    const contracts = useStore(model.$contractsWithLoading)
    const hiddenContracts = useStore(model.$hiddenContractsWithLoading)
    const loading = useStore(model.fetchContractsFx.pending)

    const [enableAutostakingVideo, setEnableAutostakingVideo] = useLocalStorage(
      'enableAutostakingVideo',
      false
    )

    const [openMigrateDialog] = useDialog(StakingMigrateDialog)
    const [openAdapter] = useDialog(StakingAdapterDialog)
    const [openAutostakingVideoDialog] = useDialog(AutostakingVideoDialog)
    const [openAutostakingBalanceDialog] = useDialog(AutostakingBalanceDialog)
    const [openAutostakingDeployDialog] = useDialog(AutostakingDeployDialog)
    const [openAutostakingTabsDialog] = useDialog(AutostakingTabsDialog)
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
    }, [props.search])

    useEffect(() => {
      const abortController = new AbortController()

      model.fetchHiddenContractsFx({ signal: abortController.signal })

      return () => abortController.abort()
    }, [])

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
          if (!currentWallet?.account)
            return toastsService.error('wallet is not connected')
          if (!contract.automate.autorestake)
            return toastsService.error('adapter not found')

          const adapter = await automatesModel.fetchAdapterFx({
            protocolAdapter: contract.protocol.adapter,
            contractAdapter: contract.automate.autorestake,
            contractId: contract.id,
            contractAddress: contract.address,
            provider: currentWallet.provider,
            chainId: String(currentWallet.chainId),
            action: 'migrate',
          })

          if (!adapter) return toastsService.error('adapter not found')

          const findedWallet = wallets.find((wallet) => {
            const sameAddreses =
              String(currentWallet.chainId) === 'main'
                ? currentWallet.account === wallet.address
                : currentWallet.account?.toLowerCase() === wallet.address

            return (
              sameAddreses && String(currentWallet.chainId) === wallet.network
            )
          })

          if (!findedWallet) return toastsService.error('wrong wallet')

          const onLastStep = () => {
            automatesModel
              .scanWalletMetricFx({
                walletId: findedWallet.id,
                contractId: contract.id,
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
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.message)
          }
        } finally {
          model.migratingEnd()
        }
      }

    const handleAutostake =
      (contract: typeof contracts[number] | typeof hiddenContracts[number]) =>
      async () => {
        model.migratingStart(contract.id)

        try {
          const addresses =
            await autostakingContractsModel.fetchContractAddressesFx({
              contracts: [contract],
              protocolAdapter: contract.protocol.adapter,
            })
          const { prototypeAddress = undefined } = addresses[contract.id]

          if (
            !contract.automate.autorestake ||
            !prototypeAddress ||
            !currentWallet
          )
            return

          if (!enableAutostakingVideo) {
            await openAutostakingVideoDialog({
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

          const billingBalance =
            await autostakingContractsModel.fetchBillingBalanceFx({
              blockchain: contract.blockchain,
              network: contract.network,
            })

          if (
            bignumberUtils.lte(
              metric.billing.balance.netBalance,
              billingBalance.recomendedIncome
            )
          ) {
            await openAutostakingBalanceDialog({
              balance: String(metric.billing.balance.netBalance),
              network: findedWallet.network,
              wallet: findedWallet.address,
              ...billingBalance,
              onSubmit: (result) =>
                walletsModel.depositFx({
                  blockchain: findedWallet.blockchain,
                  amount: result.amount,
                  walletAddress: findedWallet.address,
                  chainId: String(currentWallet.chainId),
                  provider: currentWallet.provider,
                }),
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

          const stepsResult = await openAutostakingDeployDialog({
            steps: deployAdapter.deploy,
          })

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
            contractAddress: contract.address,
            provider: currentWallet.provider,
            chainId: String(currentWallet.chainId),
            action: 'migrate',
          })

          if (!stakingAutomatesAdapter) throw new Error('something went wrong')

          const cb = () => {
            automatesModel
              .scanWalletMetricFx({
                walletId: createdTrigger.wallet.id,
                contractId: contract.id,
              })
              .catch(console.error)
          }

          if ('methods' in stakingAutomatesAdapter.migrate) {
            await openAutostakingTabsDialog({
              methods: stakingAutomatesAdapter.migrate.methods,
              onLastStep: cb,
            })
          } else {
            await openAdapter({
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              steps: stakingAutomatesAdapter.migrate,
            })
              .catch(cb)
              .then(cb)
          }

          analytics.onAutoStakingEnabled()
          toastsService.success('success!')
        } catch (error) {
          if (
            error instanceof Error &&
            !(error instanceof UserRejectionError)
          ) {
            toastsService.error(error.message)
          }
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
              <AutostakingCarousel
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
                    <AutostakingMigrateCard
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
              </AutostakingCarousel>
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
                <AutostakingCarousel
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
                      <AutostakingMigrateCard
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
                </AutostakingCarousel>
              )}
            </div>
          </>
        )}
      </div>
    )
  }
