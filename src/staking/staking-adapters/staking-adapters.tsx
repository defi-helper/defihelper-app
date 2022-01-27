import { useStore } from 'effector-react'

import { StakingAdapterDialog } from '~/staking/common'
import { Button } from '~/common/button'
import { useDialog, UserRejectionError } from '~/common/dialog'
import { switchNetwork } from '~/wallets/common'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { WalletConnect } from '~/wallets/wallet-connect'
import { Dropdown } from '~/common/dropdown'
import { authModel } from '~/auth'
import { toastsService } from '~/toasts'
import { settingsWalletModel } from '~/settings/settings-wallets'
import * as stakingAutomatesModel from '~/staking/staking-automates/staking-automates.model'
import * as model from './staking-adapters.model'
import * as styles from './staking-adapters.css'

export type StakingAdaptersProps = {
  className?: string
  contractAddress: string
  contractAdapter: string
  protocolAdapter: string
  contractId: string
  blockchain: string
  network: string
  onTurnOn: () => void
  autostakingLoading?: boolean
  autorestake?: string
  prototypeAddress?: string
}

export const StakingAdapters: React.VFC<StakingAdaptersProps> = (props) => {
  const [openAdapter] = useDialog(StakingAdapterDialog)

  const wallet = walletNetworkModel.useWalletNetwork()
  const wallets = useStore(settingsWalletModel.$wallets)

  const actionLoading = useStore(model.$actionLoading)

  const createAdapterAction =
    (action?: keyof Exclude<model.StakingAdapter['actions'], null>) =>
    async () => {
      try {
        if (!wallet?.account || !action) return

        model.action({ action, contractId: props.contractId })

        await switchNetwork(props.network).catch((error) => {
          if (error instanceof Error) {
            toastsService.error(error.message)
          }
        })

        const contract = await model.fetchContractAdapterFx({
          protocolAdapter: props.protocolAdapter,
          contract: {
            address: props.contractAddress,
            adapter: props.contractAdapter,
          },
          chainId: String(wallet.chainId),
          account: wallet.account,
          provider: wallet.provider,
        })

        if (!contract.actions) return

        await openAdapter({
          steps: contract.actions[action],
          onSubmit:
            action === 'stake'
              ? () => model.stake({ wallet, contractId: props.contractId })
              : undefined,
        })
      } catch (error) {
        if (error instanceof Error && !(error instanceof UserRejectionError)) {
          console.error(error.message)
        }
      } finally {
        model.action(null)
      }

      const findedWallet = wallets.find(
        ({ address, network }) =>
          address === wallet?.account && network === wallet.chainId
      )

      if (!findedWallet) return

      stakingAutomatesModel
        .scanWalletMetricFx({
          walletId: findedWallet.id,
          contractId: props.contractId,
        })
        .catch(console.error)
    }

  const user = useStore(authModel.$user)

  const handleClaim = createAdapterAction('claim')
  const handleStake = createAdapterAction('stake')
  const handleUnStake = createAdapterAction('unstake')

  return (
    <div className={styles.root}>
      <div className={styles.stake}>
        <WalletConnect
          fallback={
            <Button type="submit" size="small" variant="outlined">
              Stake
            </Button>
          }
          blockchain={props.blockchain}
          network={props.network}
        >
          <Button
            type="submit"
            onClick={handleStake}
            size="small"
            variant="outlined"
            disabled={Boolean(
              actionLoading && actionLoading.action !== 'stake'
            )}
            loading={actionLoading?.action === 'stake'}
          >
            Stake
          </Button>
        </WalletConnect>
      </div>
      <div className={styles.unstake}>
        <WalletConnect
          fallback={
            <Button type="submit" size="small" variant="outlined">
              Unstake
            </Button>
          }
          blockchain={props.blockchain}
          network={props.network}
        >
          <Button
            type="submit"
            onClick={handleUnStake}
            size="small"
            variant="outlined"
            disabled={Boolean(
              actionLoading && actionLoading.action !== 'unstake'
            )}
            loading={actionLoading?.action === 'unstake'}
          >
            Unstake
          </Button>
        </WalletConnect>
      </div>
      <div className={styles.claim}>
        <WalletConnect
          fallback={
            <Button size="small" variant="outlined">
              Claim
            </Button>
          }
          blockchain={props.blockchain}
          network={props.network}
        >
          <Button
            onClick={handleClaim}
            size="small"
            variant="outlined"
            disabled={Boolean(
              actionLoading && actionLoading.action !== 'claim'
            )}
            loading={actionLoading?.action === 'claim'}
          >
            Claim
          </Button>
        </WalletConnect>
      </div>
      <div>
        <div className={styles.turnOn}>
          {!(props.autorestake && props.prototypeAddress) && user ? (
            <Dropdown
              trigger="hover"
              placement="top"
              offset={[0, 8]}
              className={styles.tooltip}
              control={
                <Button size="small" variant="outlined">
                  Auto-Stake
                </Button>
              }
            >
              You can&apos;t enable autostaking for this contract right now
            </Dropdown>
          ) : (
            <WalletConnect
              fallback={
                <Button size="small" variant="outlined">
                  Auto-Stake
                </Button>
              }
              blockchain={props.blockchain}
              network={props.network}
            >
              <Button
                size="small"
                variant="outlined"
                onClick={props.onTurnOn}
                loading={props.autostakingLoading}
              >
                Auto-Stake
              </Button>
            </WalletConnect>
          )}
        </div>
      </div>
    </div>
  )
}
