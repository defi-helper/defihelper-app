import { Head } from '~/common/head'
import { AppLayout } from '~/layouts'
import { Typography } from '~/common/typography'
import { Select, SelectOption } from '~/common/select'
import * as styles from './trade.css'

export type TradeProps = unknown

export const Trade: React.VFC<TradeProps> = () => {
  return (
    <AppLayout title="Trade">
      <Head title="Trade" />
      <Typography variant="h3" className={styles.title}>
        Trade
      </Typography>
      <div>
        <Select label="Wallet">
          <SelectOption value="SelectOption">test</SelectOption>
        </Select>
      </div>
    </AppLayout>
  )
}
