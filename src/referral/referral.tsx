/* eslint-disable jsx-a11y/control-has-associated-label */
import 'slick-carousel/slick/slick.css'
import Slider from 'react-slick'
import clsx from 'clsx'
import { cloneElement } from 'react'

import { Button } from '~/common/button'
import { Icon } from '~/common/icon'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { AppLayout } from '~/layouts'
import * as styles from './referral.css'
import { ButtonBase } from '~/common/button-base'

export type ReferralProps = unknown

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: '15px',
    arrows: false,
    centerMode: true,
    outerEdgeLimit: true,
    appendDots: (dots: React.ReactNode) => (
      <div>
        <ul className={styles.dots}>{dots}</ul>
      </div>
    ),
    customPaging: () => <ButtonBase className={styles.dot} />,
  }

  const slide = (
    <div>
      <Typography className={styles.socialText}>
        With manual restaking, you may lose more than you could have earned due
        to high transaction. defihelper.io/5ecf40b805b5
      </Typography>
      <div className={styles.socialActions}>
        <div>
          <Button variant="outlined" className={styles.socialButton}>
            <Icon width={16} height={16} icon="arrowLeft" />
          </Button>
          <Button variant="outlined" className={styles.socialButton}>
            <Icon width={16} height={16} icon="arrowRight" />
          </Button>
        </div>
        <div className={styles.socailLinksWrap}>
          <Typography
            variant="body2"
            as="span"
            className={clsx(styles.levelsTableHeader, styles.socialLabel)}
          >
            Share
          </Typography>
          <div className={styles.socialLinks}>
            <Button variant="outlined" className={styles.socialButton}>
              <Icon width={16} height={16} icon="facebook" />
            </Button>
            <Button variant="outlined" className={styles.socialButton}>
              <Icon width={16} height={16} icon="twitter" />
            </Button>
            <Button variant="outlined" className={styles.socialButton}>
              <Icon width={16} height={16} icon="telegram" />
            </Button>
            <Button variant="outlined" className={styles.socialButton}>
              <Icon width={16} height={16} icon="linkedin" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Slider {...settings}>
      {cloneElement(slide)}
      {cloneElement(slide)}
      {cloneElement(slide)}
    </Slider>
  )
}

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
        <Paper radius={8} className={styles.socialMedia}>
          <div className={styles.socialMediaDesktopRow}>
            <Typography variant="body2" className={styles.cardTitle}>
              Text for Social Media
            </Typography>
            <Typography variant="body2" as="div">
              <Typography variant="inherit" className={styles.cardTitle}>
                Promote
              </Typography>{' '}
              Defihelper
            </Typography>
          </div>
          <div className={styles.socialCarousel}>
            <Carousel />
          </div>
        </Paper>
      </section>
      <section className={styles.section}>
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
                <Typography variant="h3" className={styles.incomeForecastTitle}>
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
        <div className={styles.results}>
          <Typography variant="h3" className={styles.sectionTitle}>
            Results
          </Typography>
          <Paper radius={8} className={styles.resultsPaper}>
            <div className={styles.incomeInner}>
              <div>
                <Typography variant="body2" className={styles.incomeTitle}>
                  Total Income, DFH
                </Typography>
                <Typography
                  variant="h3"
                  as="div"
                  className={styles.incomeValue}
                >
                  1000.25
                </Typography>
                <Typography variant="body2">$5,862.25</Typography>
              </div>
              <div>
                <Typography variant="body2" className={styles.incomeTitle}>
                  Active Referrals
                </Typography>
                <Typography
                  variant="h3"
                  as="div"
                  className={styles.incomeValue}
                >
                  7,862
                </Typography>
              </div>
              <div>
                <Button variant="outlined">all transactions</Button>
              </div>
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
            </div>
          </Paper>
        </div>
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
                  <tr className={clsx(styles.levelsTableRow, styles.border)}>
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
                </table>
              </div>
            </div>
          </Paper>
        </div>
      </section>
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
    </AppLayout>
  )
}
