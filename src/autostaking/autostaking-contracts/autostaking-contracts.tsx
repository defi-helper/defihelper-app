import clsx from 'clsx'
import { useStore } from 'effector-react'
import isEmpty from 'lodash.isempty'
import React, { useEffect, useRef, useState } from 'react'
import { useThrottle, useLocalStorage } from 'react-use'

import {
  AutomateActionTypeEnum,
  AutomateConditionTypeEnum,
  AutomateTriggerTypeEnum,
  BlockchainEnum,
} from '~/api'
import { bignumberUtils } from '~/common/bignumber-utils'
import { buildExplorerUrl } from '~/common/build-explorer-url'
import { Button } from '~/common/button'
import { ButtonBase } from '~/common/button-base'
import { useDialog, UserRejectionError } from '~/common/dialog'
import { Dropdown } from '~/common/dropdown'
import { Icon } from '~/common/icon'
import { Input } from '~/common/input'
import { Link } from '~/common/link'
import { Loader } from '~/common/loader'
import { Paper } from '~/common/paper'
import { Select, SelectOption } from '~/common/select'
import { Typography } from '~/common/typography'
import { networksConfig } from '~/networks-config'
import { StakingAdapterDialog, StakingApyDialog } from '~/staking/common'
import { AutostakingVideoDialog } from '~/autostaking/common/autostaking-video-dialog'
import { AutostakingBalanceDialog } from '~/autostaking/common/autostaking-balance-dialog'
import { AutostakingDeployDialog } from '~/autostaking/common/autostaking-deploy-dialog'
import { AutostakingTabsDialog } from '../common/autostaking-tabs-dialog'
import { toastsService } from '~/toasts'
import { analytics } from '~/analytics'
import { switchNetwork } from '~/wallets/common'
import * as automationUpdateModel from '~/automations/automation-update/automation-update.model'
import * as styles from './autostaking-contracts.css'
import * as model from './autostaking-contracts.model'
import * as walletsModel from '~/settings/settings-wallets/settings-wallets.model'
import * as deployModel from '~/automations/automation-deploy-contract/automation-deploy-contract.model'
import * as stakingAutomatesModel from '~/staking/staking-automates/staking-automates.model'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { WalletConnect } from '~/wallets/wallet-connect'

export type AutostakingContractsProps = {
  className?: string
}

export const AutostakingContracts: React.VFC<AutostakingContractsProps> = (
  props
) => {
  const [openApyDialog] = useDialog(StakingApyDialog)
  const [openAutostakingVideoDialog] = useDialog(AutostakingVideoDialog)
  const [openAutostakingBalanceDialog] = useDialog(AutostakingBalanceDialog)
  const [openAutostakingDeployDialog] = useDialog(AutostakingDeployDialog)
  const [openAutostakingTabsDialog] = useDialog(AutostakingTabsDialog)
  const [openAdapter] = useDialog(StakingAdapterDialog)

  const [enableAutostakingVideo, setEnableAutostakingVideo] = useLocalStorage(
    'enableAutostakingVideo',
    false
  )

  const contractsLoading = useStore(model.fetchContractsFx.pending)
  const contracts = useStore(model.$contracts)

  const protocolSelectLoading = useStore(model.fetchProtocolsSelectFx.pending)
  const protocolsSelect = useStore(model.$protocolsSelect)

  const [protocolIds, setProtocolIds] = useState<string[]>([])
  const protocolIdsRef = useRef<string[]>([])
  const [protocolSelectSearch, setProtocolSelectSearch] = useState('')
  const [search, setSearch] = useState('')

  const protocolSelectSearchThrottled = useThrottle(protocolSelectSearch, 500)
  const searchThrottled = useThrottle(search, 500)

  const contractsOffset = useStore(model.useInfiniteScrollContracts.offset)
  const currentWallet = walletNetworkModel.useWalletNetwork()
  const wallets = useStore(walletsModel.$wallets)

  useEffect(() => {
    const abortController = new AbortController()

    const filter = {
      search: searchThrottled || undefined,
      protocol: !isEmpty(protocolIds) ? protocolIds : undefined,
    }

    model.fetchContractsFx({
      signal: abortController.signal,
      filter,
      pagination: {
        offset: contractsOffset,
      },
    })

    return () => {
      abortController.abort()
    }
  }, [protocolIds, searchThrottled, contractsOffset])

  useEffect(() => {
    model.resetContracts()
    model.useInfiniteScrollContracts.reset()
  }, [searchThrottled])

  useEffect(() => {
    const abortController = new AbortController()

    model.fetchProtocolsSelectFx({
      signal: abortController.signal,
      search: protocolSelectSearchThrottled || undefined,
    })

    return () => {
      model.resetProtocolsSelect()
      abortController.abort()
    }
  }, [protocolSelectSearchThrottled])

  const handleProtocolSelectSearch = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProtocolSelectSearch(event.target.value)
  }

  const handleFilterByProtocolId = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value.split(',').filter(Boolean)

    protocolIdsRef.current = value

    if (isEmpty(value)) {
      setProtocolIds(value)
    }
  }

  const handleApplyFilterByProtocolId = () => {
    setProtocolIds(protocolIdsRef.current)
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const handleOpenApy =
    (metric: typeof contracts[number]['metric']) => async () => {
      const apr = {
        '1d': metric.aprDay,
        '7d': metric.aprWeek,
        '30d': metric.aprMonth,
        '365d(APY)': metric.aprYear,
      }

      try {
        await openApyDialog({
          apr,
          staked: metric.myStaked,
        })
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    }

  const [contractsSentryRef] = model.useInfiniteScrollContracts()
  const contractsHasNextPage =
    useStore(model.useInfiniteScrollContracts.hasNextPage) || contractsLoading

  useEffect(() => {
    return () => {
      model.resetContracts()
      model.useInfiniteScrollContracts.reset()
    }
  }, [])

  const handleAutostake = (contract: typeof contracts[number]) => async () => {
    try {
      const addresses = await model.fetchContractAddressesFx({
        contracts: [contract],
        protocolAdapter: contract.protocol.adapter,
      })
      const { prototypeAddress = undefined } = addresses[contract.id]

      await switchNetwork(contract.network)

      if (!contract.automate.autorestake || !prototypeAddress || !currentWallet)
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

        return sameAddreses && String(currentWallet.chainId) === wallet.network
      })

      if (!findedWallet) throw new Error('wallet is not connected')

      const metrics = await walletsModel.fetchWalletListMetricsFx()

      const metric = metrics[findedWallet.id]

      if (!metric || typeof metric?.billing.balance.netBalance === 'undefined')
        throw Error('wallet is not connected')

      const billingBalance = await model.fetchBillingBalanceFx({
        blockchain: findedWallet.blockchain,
        network: findedWallet.network,
      })

      if (
        bignumberUtils.lt(
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

      const stakingAutomatesAdapter =
        await stakingAutomatesModel.fetchAdapterFx({
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
        stakingAutomatesModel
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
      if (error instanceof Error && !(error instanceof UserRejectionError)) {
        toastsService.error(error.message)
      }
    }
  }

  return (
    <div className={clsx(styles.root, props.className)}>
      <div className={styles.header}>
        <Typography variant="h3" className={styles.title}>
          Staking Contracts
        </Typography>
        <div className={styles.selects}>
          <Select
            placeholder="Choose blockchain"
            className={styles.select}
            clearable
          >
            {Object.entries(BlockchainEnum).map(([title, value]) => (
              <SelectOption value={value} key={title}>
                {title}
              </SelectOption>
            ))}
          </Select>
          <Select
            placeholder="Choose protocol"
            clearable
            multiple
            className={styles.select}
            onChange={handleFilterByProtocolId}
            header={
              <Input
                placeholder="Search"
                onChange={handleProtocolSelectSearch}
                value={protocolSelectSearch}
              />
            }
            footer={
              <Button
                color="green"
                size="medium"
                className={styles.apply}
                onClick={handleApplyFilterByProtocolId}
              >
                Apply
              </Button>
            }
          >
            {protocolSelectLoading && isEmpty(protocolsSelect) && (
              <SelectOption disabled>Loading...</SelectOption>
            )}
            {!protocolSelectLoading && isEmpty(protocolsSelect) && (
              <SelectOption disabled>No protocols found</SelectOption>
            )}
            {protocolsSelect.map((protocol) => (
              <SelectOption
                value={protocol.id}
                renderValue={protocol.name}
                key={protocol.id}
              >
                {protocol.icon ? (
                  <img
                    src={protocol.icon}
                    alt=""
                    className={styles.protocolIcon}
                  />
                ) : (
                  <Paper className={styles.protocolIcon} />
                )}
                {protocol.name}
              </SelectOption>
            ))}
          </Select>
          <Input
            placeholder="Search"
            className={styles.search}
            onChange={handleSearch}
            value={search}
          />
        </div>
      </div>
      <div className={styles.tableWrap}>
        <Paper radius={8} className={styles.table}>
          <div className={styles.tableHeader}>
            <Typography variant="body2" as="div" className={styles.tableName}>
              Pool
            </Typography>
            <Typography variant="body2">Protocol</Typography>
            <Typography variant="body2" align="right" as="div">
              TVL
            </Typography>
            <Typography variant="body2" align="right" as="div">
              APY
            </Typography>
            <Typography variant="body2" align="right" as="div">
              Real APR (7d)
            </Typography>
            <Typography variant="body2" as="div">
              APY Boost
            </Typography>
          </div>
          {isEmpty(contracts) && !contractsLoading && (
            <div className={styles.padding}>No data</div>
          )}
          {contracts.map((contract, ind) => (
            <div className={styles.row} key={String(contract.id + ind)}>
              <Typography
                as="div"
                variant="body2"
                className={styles.contractCardName}
              >
                <span className={styles.contractCardIcons}>
                  {networksConfig[contract.network]?.icon ? (
                    <Icon
                      icon={networksConfig[contract.network].icon}
                      width="20"
                      height="20"
                      className={styles.contractNetworkIcon}
                    />
                  ) : (
                    <Paper className={styles.contractUnknownNetworkIcon}>
                      <Icon icon="unknownNetwork" width="16" height="16" />
                    </Paper>
                  )}
                  {isEmpty(contract.tokens.stake) ? (
                    <Paper className={styles.contractCardIcon} />
                  ) : (
                    contract.tokens.stake.map((token, index) => {
                      const icon = token.alias?.logoUrl ? (
                        <img
                          src={token.alias?.logoUrl}
                          alt=""
                          className={styles.contractCardIcon}
                        />
                      ) : (
                        <Paper className={styles.contractCardIcon}>
                          <Icon icon="unknownNetwork" width="16" height="16" />
                        </Paper>
                      )

                      return (
                        <Dropdown
                          key={String(index)}
                          control={
                            <ButtonBase
                              className={styles.contractCardButtonIcon}
                            >
                              {icon}
                            </ButtonBase>
                          }
                          className={styles.contractTokenInfo}
                        >
                          {(close) => (
                            <>
                              <ButtonBase
                                onClick={close}
                                className={styles.contractTokenInfoClose}
                              >
                                <Icon icon="close" width={34} height={34} />
                              </ButtonBase>
                              {icon}
                              <div>
                                <Typography variant="body2" family="mono">
                                  {token.name}
                                </Typography>
                                <Typography variant="body2" family="mono">
                                  <Link
                                    target="_blank"
                                    color="blue"
                                    className={styles.contractCardLink}
                                    href={buildExplorerUrl({
                                      address: token.address,
                                      network: token.network,
                                    })}
                                  >
                                    Explorer{' '}
                                    <Icon
                                      icon="link"
                                      width="1em"
                                      height="1em"
                                    />
                                  </Link>
                                </Typography>
                              </div>
                            </>
                          )}
                        </Dropdown>
                      )
                    })
                  )}
                </span>
                <Typography variant="inherit">{contract.name}</Typography>
              </Typography>
              <Typography
                variant="body2"
                as="div"
                className={styles.contractProtocol}
              >
                {contract.protocol.icon ? (
                  <img
                    alt=""
                    src={contract.protocol.icon}
                    className={styles.contractProtocolIcon}
                  />
                ) : (
                  <Paper className={styles.contractProtocolIcon}>
                    <Icon icon="unknownNetwork" width="16" height="16" />
                  </Paper>
                )}{' '}
                {contract.protocol.name}
              </Typography>
              <Typography variant="body2" align="right" as="div">
                ${bignumberUtils.format(contract.metric.tvl)}
              </Typography>
              <Typography variant="body2" align="right" as="div">
                {bignumberUtils.formatMax(
                  bignumberUtils.mul(contract.metric.aprYear, 100),
                  10000
                )}
                %
              </Typography>
              <Typography variant="body2" align="right" as="div">
                {bignumberUtils.formatMax(
                  bignumberUtils.mul(contract.metric.aprWeekReal, 100),
                  10000,
                  true
                )}
                %
                <ButtonBase
                  onClick={handleOpenApy(contract.metric)}
                  className={styles.apyButton}
                >
                  <Icon icon="calculator" width="20" height="20" />
                </ButtonBase>
              </Typography>
              <div className={styles.apyBoost}>
                <Typography variant="body2" align="right" as="span">
                  {bignumberUtils.formatMax(
                    bignumberUtils.mul(contract.metric.myAPYBoost, 100),
                    10000,
                    true
                  )}
                  %
                </Typography>
                <WalletConnect
                  fallback={
                    <Button
                      color="green"
                      size="small"
                      className={styles.autostakeButton}
                    >
                      auto-stake
                    </Button>
                  }
                >
                  <Button
                    color="green"
                    size="small"
                    className={styles.autostakeButton}
                    onClick={handleAutostake(contract)}
                  >
                    auto-stake
                  </Button>
                </WalletConnect>
              </div>
            </div>
          ))}
          {contractsHasNextPage && (
            <div className={styles.loader} ref={contractsSentryRef}>
              <Loader height="36" />
            </div>
          )}
        </Paper>
      </div>
    </div>
  )
}
