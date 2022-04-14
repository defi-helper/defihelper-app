import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useStore } from 'effector-react'
import isEmpty from 'lodash.isempty'

import { Chart } from '~/common/chart'
import { Typography } from '~/common/typography'
import { bignumberUtils } from '~/common/bignumber-utils'
import { ProtocolChartWrap } from '../common'
import { useTheme } from '~/common/theme'
import { dateUtils } from '~/common/date-utils'
import * as model from './protocol-unique-wallets-chart.model'

export type ProtocolUniqueWalletsChartProps = unknown

export const ProtocolUniqueWalletsChart: React.FC<ProtocolUniqueWalletsChartProps> =
  () => {
    const params = useParams<{ protocolId: string }>()

    const metric = useStore(model.$metric)
    const loading = useStore(model.fetchMetricFx.pending)

    useEffect(() => {
      model.fetchMetricFx({
        protocolId: params.protocolId,
      })
    }, [params.protocolId])

    const walletData = metric.map((wallet) => ({
      ...wallet,
      date: dateUtils.toDate(wallet.date),
      sum: bignumberUtils.floor(wallet.sum),
      format: bignumberUtils.format(wallet.sum, 0),
    }))

    const [uniqueWalletsSum = undefined] = metric?.slice(-1)

    const [themeMode] = useTheme()

    const walletFields = useMemo(() => {
      return [
        {
          valueY: 'sum',
          name: 'Unique Wallets',
          dateX: 'date',
          color: themeMode === 'dark' ? '#CCFF3C' : '#39C077',
        },
      ]
    }, [themeMode])

    return (
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
          dataFields={walletFields}
          data={walletData}
          tooltipText="{format}"
          id="unique_wallets"
          names={walletFields.map(({ name }) => name)}
          loading={loading && isEmpty(walletData)}
        />
      </ProtocolChartWrap>
    )
  }
