import clsx from 'clsx'
import isEmpty from 'lodash.isempty'
import { useMemo } from 'react'
import { useMedia } from 'react-use'

import { Link } from '~/common/link'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { AutostakingCarousel } from '../common/autostaking-carousel'
import { AutostakingMigrateCard } from '../common/autostaking-migrate-card'
import * as styles from './autostaking-migrate-contracts.css'

export type AutostakingMigrateContractsProps = {
  className?: string
  search: string
}

export const AutostakingMigrateContracts: React.VFC<AutostakingMigrateContractsProps> =
  (props) => {
    const contracts = Array.from({ length: 4 }, (_, i) => i)

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
              {contracts.map((i) => (
                <AutostakingMigrateCard
                  key={i}
                  title="title"
                  balance="100"
                  protocol="protocol"
                  apy="100"
                  apyBoost="100"
                />
              ))}
            </AutostakingCarousel>
          </>
        )}
      </Component>
    )
  }
