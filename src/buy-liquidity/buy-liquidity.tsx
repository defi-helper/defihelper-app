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
import { BuyLiquidityTable } from './common/buy-liquidity-table'
import { BlockchainEnum } from '~/api'
import {
  StakingBuyLiquidityDialog,
  StakingSuccessDialog,
} from '~/staking/common'
import { useDialog, UserRejectionError } from '~/common/dialog'
import { toastsService } from '~/toasts'
import { switchNetwork } from '~/wallets/common'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import * as stakingModel from '~/staking/staking-adapters/staking-adapters.model'
import * as styles from './buy-liquidity.css'
import * as model from './buy-liquidity.model'

export type BuyLiquidityProps = unknown

const INSTRUCTION = [
  {
    title: '1. Choose  one of supported protocol ',
    text: 'You can buy LP only with suported protocols. Look up for «Buy LP» button',
  },
  {
    title: '2. Choose contract ',
    text: "Make your choice based on the numbers: we've already calculated TVL and APY for you",
  },
  {
    title: "3. Press «Buy LP» button and you're in!",
    text: 'AS easy as that! Pressing «Buy LP» will start automation wich allows you do it right in DFH!',
  },
]

export const BuyLiquidity: React.VFC<BuyLiquidityProps> = () => {
  const protocols = useStore(model.$protocols)
  const protocolsSelect = useStore(model.$protocolsSelect)
  const contracts = useStore(model.$contracts)

  const [protocolIds, setProtocolIds] = useState<string[]>([])
  const protocolIdsRef = useRef<string[]>([])
  const [search, setSearch] = useState('')
  const [openedProtocol, setOpenedProtocol] = useState('')
  const [blockchain, setBlockChain] = useState<BlockchainEnum | null>(null)

  const protocolListLoading = useStore(model.fetchProtocolsFx.pending)
  const contractListLoading = useStore(model.fetchContractsFx.pending)
  const protocolSelectLoading = useStore(model.fetchProtocolsSelectFx.pending)

  const [openBuyLiquidity] = useDialog(StakingBuyLiquidityDialog)
  const [openSuccessDialog] = useDialog(StakingSuccessDialog)

  const wallet = walletNetworkModel.useWalletNetwork()

  useEffect(() => {
    const abortController = new AbortController()

    model.fetchProtocolsFx({
      signal: abortController.signal,
      filter: {
        id: isEmpty(protocolIds) ? undefined : protocolIds,
        blockchain: blockchain
          ? {
              protocol: blockchain,
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
    if (!openedProtocol) return

    const abortController = new AbortController()

    model.fetchContractsFx({
      signal: abortController.signal,
      filter: {
        id: openedProtocol,
      },
      contractPagination: {
        offset: contractsOffset,
      },
    })

    return () => {
      abortController.abort()
    }
  }, [openedProtocol, contractsOffset])

  useEffect(() => {
    return () => {
      model.resetContracts()
      model.useInfiniteScrollContracts.reset()
    }
  }, [openedProtocol])

  useEffect(() => {
    const abortController = new AbortController()

    model.fetchProtocolsSelectFx({
      signal: abortController.signal,
      search: search || undefined,
    })

    return () => {
      abortController.abort()
      model.resetProtocolsSelect()
    }
  }, [search])

  const handleFilterByProtocolId = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.split(',').filter(Boolean)

    protocolIdsRef.current = value

    if (isEmpty(value)) {
      setProtocolIds(value)
    }
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const handleApplyFilterByProtocolId = () => {
    setProtocolIds(protocolIdsRef.current)
  }

  const handleChooseBlockchain = (event: ChangeEvent<HTMLInputElement>) => {
    setBlockChain(event.target.value as BlockchainEnum)
  }

  const handleBuyLiquidity = async (contract: typeof contracts[number]) => {
    if (!wallet?.account || !contract.automate.buyLiquidity) return

    await switchNetwork(contract.network).catch((error) => {
      if (error instanceof Error) {
        toastsService.error(error.message)
      }
    })

    try {
      const { adapter, tokens } = await stakingModel.buyLPFx({
        account: wallet.account,
        provider: wallet.provider,
        chainId: contract.network,
        router: contract.automate.buyLiquidity.router,
        pair: contract.automate.buyLiquidity.pair,
        network: contract.network,
        protocol: contract.blockchain,
      })

      await openBuyLiquidity({
        buyLiquidityAdapter: adapter,
        tokens,
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

  const [contractsSentryRef] = model.useInfiniteScrollContracts()
  const contractsHasNextPage =
    useStore(model.useInfiniteScrollContracts.hasNextPage) ||
    contractListLoading

  return (
    <AppLayout title="Buy LP">
      <Head title="Buy LP" />
      <div className={styles.header}>
        <Icon icon="automation" className={styles.headerIcon} />
        <Typography variant="h3">Buy LP</Typography>
      </div>
      <Typography variant="h4" className={styles.subtitle}>
        Buying liquidity pools in DFH is easy as 1,2,3
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
      <div className={styles.selects}>
        <Select
          placeholder="Choose blockchain"
          className={styles.select}
          onChange={handleChooseBlockchain}
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
              value={search}
              onChange={handleSearch}
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
      </div>
      <BuyLiquidityTable
        protocols={protocols}
        onProtocolClick={setOpenedProtocol}
        openedProtocol={openedProtocol}
        protocolListLoading={protocolListLoading}
        contracts={contracts}
        contractListLoading={contractListLoading}
        onBuyLpClick={handleBuyLiquidity}
        contractsSentryRef={contractsSentryRef}
        contractsHasNextPage={contractsHasNextPage}
      />
    </AppLayout>
  )
}
