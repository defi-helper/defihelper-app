import clsx from 'clsx'
import isEmpty from 'lodash.isempty'
import { useEffect, useMemo, useState } from 'react'
import { useMedia } from 'react-use'
import { useStore } from 'effector-react'

import { Link } from '~/common/link'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { InvestCarousel } from '~/invest/common/invest-carousel'
import { InvestMigrateCard } from '~/invest/common/invest-migrate-card'
import { Button } from '~/common/button'
import * as model from './invest-migrate-contracts.model'
import { authModel } from '~/auth'
import { Loader } from '~/common/loader'
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

  const user = useStore(authModel.$user)

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
                    onHide={handleHide(contract)}
                    hidding={contract.hidding}
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
                      onShow={handleShow(contract)}
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
