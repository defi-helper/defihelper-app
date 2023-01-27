import clsx from 'clsx'
import isEmpty from 'lodash.isempty'
import { useMemo, useState } from 'react'
import { useMedia } from 'react-use'

import { Link } from '~/common/link'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { InvestCarousel } from '~/invest/common/invest-carousel'
import { InvestMigrateCard } from '~/invest/common/invest-migrate-card'
import { Button } from '~/common/button'
import { Loader } from '~/common/loader'
import * as styles from './invest-migrate-contracts.css'
import { AutostakingStakingContractsQuery } from '~/api'

type Contract = Exclude<
  AutostakingStakingContractsQuery['contracts']['list'],
  null | undefined
>[number] & { showing?: boolean; hidding?: boolean }

type MigrateContract = Contract & { hidding: boolean }
type MigrateHiddenContract = Contract & { showing: boolean }

export type InvestMigrateContractsProps = {
  className?: string
  search: string
  contracts: MigrateContract[]
  hiddenContracts: MigrateHiddenContract[]
  loading: boolean
  onShow: (contract: MigrateHiddenContract) => void
  onHide: (contract: MigrateContract) => void
}

export const InvestMigrateContracts: React.VFC<InvestMigrateContractsProps> = (
  props
) => {
  const [hidden, setHidden] = useState(true)

  const isEmptyContracts = isEmpty(props.contracts)

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

  const handleToggleHidden = () => {
    setHidden(!hidden)
  }

  return (
    <div className={clsx(styles.root, props.className)}>
      <Component
        className={clsx({
          [styles.empty]: isEmptyContracts,
        })}
        radius={isEmptyContracts ? 8 : undefined}
      >
        {isEmptyContracts && !props.loading && (
          <Typography variant="h4">
            You don&apos;t have any contracts to migrate to our service right
            now. We will notify you as soon as we will find the suitable one.
          </Typography>
        )}
        {props.loading && isEmptyContracts && (
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
              count={props.contracts.length}
              slidesToShow={slidesToShow}
            >
              {props.contracts.map((contract) => {
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
                    contractId={contract.id}
                    onHide={() => props.onHide(contract)}
                    hidding={contract.hidding}
                  />
                )
              })}
            </InvestCarousel>
          </>
        )}
      </Component>
      {!isEmpty(props.hiddenContracts) && (
        <>
          <Paper radius={8} className={styles.hiddenPaper}>
            <Typography variant="body2">
              You have {props.hiddenContracts.length} more hidden contracts
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
                count={props.hiddenContracts.length}
                slidesToShow={slidesToShow}
              >
                {props.hiddenContracts.map((contract) => {
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
                      contractId={contract.id}
                      icon="eye"
                      onShow={() => props.onShow(contract)}
                      showing={contract.showing}
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
