import { useEffect, useState } from 'react'
import { Typography } from '~/common/typography'
import { AppLayout } from '~/layouts'
import { Head } from '~/common/head'
import * as styles from './bridges.css'

export type BridgesProps = unknown

export const Bridges: React.VFC<BridgesProps> = () => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!ref) return

    window.rubik?.init({
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
  }, [ref])

  return (
    <AppLayout title="Bridges">
      <Head title="Bridges" />
      <div className={styles.header}>
        <Typography variant="h3">Bridge</Typography>
      </div>

      {!window.rubik && (
        <p>
          Please, try to disable adblock, we can&apos;t load the Rubik widget :(
        </p>
      )}

      <div id="rubic-widget-root" ref={setRef} />
    </AppLayout>
  )
}
