import { useEffect, useState, useMemo } from 'react'
import { useStore } from 'effector-react'
import isEmpty from 'lodash.isempty'

import { Chart, CHART_GROUP_VALUES, ChartGroups } from '~/common/chart'
import { Typography } from '~/common/typography'
import { ProtocolChartWrap } from '../common'
import { authModel } from '~/auth'
import * as model from './protocol-coin-balance.model'
import {
  useOnTokenMetricUpdatedSubscription,
  useOnWalletMetricUpdatedSubscription,
} from '~/portfolio/common'

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
    name: 'Stablecoins',
    dateX: 'date',
    color: '#4463EE',
  },
]

export type ProtocolCoinBalanceChartProps = {
  className?: string
  contracts: string[]
}

export const ProtocolCoinBalanceChart: React.VFC<ProtocolCoinBalanceChartProps> =
  (props) => {
    const [currentStakedGroup, setCurrentStakedGroup] = useState<string>(
      CHART_GROUP_VALUES.month
    )

    const stakedMetric = useStore(model.$stakedMetric)

    const user = useStore(authModel.$user)
    const loading = useStore(model.fetchStakedMetricFx.pending)

    const variables = useMemo(() => {
      if (!user) return undefined

      return {
        user: [user.id],
      }
    }, [user])

    useOnWalletMetricUpdatedSubscription(({ data }) => {
      if (!props.contracts.length || !data?.onWalletMetricUpdated.id) return

      model.fetchStakedMetricFx({
        group: currentStakedGroup,
        contracts: props.contracts,
      })
    }, variables)
    useOnTokenMetricUpdatedSubscription(({ data }) => {
      if (!props.contracts.length || !data?.onTokenMetricUpdated.id) return

      model.fetchStakedMetricFx({
        group: currentStakedGroup,
        contracts: props.contracts,
      })
    }, variables)

    useEffect(() => {
      if (!props.contracts.length) return

      model.fetchStakedMetricFx({
        group: currentStakedGroup,
        contracts: props.contracts,
      })
    }, [currentStakedGroup, props.contracts])

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
          loading={loading && isEmpty(stakedMetric[currentStakedGroup]?.data)}
        />
      </ProtocolChartWrap>
    )
  }
