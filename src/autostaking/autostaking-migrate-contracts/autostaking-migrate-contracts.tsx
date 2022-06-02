import clsx from 'clsx'
import isEmpty from 'lodash.isempty'
import { useEffect, useMemo } from 'react'
import { useMedia } from 'react-use'
import { useStore } from 'effector-react'

import { Link } from '~/common/link'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { AutostakingCarousel } from '~/autostaking/common/autostaking-carousel'
import { AutostakingMigrateCard } from '~/autostaking/common/autostaking-migrate-card'
import { useDialog } from '~/common/dialog'
import { StakingAdapterDialog, StakingMigrateDialog } from '~/staking/common'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import * as automatesModel from '~/staking/staking-automates/staking-automates.model'
import * as walletsModel from '~/settings/settings-wallets/settings-wallets.model'
import * as model from './autostaking-migrate-contracts.model'
import * as styles from './autostaking-migrate-contracts.css'

export type AutostakingMigrateContractsProps = {
  className?: string
  search: string
}

export const AutostakingMigrateContracts: React.VFC<AutostakingMigrateContractsProps> =
  (props) => {
    const contracts = useStore(model.$contracts)

    const [openMigrateDialog] = useDialog(StakingMigrateDialog)
    const [openAdapter] = useDialog(StakingAdapterDialog)
    const currentWallet = walletNetworkModel.useWalletNetwork()
    const wallets = useStore(walletsModel.$wallets)

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

      model.fetchContractsFx({ signal: abortController.signal })

      return () => abortController.abort()
    }, [])

    const handleMigrate = (contract: typeof contracts[number]) => async () => {
      try {
        if (!currentWallet?.account) return

        const adapter = await automatesModel.fetchAdapterFx({
          protocolAdapter: contract.protocol.adapter,
          contractAdapter: contract.adapter,
          contractId: contract.id,
          contractAddress: contract.address,
          provider: currentWallet.provider,
          chainId: String(currentWallet.chainId),
          action: 'migrate',
        })

        if (!adapter) return

        const findedWallet = wallets.find((wallet) => {
          const sameAddreses =
            String(currentWallet.chainId) === 'main'
              ? currentWallet.account === wallet.address
              : currentWallet.account?.toLowerCase() === wallet.address

          return (
            sameAddreses && String(currentWallet.chainId) === wallet.network
          )
        })

        if (!findedWallet) return

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
      }
    }

    return (
      <Component
        className={clsx(styles.root, props.className, {
          [styles.empty]: isEmptyContracts,
        })}
        radius={isEmptyContracts ? 8 : undefined}
      >
        {isEmptyContracts && (
          <Typography variant="h4">
            We couldn&apos;t find any of your contracts on other services. We
            regularly check for outside contracts, and as soon as we find a
            match, you will see your contracts here with the migration option.
          </Typography>
        )}
        {!isEmptyContracts && (
          <>
            <Typography variant="h4" className={styles.description}>
              We found some of your contracts. You can migrate them to
              DeFiHelper to get more income from each of them.{' '}
              <Link href="/" color="blue">
                Learn more about our automations
              </Link>
            </Typography>
            <AutostakingCarousel
              count={contracts.length}
              slidesToShow={slidesToShow}
            >
              {contracts.map((contract) => (
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
                  onMigrate={handleMigrate(contract)}
                  onHide={() => {}}
                />
              ))}
            </AutostakingCarousel>
          </>
        )}
      </Component>
    )
  }
