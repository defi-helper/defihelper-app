import { useEffect } from 'react'

import { Typography } from '~/common/typography'
import { AppLayout } from '~/layouts'
import { Head } from '~/common/head'
import * as styles from './bridges.css'

export type BridgesProps = unknown

export const Bridges: React.VFC<BridgesProps> = () => {
  useEffect(() => {
    if (!window.rubicWidget) return

    window.rubicWidget.init({
      from: '',
      to: '',
      fromChain: '',
      toChain: '',
      amount: 1,
      iframe: 'flex',
      hideSelectionFrom: false,
      hideSelectionTo: false,
      theme: 'dark',
      background: '#28372e',
      injectTokens: {},
      slippagePercent: {
        instantTrades: 2,
        crossChain: 5,
      },
    })

    window.rubicWidget.disable()
  }, [])

  return (
    <AppLayout title="Bridges">
      <Head title="Bridges" />
      <div className={styles.header}>
        <Typography variant="h3">Bridge</Typography>
      </div>
      <div id="rubic-widget-root" />
    </AppLayout>
  )
}
