import { useAsyncFn, useAsyncRetry } from 'react-use'
import { bignumberUtils } from '~/common/bignumber-utils'

import { Button } from '~/common/button'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { AppLayout } from '~/layouts'
import { WalletConnect } from '~/wallets/wallet-connect'
import { useWalletNetwork } from '~/wallets/wallet-networks/wallet-network.model'
import * as styles from './vesting.css'

export type VestingProps = unknown

export const Vesting: React.VFC<VestingProps> = () => {
  const wallet = useWalletNetwork()

  const isOwner = useAsyncRetry(async () => true, [wallet])

  const periodFinish = useAsyncRetry(async () => '10', [])
  const earned = useAsyncRetry(async () => '10', [])

  const [claimState, handleClaim] = useAsyncFn(async () => true, [])

  return (
    <AppLayout>
      <WalletConnect fallback={<Button>Connect</Button>}>
        <Typography variant="h3" className={styles.title}>
          Pre seed
        </Typography>
        <Paper radius={8} className={styles.root}>
          {isOwner.loading && 'loading...'}
          {isOwner.value === true && !isOwner.loading && (
            <>
              <div className={styles.row}>
                <Typography variant="body2" className={styles.label}>
                  Tokens left
                </Typography>
                <Typography variant="h4" transform="uppercase" family="mono">
                  {bignumberUtils.format(earned.value)}
                </Typography>
              </div>
              <div className={styles.row}>
                <Typography variant="body2" className={styles.label}>
                  Drop date
                </Typography>
                <Typography variant="h4" transform="uppercase" family="mono">
                  xxx DFH / day
                </Typography>
              </div>
              <div className={styles.row}>
                <Typography variant="body2" className={styles.label}>
                  Drop end
                </Typography>
                <Typography variant="h4" transform="uppercase" family="mono">
                  {periodFinish.value}
                </Typography>
              </div>
              <Button onClick={handleClaim} loading={claimState.loading}>
                Claim
              </Button>
            </>
          )}
          {isOwner.value === false && !isOwner.loading && (
            <>you&apos;re not owner</>
          )}
        </Paper>
      </WalletConnect>
    </AppLayout>
  )
}
