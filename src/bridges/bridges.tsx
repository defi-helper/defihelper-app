import { useEffect } from 'react'

import { useMedia } from 'react-use'
import { Typography } from '~/common/typography'
import { AppLayout } from '~/layouts'
import { Head } from '~/common/head'
import * as styles from './bridges.css'

export type BridgesProps = unknown

export const Bridges: React.VFC<BridgesProps> = () => {
  const isDesktop = useMedia('(min-width: 960px)')

  useEffect(() => {
    if (!window.rubicWidget) return

    window.rubicWidget.init({
      from: 'ETH',
      to: 'USDT',
      fromChain: 'ETH',
      toChain: 'POLYGON',
      amount: 0.1,
      iframe: isDesktop ? 'horizontal' : 'vertical',
      hideSelectionFrom: false,
      hideSelectionTo: false,
      theme: 'dark',
      background: '#1A2223',
      injectTokens: {},
      slippagePercent: {
        instantTrades: 2,
        crossChain: 5,
      },
    })

    window.rubicWidget.disable()
  }, [isDesktop])

  return (
    <AppLayout title="Bridges">
      <Head title="Bridges" />
      <div className={styles.header}>
        <Typography variant="h3">Bridges</Typography>
      </div>
      <Typography className={styles.subtitle}>
        Move your liquidity across any blockchain. Widget aggregates
        decentralized exchange liquidity across any EVM and non-EVM networks.
        Swap any token and transfer liquidity. Yes, any.
      </Typography>
      <div id="rubic-widget-root" />
    </AppLayout>
  )
}
