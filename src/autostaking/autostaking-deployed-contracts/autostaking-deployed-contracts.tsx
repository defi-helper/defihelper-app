import clsx from 'clsx'
import isEmpty from 'lodash.isempty'
import { useMemo } from 'react'
import { useMedia } from 'react-use'
import { useStore, useGate } from 'effector-react'

import { AutostakingDeployedContractCard } from '~/autostaking/common/autostaking-deployed-contract-card'
import { Paper } from '~/common/paper'
import { AutostakingCarousel } from '~/autostaking/common/autostaking-carousel'
import { Typography } from '~/common/typography'
import * as model from '~/staking/staking-automates/staking-automates.model'
import * as styles from './autostaking-deployed-contracts.css'
import { Loader } from '~/common/loader'

export type AutostakingDeployedContractsProps = {
  className?: string
  search: string
}

export const AutostakingDeployedContracts: React.VFC<AutostakingDeployedContractsProps> =
  (props) => {
    const contracts = useStore(model.$automatesContracts)
    const loading = useStore(model.fetchAutomatesContractsFx.pending)

    useGate(model.StakingAutomatesGate, null)

    const isEmptyContracts = isEmpty(contracts)

    const Component = isEmptyContracts ? Paper : 'div'

    const isDesktop = useMedia('(min-width: 1440px)')
    const isTablet = useMedia('(min-width: 960px)')

    const slidesToShow = useMemo(() => {
      if (isDesktop) {
        return 3
      }

      if (isTablet) {
        return 2
      }

      return 1
    }, [isDesktop, isTablet])

    const handleOnDelete =
      (deployedContract: typeof contracts[number]) => () => {
        console.log(deployedContract)
      }
    const handleOnUnstake =
      (deployedContract: typeof contracts[number]) => () => {
        console.log(deployedContract)
      }
    const handleOnDeposit =
      (deployedContract: typeof contracts[number]) => () => {
        console.log(deployedContract)
      }
    const handleOnRun = (deployedContract: typeof contracts[number]) => () => {
      console.log(deployedContract)
    }

    return (
      <Component
        className={clsx(props.className, {
          [styles.empty]: isEmptyContracts || loading,
        })}
        radius={isEmptyContracts || loading ? 8 : undefined}
      >
        {loading && (
          <div className={styles.loader}>
            <Loader height="36" />
          </div>
        )}
        {isEmptyContracts && !loading && (
          <Typography variant="h4">
            We couldn&apos;t find any of your contracts on other services. We
            regularly check for outside contracts, and as soon as we find a
            match, you will see your contracts here with the deposit option.
          </Typography>
        )}
        {!isEmptyContracts && !loading && (
          <AutostakingCarousel
            count={contracts.length}
            slidesToShow={slidesToShow}
          >
            {contracts.map((deployedContract) => (
              <AutostakingDeployedContractCard
                key={deployedContract.id}
                title={deployedContract.contract?.name ?? ''}
                address={deployedContract.address}
                network={deployedContract.contract?.network ?? ''}
                tokensIcons={
                  deployedContract.contract?.tokens.stake.map(
                    ({ alias }) => alias?.logoUrl ?? null
                  ) ?? []
                }
                blockchain={deployedContract.contract?.blockchain ?? ''}
                value={deployedContract.contractWallet?.metric.stakedUSD ?? ''}
                apy={deployedContract.contract?.metric.aprYear}
                apyBoost={deployedContract.contract?.metric.myAPYBoost}
                onDelete={handleOnDelete(deployedContract)}
                onUnstake={handleOnUnstake(deployedContract)}
                onDeposit={handleOnDeposit(deployedContract)}
                onRun={handleOnRun(deployedContract)}
                deleting={deployedContract.deleting}
                depositing={deployedContract.depositing}
                running={deployedContract.running}
                unstaking={deployedContract.refunding}
              />
            ))}
          </AutostakingCarousel>
        )}
      </Component>
    )
  }
