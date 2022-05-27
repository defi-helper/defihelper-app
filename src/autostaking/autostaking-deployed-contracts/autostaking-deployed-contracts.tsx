import clsx from 'clsx'
import isEmpty from 'lodash.isempty'
import { useMemo } from 'react'
import { useMedia } from 'react-use'

import { BlockchainEnum } from '~/api'
import { AutostakingDeployedContractCard } from '~/autostaking/common/autostaking-deployed-contract-card'
import { Paper } from '~/common/paper'
import { AutostakingCarousel } from '~/autostaking/common/autostaking-carousel'
import { Typography } from '~/common/typography'
import * as styles from './autostaking-deployed-contracts.css'

export type AutostakingDeployedContractsProps = {
  className?: string
}

export const AutostakingDeployedContracts: React.VFC<AutostakingDeployedContractsProps> =
  (props) => {
    const contracts = Array.from({ length: 3 }, (_, i) => i)

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

    return (
      <Component
        className={clsx(props.className, {
          [styles.empty]: isEmptyContracts,
        })}
        radius={isEmptyContracts ? 8 : undefined}
      >
        {isEmptyContracts && (
          <Typography variant="h4">
            We couldn&apos;t find any of your contracts on other services. We
            regularly check for outside contracts, and as soon as we find a
            match, you will see your contracts here with the deposit option.
          </Typography>
        )}
        {!isEmptyContracts && (
          <AutostakingCarousel
            count={contracts.length}
            slidesToShow={slidesToShow}
          >
            {contracts.map((i) => (
              <AutostakingDeployedContractCard
                key={i}
                title="USDT-BUSD"
                address="0xD001e8B722ab435277087f68A8cb5f565d9085Af"
                network="1"
                blockchain={BlockchainEnum.Ethereum}
                value="1000"
                nextRestakeDate={new Date().toISOString()}
                apy="100"
                apyBoost="100"
                onDelete={() => {}}
                onUnstake={() => {}}
                onDeposit={() => {}}
                onRun={() => {}}
              />
            ))}
          </AutostakingCarousel>
        )}
      </Component>
    )
  }
