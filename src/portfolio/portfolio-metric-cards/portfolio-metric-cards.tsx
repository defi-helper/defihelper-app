import clsx from 'clsx'
import { useGate, useStore } from 'effector-react'

import { PortfolioMetricCard } from '~/portfolio/common'
import { bignumberUtils } from '~/common/bignumber-utils'
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
        title="Total Net Worth"
        value={
          loading ? (
            'loading...'
          ) : (
            <>${bignumberUtils.format(metric?.totalNetWorth?.[0].sum)}</>
          )
        }
        growthValue={loading ? 'loading...' : <>-</>}
      />
      <PortfolioMetricCard
        title="Avg. APY total"
        value={loading ? 'loading...' : <>-</>}
        growthValue={loading ? 'loading...' : <>-</>}
      />
      <PortfolioMetricCard
        title="Unclaimed reward"
        value={
          loading ? (
            'loading...'
          ) : (
            <>${bignumberUtils.format(metric?.unclaimedReward?.[0]?.sum)}</>
          )
        }
        growthValue={loading ? 'loading...' : <>-</>}
      />
    </div>
  )
}
