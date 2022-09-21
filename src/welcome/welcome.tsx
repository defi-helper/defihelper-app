import { useEffect } from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useStore } from 'effector-react'

import { Button } from '~/common/button'
import { Head } from '~/common/head'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { AppLayout } from '~/layouts'
import { paths } from '~/paths'
import { ReactComponent as WelcomeInvest } from '~/assets/images/welcome-invest.svg'
import { ReactComponent as WelcomeTrade } from '~/assets/images/welcome-trade.svg'
import { authModel } from '~/auth'
import { history } from '~/common/history'
import * as styles from './welcome.css'

export type WelcomeProps = unknown

const DATA = [
  {
    title: 'INVEST',
    img: WelcomeInvest,
    text: "Find a pool to invest in, use our auto-compounder to maximize your APY, protect your invest with 'Stop-Loss'",
    link: paths.invest.list,
    button: 'start investing',
  },
  {
    title: 'TRADE',
    img: WelcomeTrade,
    text: "Use our 'Trailing Buy', or 'Stop-loss/Take-profit' features to trade like a pro on DEXs",
    link: paths.trade,
    button: 'start trading',
  },
]

export const Welcome: React.VFC<WelcomeProps> = () => {
  const userReady = useStore(authModel.$userReady)
  const user = useStore(authModel.$user)

  useEffect(() => {
    if (userReady && user) {
      history.replace(paths.portfolio)
    }
  }, [user, userReady])

  if (!userReady) return <></>

  return (
    <AppLayout title="Welcome to DeFiHelper">
      <Head title="Welcome" />
      <Typography variant="h3" className={styles.title}>
        Welcome to DeFiHelper — your powerful investment tool
      </Typography>
      <div className={styles.grid}>
        {DATA.map((dataItem) => (
          <Paper
            key={dataItem.title}
            radius={8}
            className={styles.dataItem}
            as={ReactRouterLink}
            to={dataItem.link}
          >
            <Typography
              className={styles.dataItemTitle}
              transform="uppercase"
              variant="h4"
            >
              {dataItem.title}
            </Typography>
            <dataItem.img className={styles.dataItemImg} />
            <Typography
              className={styles.dataItemText}
              align="center"
              variant="body2"
            >
              {dataItem.text}
            </Typography>
            <Button variant="outlined" className={styles.dataItemButton}>
              {dataItem.button}
            </Button>
          </Paper>
        ))}
      </div>
    </AppLayout>
  )
}
