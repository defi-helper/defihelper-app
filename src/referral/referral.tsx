import { Button } from '~/common/button'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { AppLayout } from '~/layouts'
import * as styles from './referral.css'

export type ReferralProps = unknown

export const Referral: React.VFC<ReferralProps> = () => {
  return (
    <AppLayout>
      <Typography variant="h3" className={styles.title}>
        Referral Program
      </Typography>
      <Typography
        variant="h3"
        family="mono"
        transform="uppercase"
        className={styles.share}
      >
        Share and EARN
      </Typography>
      <div className={styles.section}>
        <Typography className={styles.subtitle}>
          Spread the word and get rewarded
        </Typography>
        <Paper radius={8} className={styles.card}>
          <div className={styles.cardRow}>
            <div>
              <Typography variant="body2" className={styles.cardTitle}>
                Affiliate Link
              </Typography>
              <Typography
                variant="h4"
                transform="uppercase"
                family="mono"
                className={styles.cardSubtitle}
              >
                defihelper.io/5ecf40b805b5
              </Typography>
            </div>
            <Button
              color="secondary"
              variant="contained"
              className={styles.copyButton}
            >
              Copy
            </Button>
          </div>
          <div className={styles.cardRow}>
            <div>
              <Typography variant="body2" className={styles.cardTitle}>
                Promo Code
              </Typography>
              <Typography
                variant="h4"
                transform="uppercase"
                family="mono"
                className={styles.cardSubtitle}
              >
                5ecf40b805b5
              </Typography>
            </div>
            <Button
              color="secondary"
              variant="contained"
              className={styles.copyButton}
            >
              Copy
            </Button>
          </div>
          <div className={styles.cardFooter}>
            <Typography variant="h3" as="div" className={styles.price}>
              $30
            </Typography>
            <Typography variant="body2" className={styles.cardFooterText}>
              will be received each user after registration
            </Typography>
          </div>
        </Paper>
      </div>
      <div>
        <Typography variant="h3" className={styles.sectionTitle}>
          Income
        </Typography>
        <Paper radius={8}>
          <div className={styles.incomeInner}>
            <div>
              <Typography variant="body2" className={styles.incomeTitle}>
                Tokens Available For Claim, DFH
              </Typography>
              <Typography variant="h3" as="div">
                100.25
              </Typography>
              <Typography variant="body2">$862.25</Typography>
            </div>
            <div>
              <Typography variant="body2" className={styles.incomeTitle}>
                Available in 30 Days, DFH
              </Typography>
              <Typography variant="h3" as="div">
                300.25
              </Typography>
              <Typography variant="body2">$1,862.25</Typography>
            </div>
            <div>
              <Button color="secondary" variant="contained">
                Claim tokens
              </Button>
            </div>
            <div>
              <Typography variant="body2" className={styles.incomeTitle}>
                In 7 Days, DFH
              </Typography>
              <Typography variant="h3" as="div">
                100.25
              </Typography>
              <Typography variant="body2">$862.25</Typography>
            </div>
          </div>
          <div>
            <div className={styles.table}>
              <Typography variant="h3" className={styles.sectionTitle}>
                Income Forecast
              </Typography>
              <div className={styles.tableRow}>
                <Typography variant="body2">Month</Typography>
                <Typography variant="body2" align="right">
                  Amount, DFH
                </Typography>
                <Typography variant="body2" align="right">
                  Income
                </Typography>
              </div>
              <div className={styles.tableRow}>
                <Typography variant="body2" family="mono">
                  February
                </Typography>
                <Typography variant="body2" align="right" family="mono">
                  100
                </Typography>
                <Typography variant="body2" align="right" family="mono">
                  $5,000.25
                </Typography>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </AppLayout>
  )
}
