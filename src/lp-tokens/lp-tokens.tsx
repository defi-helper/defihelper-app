import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useStore } from 'effector-react'
import isEmpty from 'lodash.isempty'

import { AppLayout } from '~/layouts'
import { Typography } from '~/common/typography'
import { Icon } from '~/common/icon'
import { Paper } from '~/common/paper'
import { Head } from '~/common/head'
import { Select, SelectOption } from '~/common/select'
import { Input } from '~/common/input'
import { Button } from '~/common/button'
import { LPTokensTable } from './common/lp-tokens-table'
import { BlockchainEnum } from '~/api'
import { StakingApyDialog, StakingSuccessDialog } from '~/staking/common'
import { useDialog, UserRejectionError } from '~/common/dialog'
import { toastsService } from '~/toasts'
import { switchNetwork } from '~/wallets/common'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { networksConfig } from '~/networks-config'
import { LPTokensSell } from './lp-tokens-sell'
import { LPTokensBuySellDialog } from './common/lp-tokens-buy-sell-dialog'
import * as stakingAutomatesModel from '~/staking/staking-automates/staking-automates.model'
import * as stakingModel from '~/staking/staking-adapters/staking-adapters.model'
import { settingsWalletModel } from '~/settings/settings-wallets'
import * as styles from './lp-tokens.css'
import * as model from './lp-tokens.model'
import { LPContracts } from './common/lp-tokens.types'
import { LPTokensContracts } from './common/lp-tokens-contracts'
import { useDebounce } from '~/common/hooks'

export type LPTokensProps = unknown

const INSTRUCTION = [
  {
    title: '1. Choose protocol',
    text: "Select a protocol and look for the 'ZAP' button",
  },
  {
    title: '2. Choose contract',
    text: 'Choose a contract based on our TVL and APY data',
  },
  {
    title: "3. Press 'ZAP' button",
    text: "Click on the 'ZAP' button to invest in a certain pool",
  },
]

export const LPTokens: React.VFC<LPTokensProps> = () => {
  const protocols = useStore(model.$protocols)
  const protocolsSelect = useStore(model.$protocolsSelect)
  const contracts = useStore(model.$contracts)

  const [protocolIds, setProtocolIds] = useState<string[]>([])
  const protocolIdsRef = useRef<string[]>([])
  const [searchProtocol, setSearchProtocol] = useState('')
  const [openedProtocol, setOpenedProtocol] = useState('')
  const [blockchain, setBlockChain] = useState<BlockchainEnum | null>(null)
  const [searchPool, setSearchPool] = useState('')

  const protocolListLoading = useStore(model.fetchProtocolsFx.pending)
  const contractListLoading = useStore(model.fetchContractsFx.pending)
  const protocolSelectLoading = useStore(model.fetchProtocolsSelectFx.pending)

  const [openSuccessDialog] = useDialog(StakingSuccessDialog)
  const [openBuySellDialog] = useDialog(LPTokensBuySellDialog)
  const [openApyDialog] = useDialog(StakingApyDialog)

  const currentWallet = walletNetworkModel.useWalletNetwork()
  const wallets = useStore(settingsWalletModel.$wallets)

  const searchPoolDebounced = useDebounce(searchPool, 500)

  useEffect(() => {
    const abortController = new AbortController()

    model.fetchProtocolsFx({
      signal: abortController.signal,
      filter: {
        id: isEmpty(protocolIds) ? undefined : protocolIds,
        blockchain: blockchain
          ? {
              network: blockchain,
              protocol: networksConfig[blockchain].blockchain,
            }
          : undefined,
      },
    })

    return () => {
      abortController.abort()
      model.resetProtocols()
    }
  }, [protocolIds, blockchain])

  const contractsOffset = useStore(model.useInfiniteScrollContracts.offset)

  useEffect(() => {
    const filter = {
      protocol: openedProtocol ? [openedProtocol] : undefined,
      search: !isEmpty(searchPoolDebounced) ? searchPoolDebounced : undefined,
    }

    if (isEmpty(Object.values(filter).filter(Boolean))) return

    const abortController = new AbortController()

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
  }, [openedProtocol, contractsOffset, searchPoolDebounced])

  useEffect(() => {
    return () => {
      model.resetContracts()
      model.useInfiniteScrollContracts.reset()
    }
  }, [openedProtocol, searchPool])

  useEffect(() => {
    const abortController = new AbortController()

    model.fetchProtocolsSelectFx({
      signal: abortController.signal,
      search: searchProtocol || undefined,
    })

    return () => {
      abortController.abort()
      model.resetProtocolsSelect()
    }
  }, [searchProtocol])

  const handleFilterByProtocolId = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.split(',').filter(Boolean)

    protocolIdsRef.current = value

    if (isEmpty(value)) {
      setProtocolIds(value)
    }
  }

  const handleApplyFilterByProtocolId = () => {
    setProtocolIds(protocolIdsRef.current)
  }

  const handleSearchProtocol = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchProtocol(event.target.value)
  }

  const handleSearchPool = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchPool(event.target.value)
  }

  const handleChooseBlockchain = (event: ChangeEvent<HTMLInputElement>) => {
    setBlockChain(event.target.value as BlockchainEnum)
  }

  const handleBuyLiquidity = async (contract: typeof contracts[number]) => {
    if (!currentWallet?.account) return

    await switchNetwork(contract.network).catch((error) => {
      if (error instanceof Error) {
        toastsService.error(error.message)
      }
    })

    const router = contract.automate.lpTokensManager?.router

    const pair = contract.automate.lpTokensManager?.pair

    if (!router || !pair) return

    try {
      const { buyLiquidity, sellLiquidity, tokens } =
        await stakingModel.buyLPFx({
          account: currentWallet.account,
          provider: currentWallet.provider,
          chainId: contract.network,
          router,
          pair,
          network: contract.network,
          protocol: contract.blockchain,
        })

      const findedWallet = wallets.find((wallet) => {
        const sameAddreses =
          String(currentWallet.chainId) === 'main'
            ? currentWallet.account === wallet.address
            : currentWallet.account?.toLowerCase() === wallet.address

        return sameAddreses && String(currentWallet.chainId) === wallet.network
      })

      if (!findedWallet) throw new Error('wallet is not connected')

      const cb = (txId?: string) => {
        stakingAutomatesModel
          .scanWalletMetricFx({
            wallet: findedWallet.id,
            contract: contract.id,
            txId,
          })
          .catch(console.error)
      }

      await openBuySellDialog({
        buyLiquidityAdapter: buyLiquidity,
        sellLiquidityAdapter: sellLiquidity,
        tokens,
        onSubmit: cb,
      })

      await openSuccessDialog({
        type: 'buyLiquidity',
      })
    } catch (error) {
      if (error instanceof Error && !(error instanceof UserRejectionError)) {
        console.error(error.message)
      }
    }
  }

  const handleOpenApy = async (metric: LPContracts[number]['metric']) => {
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
    useStore(model.useInfiniteScrollContracts.hasNextPage) ||
    contractListLoading

  return (
    <AppLayout title="ZAP">
      <Head title="ZAP" />
      <div className={styles.header}>
        <Icon icon="automation" className={styles.headerIcon} />
        <Typography variant="h3">ZAP</Typography>
      </div>
      <Typography variant="h4" className={styles.subtitle}>
        Buying liquidity pool tokens is as easy as 1-2-3
      </Typography>
      <div className={styles.instruction}>
        {INSTRUCTION.map((instructionItem) => (
          <Paper
            className={styles.instructionCard}
            radius={8}
            key={instructionItem.title}
          >
            <Typography className={styles.instructionCardTitle}>
              {instructionItem.title}
            </Typography>
            <Typography variant="body2">{instructionItem.text}</Typography>
          </Paper>
        ))}
      </div>
      {false && <LPTokensSell className={styles.sell} />}
      <div className={styles.selects}>
        <Select
          placeholder="Choose blockchain"
          className={styles.select}
          onChange={handleChooseBlockchain}
          clearable
        >
          {Object.entries(networksConfig).map(([value, { title }]) => (
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
              value={searchProtocol}
              onChange={handleSearchProtocol}
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
          value={searchPool}
          onChange={handleSearchPool}
        />
      </div>
      {isEmpty(searchPool) && (
        <LPTokensTable
          protocols={protocols}
          onProtocolClick={setOpenedProtocol}
          openedProtocol={openedProtocol}
          protocolListLoading={protocolListLoading}
          contracts={contracts}
          contractListLoading={contractListLoading}
          onBuyLpClick={handleBuyLiquidity}
          contractsSentryRef={contractsSentryRef}
          contractsHasNextPage={contractsHasNextPage}
          onOpenApy={handleOpenApy}
        />
      )}
      {!isEmpty(searchPool) && (
        <LPTokensContracts
          contracts={contracts}
          contractListLoading={contractListLoading}
          contractsSentryRef={contractsSentryRef}
          contractsHasNextPage={contractsHasNextPage}
          onOpenApy={handleOpenApy}
          onBuyLP={handleBuyLiquidity}
        />
      )}
    </AppLayout>
  )
}
