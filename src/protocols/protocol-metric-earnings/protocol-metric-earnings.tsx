import { useEffect, useState, useMemo } from 'react'
import { useStore } from 'effector-react'
import clsx from 'clsx'
import { useMedia, useThrottle } from 'react-use'

import { Chart, CHART_GROUP_VALUES, ChartGroups } from '~/common/chart'
import {
  ProtocolQuery,
  useOnTokenMetricUpdatedSubscription,
  useOnWalletMetricUpdatedSubscription,
} from '~/graphql/_generated-types'
import { Typography } from '~/common/typography'
import { ProtocolChartWrap } from '../common'
import * as stakingListModel from '~/staking/staking-list/staking-list.model'
import { bignumberUtils } from '~/common/bignumber-utils'
import { dateUtils } from '~/common/date-utils'
import { Link } from '~/common/link'
import { config } from '~/config'
import { useTheme } from '~/common/theme'
import { authModel } from '~/auth'
import * as model from './protocol-metric-earnings.model'
import * as styles from './protocol-metric-earnings.css'

const STAKED_FIELDS = [
  {
    valueY: 'altCoin',
    format: 'altCoinFormat',
    name: 'Low volume coins',
    dateX: 'date',
    color: '#E9CC67',
  },
  {
    valueY: 'stableCoin',
    format: 'stableCoinFormat',
    name: 'Liquid coins',
    dateX: 'date',
    color: '#4463EE',
  },
]

const ESTIMATED_FIELDS = [
  {
    valueY: 'hold',
    format: 'holdFormat',
    name: 'Just holding',
    dateX: 'date',
    color: '#F08BA9',
  },
]

export type ProtocolMetricEarningsProps = {
  className?: string
  metric: Exclude<ProtocolQuery['protocol'], null | undefined>['metric']
  myMinUpdatedAt?: string | null
}

export const ProtocolMetricEarnings: React.FC<ProtocolMetricEarningsProps> = (
  props
) => {
  const [currentStakedGroup, setCurrentStakedGroup] = useState<string>(
    CHART_GROUP_VALUES.month
  )

  const isDesktop = useMedia('(min-width: 960px)')

  const earningsMetric = useStore(model.$earningsMetric)
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
    model.fetchEarningMetricFx({
      balance: Number(
        bignumberUtils.plus(props.metric.myEarned, props.metric.myStaked)
      ),
      apy: Number(props.metric.myAPY ?? 0),
    })
  }, [
    props.metric.myStaked,
    props.metric.myEarned,
    props.metric.myAPY,
    metricUpdated,
  ])

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

  const [themeMode] = useTheme()

  const estimatedFields = useMemo(() => {
    return [
      ...ESTIMATED_FIELDS,
      {
        valueY: 'autostaking',
        format: 'autostakingFormat',
        name: 'Autostaking',
        dateX: 'date',
        color: themeMode === 'dark' ? '#CCFF3C' : '#39C077',
      },
    ]
  }, [themeMode])

  const format = isDesktop ? 'DD MMMM YYYY HH:mm' : 'DD MMM YY'

  return (
    <div className={clsx(styles.root, props.className)}>
      <div className={styles.header}>
        <Typography variant="h3" className={styles.title}>
          Statistics
        </Typography>
        {props.myMinUpdatedAt && (
          <Typography className={styles.label} variant="body2">
            Last updated at: {dateUtils.format(props.myMinUpdatedAt, format)}
          </Typography>
        )}
      </div>
      <div className={styles.charts}>
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
        <ProtocolChartWrap
          header={
            <div>
              <Typography>Estimated Earnings in 3 months</Typography>
              <Link
                href={config.MEDIUM_LINK}
                target="_blank"
                className={styles.link}
              >
                How auto-staking works
              </Link>
            </div>
          }
        >
          <Chart
            dataFields={estimatedFields}
            data={earningsMetric}
            // eslint-disable-next-line no-template-curly-in-string
            tooltipText="{name}: ${format}"
            id="estimated"
            names={estimatedFields.map(({ name }) => name)}
          />
        </ProtocolChartWrap>
      </div>
      {props.children}
    </div>
  )
}
