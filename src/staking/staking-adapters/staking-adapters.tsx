import { useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { Link as ReactRouterLink } from 'react-router-dom'

import {
  Contract,
  isExcludedAdapter,
  StakingSuccessDialog,
  StakingStakeDialog,
  StakingUnstakeDialog,
  StakingClaimDialog,
  StakingAdapterDialog,
  StakingGovStakeDialog,
  StakingGovUnstakeDialog,
} from '~/staking/common'
import { Button } from '~/common/button'
import { useDialog, UserRejectionError } from '~/common/dialog'
import { switchNetwork } from '~/wallets/common'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { WalletConnect } from '~/wallets/wallet-connect'
import { authModel } from '~/auth'
import { toastsService } from '~/toasts'
import { settingsWalletModel } from '~/settings/settings-wallets'
import { BlockchainEnum } from '~/api/_generated-types'
import { GovernanceStake, GovernanceUnstake } from '~/common/load-adapter'
import * as stakingAutomatesModel from '~/invest/invest-deployed-contracts/invest-deployed-contracts.model'
import * as model from './staking-adapters.model'
import * as styles from './staking-adapters.css'
import { LPTokensBuySellDialog } from '~/lp-tokens/common/lp-tokens-buy-sell-dialog'
import { paths } from '~/paths'
import { WalletSwitchNetwork } from '~/wallets/wallet-switch-network'
import * as lpTokensModel from '~/lp-tokens/lp-tokens.model'

export type StakingAdaptersProps = {
  className?: string
  contractAddress: string
  contractAdapter: string
  protocolAdapter: string
  protocolId: string
  contractId: string
  blockchain: BlockchainEnum
  network: string
  deprecated: boolean
  autorestake?: string
  prototypeAddress?: string
  buyLiquidity: Contract['automate']['lpTokensManager']
}

const isGovernance = (adapter: string) => {
  return ['xJoe', 'tom'].includes(adapter)
}

export const StakingAdapters: React.VFC<StakingAdaptersProps> = (props) => {
  const [openBuyLiquidity] = useDialog(LPTokensBuySellDialog)
  const [openSuccessDialog] = useDialog(StakingSuccessDialog)
  const [openStakeDialog] = useDialog(StakingStakeDialog)
  const [openUnstakeDialog] = useDialog(StakingUnstakeDialog)
  const [openClaimDialog] = useDialog(StakingClaimDialog)
  const [openAdapter] = useDialog(StakingAdapterDialog)
  const [openGovStakeDialog] = useDialog(StakingGovStakeDialog)
  const [openGovUnstakeDialog] = useDialog(StakingGovUnstakeDialog)

  const currentWallet = walletNetworkModel.useWalletNetwork()
  const currentUserWallet = useStore(settingsWalletModel.$currentUserWallet)

  const [hasActions, setHasActions] = useState(false)

  const actionLoading = useStore(model.$actionLoading)
  const buyLpLoading = useStore(model.buyLPFx.pending)

  const createAdapterAction =
    (action?: keyof Exclude<model.StakingAdapter['actions'], null>) =>
    async () => {
      try {
        if (!currentWallet?.account || !action) return

        model.action({ action, contractId: props.contractId })

        const contract = await model.fetchContractAdapterFx({
          protocolAdapter: props.protocolAdapter,
          contract: {
            address: props.contractAddress,
            adapter: props.contractAdapter,
          },
          chainId: String(currentWallet.chainId),
          account: currentWallet.account,
          provider: currentWallet.provider,
        })

        if (!contract.actions || !contract.actions[action]) return

        const scanHandler = () => {
          if (!currentUserWallet) return

          stakingAutomatesModel
            .scanWalletMetricFx({
              wallet: currentUserWallet.id,
              contract: props.contractId,
            })
            .catch(console.error)
        }

        if (
          isGovernance(props.contractAdapter) &&
          'methods' in contract.actions[action]
        ) {
          const dialogs = {
            stake: () =>
              openGovStakeDialog({
                methods: contract.actions?.stake
                  .methods as unknown as GovernanceStake['methods'],
                onSubmit: () => {
                  model.stake({
                    wallet: currentWallet,
                    contractId: props.contractId,
                  })

                  scanHandler()
                },
              }),
            unstake: () =>
              openGovUnstakeDialog({
                methods: contract.actions?.unstake
                  .methods as unknown as GovernanceUnstake['methods'],
                onSubmit: scanHandler,
              }),
          } as const

          if (action === 'stake' || action === 'unstake') {
            await dialogs[action]?.()
          }
        } else if ('methods' in contract.actions[action]) {
          const dialogs = {
            stake: () =>
              openStakeDialog({
                contractId: props.contractId,
                methods: contract.actions?.stake.methods,
                hasBuyLp: Boolean(props.buyLiquidity?.pair),
                onSubmit: () => {
                  model.stake({
                    wallet: currentWallet,
                    contractId: props.contractId,
                  })

                  scanHandler()
                },
              }),
            unstake: () =>
              openUnstakeDialog({
                methods: contract.actions?.unstake.methods,
                onSubmit: scanHandler,
              }),
            claim: () =>
              openClaimDialog({
                methods: contract.actions?.claim.methods,
                onSubmit: scanHandler,
              }),
            exit: null,
          } as const

          await dialogs[action]?.()
        } else {
          await openAdapter({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            steps: contract.actions[action],
            onSubmit: () => {
              if (action === 'stake') {
                model.stake({
                  wallet: currentWallet,
                  contractId: props.contractId,
                })
              }

              scanHandler()
            },
          })
        }

        openSuccessDialog().catch((error) => console.error(error.message))
      } catch (error) {
        if (error instanceof Error && !(error instanceof UserRejectionError)) {
          console.error(error.message)
        }
      } finally {
        model.action(null)
      }
    }

  const user = useStore(authModel.$user)

  useEffect(() => {
    if (!currentWallet?.account) return

    model
      .fetchContractAdapterFx({
        protocolAdapter: props.protocolAdapter,
        contract: {
          address: props.contractAddress,
          adapter: props.contractAdapter,
        },
        chainId: String(currentWallet.chainId),
        account: currentWallet.account,
        provider: currentWallet.provider,
      })
      .then(({ actions }) => {
        setHasActions(Boolean(actions))
      })
      .catch(console.error)
  }, [
    currentWallet,
    props.protocolAdapter,
    props.contractAdapter,
    props.contractAddress,
  ])

  const handleClaim = createAdapterAction('claim')
  const handleStake = createAdapterAction('stake')
  const handleUnStake = createAdapterAction('unstake')

  const handleBuyLiquidity = async () => {
    if (!currentWallet?.account || !props.buyLiquidity) return

    await switchNetwork(props.network).catch((error) => {
      if (error instanceof Error) {
        toastsService.error(error.message)
      }
    })

    try {
      const { sellLiquidity, buyLiquidity, tokens } = await model.buyLPFx({
        account: currentWallet.account,
        provider: currentWallet.provider,
        chainId: props.network,
        router: props.buyLiquidity.router,
        pair: props.buyLiquidity.pair,
        network: props.network,
        protocol: props.blockchain,
      })

      const billingBalance = await settingsWalletModel.fetchBillingBalanceFx({
        blockchain: props.blockchain,
        network: props.network,
      })

      if (!currentUserWallet) throw new Error('wallet is not connected')

      const cb = (txId?: string) => {
        stakingAutomatesModel
          .scanWalletMetricFx({
            wallet: currentUserWallet.id,
            contract: props.contractId,
            txId,
          })
          .catch(console.error)
      }

      await openBuyLiquidity({
        buyLiquidityAdapter: buyLiquidity,
        sellLiquidityAdapter: sellLiquidity,
        tokens,
        onSubmit: (values) => {
          cb(values.tx)

          lpTokensModel.zapFeePayCreateFx({
            ...values,
            wallet: currentUserWallet.id,
          })
        },
        tokenSymbol: billingBalance.token ?? '',
      })

      await openSuccessDialog({
        type: 'buyLiquidity',
      })
    } catch (error) {
      if (error instanceof Error && !(error instanceof UserRejectionError)) {
        console.error(error.message)
      }
    }
  }

  const hasBuyLiquidity =
    model.isNetworkKey(props.network) && Boolean(props.buyLiquidity)

  return (
    <div className={styles.root}>
      <div className={styles.stake}>
        <WalletConnect
          fallback={
            <Button
              type="submit"
              size="small"
              variant="outlined"
              disabled={props.deprecated}
            >
              Stake
            </Button>
          }
          blockchain={props.blockchain}
          network={props.network}
        >
          {hasActions ? (
            <WalletSwitchNetwork network={props.network}>
              <Button
                type="submit"
                onClick={handleStake}
                size="small"
                variant="outlined"
                disabled={Boolean(
                  (actionLoading && actionLoading.action !== 'stake') ||
                    props.deprecated
                )}
                loading={actionLoading?.action === 'stake'}
              >
                Stake
              </Button>
            </WalletSwitchNetwork>
          ) : (
            <></>
          )}
        </WalletConnect>
      </div>
      {hasBuyLiquidity && (
        <div className={styles.buyLP}>
          <WalletConnect
            fallback={
              <Button
                type="submit"
                size="small"
                variant="outlined"
                className="buy_lp"
                disabled={props.deprecated}
              >
                ZAP
              </Button>
            }
            blockchain={props.blockchain}
            network={props.network}
          >
            <WalletSwitchNetwork network={props.network}>
              <Button
                type="submit"
                onClick={handleBuyLiquidity}
                size="small"
                variant="outlined"
                loading={buyLpLoading}
                className="buy_lp"
              >
                ZAP
              </Button>
            </WalletSwitchNetwork>
          </WalletConnect>
        </div>
      )}
      <div className={styles.unstake}>
        <WalletConnect
          fallback={
            <Button
              type="submit"
              size="small"
              variant="outlined"
              disabled={props.deprecated}
            >
              Unstake
            </Button>
          }
          blockchain={props.blockchain}
          network={props.network}
        >
          {hasActions ? (
            <WalletSwitchNetwork network={props.network}>
              <Button
                type="submit"
                onClick={handleUnStake}
                size="small"
                variant="outlined"
                disabled={Boolean(
                  (actionLoading && actionLoading.action !== 'unstake') ||
                    props.deprecated
                )}
                loading={actionLoading?.action === 'unstake'}
              >
                Unstake
              </Button>
            </WalletSwitchNetwork>
          ) : (
            <></>
          )}
        </WalletConnect>
      </div>
      <div className={styles.claim}>
        {!isExcludedAdapter(props.contractAdapter) && (
          <WalletConnect
            fallback={
              <Button
                size="small"
                variant="outlined"
                disabled={props.deprecated}
              >
                Claim
              </Button>
            }
            blockchain={props.blockchain}
            network={props.network}
          >
            {hasActions ? (
              <WalletSwitchNetwork network={props.network}>
                <Button
                  onClick={handleClaim}
                  size="small"
                  variant="outlined"
                  disabled={Boolean(
                    (actionLoading && actionLoading.action !== 'claim') ||
                      props.deprecated
                  )}
                  loading={actionLoading?.action === 'claim'}
                >
                  Claim
                </Button>
              </WalletSwitchNetwork>
            ) : (
              <></>
            )}
          </WalletConnect>
        )}
      </div>
      <div>
        <div className={styles.turnOn}>
          {!isExcludedAdapter(props.contractAdapter) && (
            <>
              {!(props.autorestake && props.prototypeAddress) && user ? (
                <>-</>
              ) : (
                <Button
                  size="small"
                  variant="outlined"
                  as={ReactRouterLink}
                  to={paths.invest.detail(props.contractId)}
                  disabled={props.deprecated}
                >
                  Invest
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
