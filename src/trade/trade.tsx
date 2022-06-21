import { Head } from '~/common/head'
import { AppLayout } from '~/layouts'
import { Typography } from '~/common/typography'
import { Select, SelectOption } from '~/common/select'
import { Paper } from '~/common/paper'
import { TradeOrders } from './trade-orders'
import * as styles from './trade.css'

export type TradeProps = unknown

export const Trade: React.VFC<TradeProps> = () => {
  return (
    <AppLayout title="Trade">
      <Head title="Trade" />
      <Typography variant="h3" className={styles.title}>
        Trade
      </Typography>
      <div className={styles.content}>
        <Select label="Wallet">
          <SelectOption value="SelectOption">test</SelectOption>
        </Select>
        <Select label="Exchange">
          <SelectOption value="SelectOption">test</SelectOption>
        </Select>
        <Select label="Trading Pair">
          <SelectOption value="SelectOption">test</SelectOption>
        </Select>
        <Paper radius={8} className={styles.chart}>
          <div className={styles.chartHeader}>
            <div>
              <Typography>BTC/USDT</Typography>
            </div>
            <div>
              <Typography
                variant="body3"
                className={styles.chartTitle}
                as="span"
              >
                24h change
              </Typography>
              <Typography variant="body3">+ 13% | +4 085$</Typography>
            </div>
            <div>
              <Typography
                variant="body3"
                className={styles.chartTitle}
                as="span"
              >
                24h volume (USD)
              </Typography>
              <Typography variant="body3">5 259 687 158.42$</Typography>
            </div>
          </div>
          <img src="" alt="" className={styles.chartInner} />
        </Paper>
        <Paper radius={8}>test</Paper>
      </div>
      <TradeOrders />
    </AppLayout>
  )
}
