import { AppLayout } from '~/layouts'
import { Typography } from '~/common/typography'
import { Paper } from '~/common/paper'
import { Button } from '~/common/button'
import { ReferralCarousel } from '~/referral/common/referral-carousel'
import refSchemaDesktop from '~/assets/images/ref-schema-desktop.png'
import refSchemaMobile from '~/assets/images/ref-schema-mobile.png'
import { ReferralInputSlider } from '~/referral/common/referral-input-slider'
import * as styles from './referral-calculator.css'

export type ReferralCalculatorProps = unknown

export const ReferralCalculator: React.VFC<ReferralCalculatorProps> = () => {
  return (
    <AppLayout title="Share and EARN">
      <Typography variant="h3" className={styles.title}>
        Share and EARN
      </Typography>
      <Typography
        variant="h3"
        family="mono"
        transform="uppercase"
        className={styles.share}
      >
        Calculator
      </Typography>
      <Typography className={styles.subtitle}>
        Tell your friends about the platform and get additional income
      </Typography>
      <div className={styles.section}>
        <Paper radius={8} className={styles.card}>
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
          <Button
            color="green"
            variant="contained"
            className={styles.cardButton}
          >
            Copy
          </Button>
        </Paper>
        <ReferralCarousel />
      </div>
      <div>
        <Typography variant="h3" className={styles.partnersTitle}>
          The More Partners You Drive, The Higher Your Income
        </Typography>
        <Typography variant="body2" className={styles.partersSubtitle}>
          Что пользватели должны делать чтобы ты получал деньги
        </Typography>
        <Paper radius={8} className={styles.calculator}>
          <div className={styles.schema}>
            <div>
              <Typography variant="body2" as="div" className={styles.grey}>
                Level
              </Typography>
              <Typography
                variant="body2"
                as="div"
                className={styles.schemaValue}
              >
                1
              </Typography>
              <Typography
                variant="body2"
                as="div"
                className={styles.schemaValue}
              >
                2
              </Typography>
              <Typography
                variant="body2"
                as="div"
                className={styles.schemaValue}
              >
                3
              </Typography>
            </div>
            <div>
              <div className={styles.inputWrap}>
                <Typography variant="body2" className={styles.grey}>
                  Your
                </Typography>
                <ReferralInputSlider max={1000} className={styles.input} />
                <Typography variant="body2" className={styles.grey}>
                  partners
                </Typography>
              </div>
              <picture className={styles.schemaImg}>
                <source media="(max-width: 959px)" srcSet={refSchemaMobile} />
                <source media="(min-width: 960px)" srcSet={refSchemaDesktop} />
                <img src={refSchemaDesktop} alt="" />
              </picture>
            </div>
            <div>
              <Typography variant="body2" as="div" className={styles.grey}>
                Income*
              </Typography>
              <Typography
                variant="body2"
                as="div"
                className={styles.schemaValue}
              >
                30%
              </Typography>
              <Typography
                variant="body2"
                as="div"
                className={styles.schemaValue}
              >
                13%
              </Typography>
              <Typography
                variant="body2"
                as="div"
                className={styles.schemaValue}
              >
                7%
              </Typography>
            </div>
            <div className={styles.schemaText}>
              <Typography variant="body2" className={styles.schemaTextCol1}>
                You can receive up to 30% from your referrals&apos; payments
              </Typography>
              <Typography variant="body2" className={styles.schemaTextCol2}>
                * If you referral rewardsare above $10,000
              </Typography>
            </div>
          </div>
          <div className={styles.separator} />
          <div className={styles.estimatedIncome}>
            <div className={styles.estimatedIncomeCol}>
              <Typography variant="body2" className={styles.grey}>
                Estimated Income
              </Typography>
              <Typography variant="h3" className={styles.estimatedValue}>
                $20,862
              </Typography>
              <Typography variant="body2" className={styles.grey}>
                Estimated Average
              </Typography>
            </div>
            <div className={styles.estimatedIncomeCol}>
              <Typography variant="body2" className={styles.grey}>
                With
              </Typography>
              <Typography variant="h3" className={styles.value}>
                13,000
              </Typography>
              <Typography variant="body2" className={styles.grey}>
                partners
              </Typography>
            </div>
            <div className={styles.estimatedButton}>
              <Button color="green">about Referral program</Button>
            </div>
          </div>
        </Paper>
      </div>
    </AppLayout>
  )
}
