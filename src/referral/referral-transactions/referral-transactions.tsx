import { useMedia } from 'react-use'

import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { AppLayout } from '~/layouts'
import * as styles from './referral-transactions.css'

export type ReferralTransactionsProps = unknown

const DATA = {
  wallet: 'K3YCff5B...D8d6EB02',
  transaction: 'K3YCff5BD8d6EB',
  level: '1',
  clientPaid: '$93.25',
  income: '$0.25',
  added: '25.09.2020 12:11',
}

export const ReferralTransactions: React.VFC<ReferralTransactionsProps> =
  () => {
    const isDesktop = useMedia('(min-width: 1440px)')

    return (
      <AppLayout title="Share and EARN">
        <Typography variant="h3" className={styles.title}>
          Share and EARN
        </Typography>
        <Typography
          variant="h3"
          family="mono"
          transform="uppercase"
          className={styles.subtitle}
        >
          transactions
        </Typography>
        <Paper radius={8}>
          <div className={styles.header}>
            {!isDesktop && (
              <Typography
                variant="body2"
                as="div"
                className={styles.informationColumn}
              >
                Information
              </Typography>
            )}
            {isDesktop && (
              <>
                <Typography variant="body2" as="div">
                  Wallet
                </Typography>
                <Typography variant="body2" as="div">
                  Transaction
                </Typography>
                <Typography variant="body2" as="div" align="right">
                  Level
                </Typography>
                <Typography variant="body2" as="div" align="right">
                  Client paid
                </Typography>
                <Typography variant="body2" as="div" align="right">
                  Income
                </Typography>
              </>
            )}
            <Typography
              variant="body2"
              as="div"
              align={isDesktop ? undefined : 'right'}
              className={isDesktop ? undefined : styles.addedColumn}
            >
              Added
            </Typography>
          </div>
          {Array.from(Array(10), (_, i) => ({ ...DATA, id: i })).map((item) => (
            <div className={styles.row} key={item.id}>
              <Typography variant="body2" as="div" className={styles.wallet}>
                <Typography
                  variant="body3"
                  as="div"
                  className={styles.labelMobile}
                >
                  Wallet
                </Typography>
                {item.wallet}
              </Typography>
              <Typography
                variant="body2"
                as="div"
                className={styles.transaction}
              >
                <Typography
                  variant="body3"
                  as="div"
                  className={styles.labelMobile}
                >
                  Transaction
                </Typography>
                {item.transaction}
              </Typography>
              <Typography
                variant="body2"
                as="div"
                align={isDesktop ? 'right' : undefined}
                className={styles.level}
              >
                <Typography
                  variant="body3"
                  as="div"
                  className={styles.labelMobile}
                >
                  Level
                </Typography>
                {item.level}
              </Typography>
              <Typography
                variant="body2"
                as="div"
                align={isDesktop ? 'right' : undefined}
                className={styles.clientPaid}
              >
                <Typography
                  variant="body3"
                  as="div"
                  className={styles.labelMobile}
                >
                  Client paid
                </Typography>
                {item.clientPaid}
              </Typography>
              <Typography
                variant="body2"
                as="div"
                align={isDesktop ? 'right' : undefined}
                className={styles.income}
              >
                <Typography
                  variant="body3"
                  as="div"
                  className={styles.labelMobile}
                >
                  Income
                </Typography>
                {item.income}
              </Typography>
              <Typography variant="body2" as="div" className={styles.added}>
                {item.added}
              </Typography>
            </div>
          ))}
        </Paper>
      </AppLayout>
    )
  }
