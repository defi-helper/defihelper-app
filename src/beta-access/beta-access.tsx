import clsx from 'clsx'
import React from 'react'

import { Button } from '~/common/button'
import { Grid } from '~/common/grid'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { AppLayout } from '~/layouts'
import * as styles from './beta-access.css'

export type BetaAccessProps = unknown

export const BetaAccess: React.VFC<BetaAccessProps> = () => {
  return (
    <AppLayout>
      <Grid.Container variant="md" className={styles.root}>
        <Typography
          variant="h2"
          family="mono"
          transform="uppercase"
          className={styles.title}
        >
          Get Beta Access
        </Typography>
        <Typography className={clsx(styles.subtitle, styles.grey)}>
          DeFiHelper is in the final phase of development. Be the first one to
          skyrocket your DeFi porfolio with early access.
        </Typography>
        <Grid.Row>
          <div className={styles.col}>
            <Paper className={styles.card}>
              <Typography
                variant="h4"
                family="mono"
                transform="uppercase"
                className={styles.cardTitle}
              >
                1. CONNECT WALLET
              </Typography>
              <Typography
                className={clsx(styles.grey, styles.cardSubtitle)}
                variant="body2"
              >
                Connect your wallet to start using your portfolio instantly
                after launch
              </Typography>
              <Button variant="outlined">Connect wallet</Button>
            </Paper>
          </div>
          <div className={styles.col}>
            <Paper className={styles.card}>
              <Typography
                variant="h4"
                family="mono"
                transform="uppercase"
                className={styles.cardTitle}
              >
                2. GET NOTIFIED
              </Typography>
              <Typography
                className={clsx(styles.grey, styles.cardSubtitle)}
                variant="body2"
              >
                Subscribe for telegram bot to be notified when your portfolio
                ready to use
              </Typography>
              <Button variant="outlined">Open Telegram</Button>
            </Paper>
          </div>
        </Grid.Row>
      </Grid.Container>
    </AppLayout>
  )
}
