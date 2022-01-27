import clsx from 'clsx'
import { useGate, useStore } from 'effector-react'

import { PortfolioMetricCard } from '~/portfolio/common'
import { bignumberUtils } from '~/common/bignumber-utils'
import { Dropdown } from '~/common/dropdown'
import { ButtonBase } from '~/common/button-base'
import { Icon } from '~/common/icon'
import * as model from './portfolio-metric-cards.model'
import * as styles from './portfolio-metric-cards.css'

export type PortfolioMetricCardsProps = {
  className?: string
}

export const PortfolioMetricCards: React.VFC<PortfolioMetricCardsProps> = (
  props
) => {
  const metric = useStore(model.$metric)
  const loading = useStore(model.fetchMetricCardsFx.pending)

  useGate(model.PortfolioMetricCardsGate)

  return (
    <div className={clsx(styles.root, props.className)}>
      <PortfolioMetricCard
        title={
          <>
            Tracked Balance
            <Dropdown
              control={
                <ButtonBase className={styles.question}>
                  <Icon icon="question" width="24" height="24" />
                </ButtonBase>
              }
              trigger="hover"
              offset={[0, 8]}
            >
              text
            </Dropdown>
          </>
        }
        value={
          loading && !metric ? (
            'loading...'
          ) : (
            <>${bignumberUtils.format(metric?.worth)}</>
          )
        }
      />
      <PortfolioMetricCard
        title={
          <>
            Avg. Tracked APY{' '}
            <Dropdown
              control={
                <ButtonBase className={styles.question}>
                  <Icon icon="question" width="24" height="24" />
                </ButtonBase>
              }
              trigger="hover"
              offset={[0, 8]}
            >
              text
            </Dropdown>
          </>
        }
        value={
          loading && !metric ? (
            'loading...'
          ) : (
            <>
              {bignumberUtils.formatMax(
                bignumberUtils.mul(metric?.apy, 100),
                10000
              )}
              %
            </>
          )
        }
      />
      <PortfolioMetricCard
        title="Total Unclaimed"
        value={
          loading && !metric ? (
            'loading...'
          ) : (
            <>${bignumberUtils.format(metric?.earnedUSD)}</>
          )
        }
      />
    </div>
  )
}
