import { useEffect, useState, useMemo } from 'react'
import { useStore } from 'effector-react'
import { useThrottle } from 'react-use'

import { Chart, CHART_GROUP_VALUES, ChartGroups } from '~/common/chart'
import {
  useOnTokenMetricUpdatedSubscription,
  useOnWalletMetricUpdatedSubscription,
} from '~/graphql/_generated-types'
import { Typography } from '~/common/typography'
import { ProtocolChartWrap } from '../common'
import * as stakingListModel from '~/staking/staking-list/staking-list.model'
import { authModel } from '~/auth'
import * as model from './protocol-coin-balance.model'

const STAKED_FIELDS = [
  {
    valueY: 'altCoin',
    format: 'altCoinFormat',
    name: 'Volatile coins',
    dateX: 'date',
    color: '#E9CC67',
  },
  {
    valueY: 'stableCoin',
    format: 'stableCoinFormat',
    name: 'Stable coins',
    dateX: 'date',
    color: '#4463EE',
  },
]

export type ProtocolCoinBalanceChartProps = {
  className?: string
}

export const ProtocolCoinBalanceChart: React.VFC<ProtocolCoinBalanceChartProps> =
  () => {
    const [currentStakedGroup, setCurrentStakedGroup] = useState<string>(
      CHART_GROUP_VALUES.month
    )

    const contracts = useStore(stakingListModel.$contractList)
    const stakedMetric = useStore(model.$stakedMetric)

    const user = useStore(authModel.$user)

    const subscriptionOptions = useMemo(() => {
      if (!user) return undefined

      return {
        variables: {
          user: [user.id],
        },
      }
    }, [user])

    const [walletUpdated] =
      useOnWalletMetricUpdatedSubscription(subscriptionOptions)
    const [tokenMetricUpdated] =
      useOnTokenMetricUpdatedSubscription(subscriptionOptions)

    const metricUpdated = useThrottle(
      walletUpdated.data?.onWalletMetricUpdated.id ||
        tokenMetricUpdated.data?.onTokenMetricUpdated.id ||
        '',
      15000
    )

    useEffect(() => {
      if (!contracts.length) return

      model.fetchStakedMetricFx({
        group: currentStakedGroup,
        contracts: contracts.map(({ id }) => id),
      })
    }, [currentStakedGroup, contracts, metricUpdated])

    useEffect(() => {
      return () => model.reset()
    }, [])

    const handleChangeStakedMetric = (group: string) => {
      setCurrentStakedGroup(group)
    }

    return (
      <ProtocolChartWrap
        header={
          <>
            <Typography>Coin Balance</Typography>
            <ChartGroups
              value={currentStakedGroup}
              onChange={handleChangeStakedMetric}
            >
              {Object.values(stakedMetric)}
            </ChartGroups>
          </>
        }
      >
        <Chart
          dataFields={STAKED_FIELDS}
          data={stakedMetric[currentStakedGroup]?.data}
          // eslint-disable-next-line no-template-curly-in-string
          tooltipText="{name}: ${format}"
          id="staked"
          names={STAKED_FIELDS.map(({ name }) => name)}
        />
      </ProtocolChartWrap>
    )
  }
