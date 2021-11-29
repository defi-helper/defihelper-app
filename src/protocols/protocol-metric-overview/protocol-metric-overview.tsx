import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useStore } from 'effector-react'
import clsx from 'clsx'

import { BigNumber } from 'bignumber.js'
import { Chart } from '~/common/chart'
import { MetricGroupEnum } from '~/graphql/_generated-types'
import { ButtonBase } from '~/common/button-base'
import { Icon } from '~/common/icon'
import { Typography } from '~/common/typography'
import { bignumberUtils } from '~/common/bignumber-utils'
import { ProtocolChartWrap } from '../common'
import { Dropdown } from '~/common/dropdown'
import { MetricGroups, isMetricGroup } from '~/protocols/common'
import * as model from './protocol-metric-overview.model'
import * as styles from './protocol-metric-overview.css'

const TVL_FIELDS = [
  {
    valueY: 'sum',
    name: 'Total value locked',
    dateX: 'date',
    color: '#E9CC67',
  },
]

const WALLET_FIELDS = [
  {
    valueY: 'avg',
    name: 'Unique Wallets',
    dateX: 'date',
    color: '#CCFF3C',
  },
]

export const ProtocolMetricOverview: React.VFC<{ className?: string }> = (
  props
) => {
  const [currentGroup, setCurrentGroup] = useState<
    Exclude<MetricGroupEnum, MetricGroupEnum.Hour>
  >(MetricGroupEnum.Day)

  const params = useParams<{ protocolId: string }>()

  const metric = useStore(model.$metric)

  useEffect(() => {
    model.fetchMetricFx({
      protocolId: params.protocolId,
      group: currentGroup,
    })
  }, [currentGroup, params.protocolId])

  const [tvlSum = undefined] = metric[currentGroup]?.data.tvl?.slice(-1)

  const tvlData = metric[currentGroup]?.data.tvl?.map((metricItem) => {
    return {
      ...metricItem,
      sum: new BigNumber(metricItem.sum).toFormat(0),
    }
  })

  const walletData = metric[currentGroup]?.data?.uniqueWalletsCount.map(
    (wallet) => ({
      ...wallet,
      sum: new BigNumber(wallet.sum).toFormat(0),
    })
  )

  const [uniqueWalletsSum = undefined] =
    metric[currentGroup]?.data.uniqueWalletsCount?.slice(-1)

  const handleChangeGroup = (group: string) => () => {
    if (!isMetricGroup(group)) return

    setCurrentGroup(group)
  }

  return (
    <div className={clsx(styles.root, props.className)}>
      <div className={styles.title}>
        <Typography variant="h3">Statistics</Typography>
        <Dropdown
          placement="bottom-end"
          offset={[0, 8]}
          sameWidth
          control={(active) => (
            <ButtonBase className={clsx(styles.select, styles.selectButton)}>
              {MetricGroups[currentGroup]}{' '}
              <Icon
                icon={active ? 'arrowTop' : 'arrowDown'}
                className={styles.selectArrow}
              />
            </ButtonBase>
          )}
        >
          {Object.values(MetricGroupEnum).map((value) => (
            <ButtonBase
              key={value}
              onClick={handleChangeGroup(value)}
              className={styles.selectButton}
            >
              {MetricGroups[value]}
            </ButtonBase>
          ))}
        </Dropdown>
      </div>
      <div className={styles.charts}>
        <ProtocolChartWrap
          header={
            <>
              <Typography>Total Value Locked</Typography>
              <Typography family="mono">
                ${bignumberUtils.format(tvlSum?.sum)}
              </Typography>
            </>
          }
        >
          <Chart
            dataFields={TVL_FIELDS}
            data={tvlData}
            tooltipText={['$', '{sum}'].join('')}
            id="tvl"
            names={TVL_FIELDS.map(({ name }) => name)}
          />
        </ProtocolChartWrap>
        <ProtocolChartWrap
          header={
            <>
              <Typography>Unique Wallets</Typography>
              <Typography family="mono">
                {bignumberUtils.format(uniqueWalletsSum?.sum, 0)}
              </Typography>
            </>
          }
        >
          <Chart
            dataFields={WALLET_FIELDS}
            data={walletData}
            tooltipText="{sum}"
            id="unique_wallets"
            names={WALLET_FIELDS.map(({ name }) => name)}
          />
        </ProtocolChartWrap>
      </div>
    </div>
  )
}
