/* eslint-disable jsx-a11y/control-has-associated-label */
import clsx from 'clsx'
import { useGate, useStore } from 'effector-react'
import { Link as ReactRouterLink } from 'react-router-dom'
import useCopyToClipboard from 'react-use/lib/useCopyToClipboard'

import { Button } from '~/common/button'
import { Icon } from '~/common/icon'
import { Loader } from '~/common/loader/loader'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { AppLayout } from '~/layouts'
import { paths } from '~/paths'
import { ReferralCarousel } from './common/referral-carousel'
import * as styles from './referral.css'
import * as model from './referral.model'

export type ReferralProps = unknown

export const Referral: React.VFC<ReferralProps> = () => {
  const referralCode = useStore(model.$referrerCode)
  const loading = useStore(model.fetchMyReferralCodeFx.pending)

  const [, copyToClipboard] = useCopyToClipboard()
  useGate(model.ReferralGate)

  return (
    <AppLayout title="Referral Program">
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
      <Typography className={styles.subtitle}>
        Spread the word and get rewarded
      </Typography>
      <section className={styles.section}>
        <Paper radius={8} className={styles.card}>
          <div className={styles.cardRow}>
            <div>
              <Typography variant="body2" className={styles.cardTitle}>
                Affiliate Link
              </Typography>
              <Typography
                variant="h4"
                family="mono"
                className={styles.cardSubtitle}
              >
                {loading ? (
                  <Loader height="16" />
                ) : (
                  `defihelper.io/p/${referralCode?.code}`
                )}
              </Typography>
            </div>
            <Button
              color="secondary"
              variant="contained"
              className={styles.copyButton}
              onClick={() =>
                copyToClipboard(`https://defihelper.io/p/${referralCode?.code}`)
              }
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
                family="mono"
                className={styles.cardSubtitle}
              >
                {loading ? <Loader height="16" /> : referralCode?.code}
              </Typography>
            </div>
            <Button
              color="secondary"
              variant="contained"
              className={styles.copyButton}
              onClick={() => copyToClipboard(referralCode?.code ?? '')}
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
        <ReferralCarousel referralCode={referralCode?.code} />
      </section>
      <section className={styles.section}>
        {false && (
          <div className={styles.income}>
            <Typography variant="h3" className={styles.sectionTitle}>
              Income
            </Typography>
            <Paper radius={8}>
              <div className={styles.incomeInner}>
                <div>
                  <Typography variant="body2" className={styles.incomeTitle}>
                    Tokens Available For Claim, DFH
                  </Typography>
                  <Typography
                    variant="h3"
                    as="div"
                    className={styles.incomeValue}
                  >
                    100.25
                  </Typography>
                  <Typography variant="body2">$862.25</Typography>
                </div>
                <div>
                  <Typography variant="body2" className={styles.incomeTitle}>
                    Available in 30 Days, DFH
                  </Typography>
                  <Typography
                    variant="h3"
                    as="div"
                    className={styles.incomeValue}
                  >
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
                <div className={clsx(styles.table, styles.border)}>
                  <Typography
                    variant="h3"
                    className={styles.incomeForecastTitle}
                  >
                    Income Forecast
                  </Typography>
                  <div className={styles.incomeTableHeader}>
                    <Typography variant="body2">Month</Typography>
                    <Typography variant="body2" align="right">
                      Amount, DFH
                    </Typography>
                    <Typography variant="body2" align="right">
                      Income
                    </Typography>
                  </div>
                  <div className={clsx(styles.incomeTableRow, styles.border)}>
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
                  <div className={clsx(styles.incomeTableRow, styles.border)}>
                    <Typography variant="body2" family="mono">
                      January
                    </Typography>
                    <Typography variant="body2" align="right" family="mono">
                      1,000
                    </Typography>
                    <Typography variant="body2" align="right" family="mono">
                      $500,000.5
                    </Typography>
                  </div>
                </div>
              </div>
            </Paper>
          </div>
        )}
        <div className={styles.results}>
          <Typography variant="h3" className={styles.sectionTitle}>
            Results
          </Typography>
          <Paper radius={8} className={styles.resultsPaper}>
            <div className={styles.incomeInner}>
              <div>
                <Typography variant="body2" className={styles.incomeTitle}>
                  Total referrers
                </Typography>
                <Typography
                  variant="h3"
                  as="div"
                  className={styles.incomeValue}
                >
                  {loading ? <Loader height="16" /> : referralCode?.usedTimes}
                </Typography>
              </div>
              {false && (
                <div className={styles.resultsActiveReferrals}>
                  <Typography variant="body2" className={styles.incomeTitle}>
                    Total referrals
                  </Typography>
                  <Typography
                    variant="h3"
                    as="div"
                    className={styles.incomeValue}
                  >
                    {referralCode?.usedTimes}
                  </Typography>
                </div>
              )}
              {false && (
                <div className={styles.resultsAllTransactions}>
                  <Button
                    variant="outlined"
                    as={ReactRouterLink}
                    to={paths.referral.transactions}
                  >
                    all transactions
                  </Button>
                </div>
              )}
              {false && (
                <div>
                  <Typography variant="body2" className={styles.incomeTitle}>
                    Link clicks
                  </Typography>
                  <Typography
                    variant="h3"
                    as="div"
                    className={styles.incomeValue}
                  >
                    70,862
                  </Typography>
                </div>
              )}
            </div>
          </Paper>
        </div>

        {false && (
          <div className={styles.levels}>
            <Typography variant="h3" className={styles.sectionTitle}>
              Levels
            </Typography>
            <Paper radius={8}>
              <div>
                <Typography variant="h4" className={styles.incomeForecastTitle}>
                  The more you earn,
                  <br /> the higher your share
                </Typography>
                <div>
                  <table className={styles.table}>
                    <thead>
                      <tr className={styles.levelsTableHeader}>
                        <th />
                        <Typography
                          as="th"
                          variant="body2"
                          align="right"
                          className={styles.levelsTableHeaderCell}
                        >
                          Income Per Month
                        </Typography>
                        <Typography
                          as="th"
                          variant="body2"
                          align="right"
                          className={styles.levelsTableHeaderCell}
                        >
                          Step 1
                        </Typography>
                        <Typography
                          as="th"
                          variant="body2"
                          align="right"
                          className={styles.levelsTableHeaderCell}
                        >
                          Step 2
                        </Typography>
                        <Typography
                          as="th"
                          variant="body2"
                          align="right"
                          className={styles.levelsTableHeaderCell}
                        >
                          Step 3
                        </Typography>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        className={clsx(
                          styles.levelsTableRow,
                          styles.border,
                          styles.levelsYellow
                        )}
                      >
                        <Typography
                          as="td"
                          variant="body2"
                          className={styles.levelsTableRowCell}
                        >
                          Your Level
                        </Typography>
                        <Typography
                          as="td"
                          variant="body2"
                          align="right"
                          family="mono"
                          className={styles.levelsTableRowCell}
                        >
                          Up to $100
                        </Typography>
                        <Typography
                          as="td"
                          variant="body2"
                          align="right"
                          family="mono"
                          className={styles.levelsTableRowCell}
                        >
                          20%
                        </Typography>
                        <Typography
                          as="td"
                          variant="body2"
                          align="right"
                          family="mono"
                          className={styles.levelsTableRowCell}
                        >
                          7%
                        </Typography>
                        <Typography
                          as="td"
                          variant="body2"
                          align="right"
                          family="mono"
                          className={styles.levelsTableRowCell}
                        >
                          3%
                        </Typography>
                      </tr>
                      <tr
                        className={clsx(styles.levelsTableRow, styles.border)}
                      >
                        <td />
                        <Typography
                          as="td"
                          variant="body2"
                          align="right"
                          family="mono"
                          className={styles.levelsTableRowCell}
                        >
                          Up to $100
                        </Typography>
                        <Typography
                          as="td"
                          variant="body2"
                          align="right"
                          family="mono"
                          className={styles.levelsTableRowCell}
                        >
                          20%
                        </Typography>
                        <Typography
                          as="td"
                          variant="body2"
                          align="right"
                          family="mono"
                          className={styles.levelsTableRowCell}
                        >
                          7%
                        </Typography>
                        <Typography
                          as="td"
                          variant="body2"
                          align="right"
                          family="mono"
                          className={styles.levelsTableRowCell}
                        >
                          3%
                        </Typography>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Paper>
          </div>
        )}
      </section>
      {false && (
        <section className={styles.section}>
          <div className={styles.competition}>
            <Typography variant="h3" className={styles.sectionTitle}>
              Competition
            </Typography>
            <Paper radius={8} className={styles.competitionPaper}>
              <div className={styles.competitionInner}>
                <Typography className={styles.competitionText}>
                  Attract the most referrals and do not pay a commission for 3
                  years, as well as get additional income
                </Typography>
                <Icon icon="cup" className={styles.cup} />
              </div>
              <Button variant="outlined" className={styles.competitionButton}>
                Learn More
              </Button>
            </Paper>
          </div>
        </section>
      )}
    </AppLayout>
  )
}
