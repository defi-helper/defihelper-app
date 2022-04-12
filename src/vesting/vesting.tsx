import { useAsyncFn, useAsyncRetry } from 'react-use'
import { bignumberUtils } from '~/common/bignumber-utils'

import { Button } from '~/common/button'
import { AppLayout } from '~/layouts'
import { WalletConnect } from '~/wallets/wallet-connect'
import { useWalletNetwork } from '~/wallets/wallet-networks/wallet-network.model'

export type VestingProps = unknown

export const Vesting: React.VFC<VestingProps> = () => {
  const wallet = useWalletNetwork()

  const isOwner = useAsyncRetry(async () => true, [wallet])

  const periodFinish = useAsyncRetry(async () => '10', [])
  const earned = useAsyncRetry(async () => '10', [])

  const [claimState, handleClaim] = useAsyncFn(async () => true, [])

  return (
    <AppLayout>
      <WalletConnect fallback={<Button>Connect</Button>} />
      {isOwner.loading && 'loading...'}
      {isOwner.value === true && !isOwner.loading && (
        <>
          <div>period finish: {periodFinish.value}</div>
          <div>earned: {bignumberUtils.format(earned.value)}</div>
          <Button onClick={handleClaim} loading={claimState.loading}>
            Claim
          </Button>
        </>
      )}
      {isOwner.value === false && !isOwner.loading && (
        <div>you&apos;re not owner</div>
      )}
    </AppLayout>
  )
}
