import { useStore } from 'effector-react'
import { useEffect, useState } from 'react'
import {
  Link as ReactRouterLink,
  Redirect,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from 'react-router-dom'
import { useAsyncFn, useMedia } from 'react-use'

import { buildExplorerUrl } from '~/common/build-explorer-url'
import { Button } from '~/common/button'
import { ButtonBase } from '~/common/button-base'
import { cutAccount } from '~/common/cut-account'
import { Icon } from '~/common/icon'
import { Link } from '~/common/link'
import { Loader } from '~/common/loader'
import { Typography } from '~/common/typography'
import { paths } from '~/paths'
import { WalletConnect } from '~/wallets/wallet-connect'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { InvestContractInfo } from '~/invest/common/invest-contract-info'
import { InvestStakingSteps } from '~/invest/invest-staking-steps'
import { switchNetwork } from '~/wallets/common'
import { InvestUnstakingSteps } from '~/invest/invest-unstaking-steps'
import * as styles from './invest-detail.css'
import * as model from './invest-detail.model'
import { useQueryParams } from '~/common/hooks'

export type InvestDetailProps = unknown

export const InvestDetail: React.VFC<InvestDetailProps> = () => {
  const [next, setNext] = useState(false)

  const contract = useStore(model.$contract)
  const contractLoading = useStore(model.fetchContractFx.pending)

  const params = useParams<{ contractId: string }>()
  const depoy = useQueryParams().get('deploy')

  const isDesktop = useMedia('(min-width: 960px)')

  const currentWallet = walletNetworkModel.useWalletNetwork()

  const [switchNetworkState, handleSwitchNetwork] = useAsyncFn(async () => {
    if (!contract) return

    return switchNetwork(contract.network)
  }, [contract])

  useEffect(() => {
    const abortController = new AbortController()

    model.fetchContractFx({
      filter: {
        id: params.contractId,
      },
      signal: abortController.signal,
    })

    return () => {
      abortController.abort()
      model.resetContract()
    }
  }, [params.contractId])

  const match = useRouteMatch()

  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.title}>
            {isDesktop && <Icon icon="autostaking" width={40} height={40} />}
            {!isDesktop && (
              <ButtonBase>
                <Icon icon="burger" width={24} height={24} />
              </ButtonBase>
            )}
            <Typography variant="h3">Invest</Typography>
          </div>
          <div className={styles.actions}>
            {isDesktop && currentWallet?.account && currentWallet?.chainId && (
              <Typography variant="body2" as="div" className={styles.wallet}>
                <Typography variant="inherit">Connected wallet</Typography>
                <Link
                  href={buildExplorerUrl({
                    address: currentWallet.account,
                    network: currentWallet.chainId,
                  })}
                  target="_blank"
                >
                  {cutAccount(currentWallet.account)}
                </Link>
              </Typography>
            )}
            <ButtonBase
              as={ReactRouterLink}
              to={paths.invest.list}
              className={styles.backToMain}
            >
              Back to invest
            </ButtonBase>
          </div>
        </div>
        <div className={styles.content}>
          {contractLoading && (
            <div className={styles.loader}>
              <Loader height="36" />
            </div>
          )}
          {contract && (
            <Switch>
              <Redirect
                exact
                from={match.path}
                to={
                  depoy ? `${match.path}/stake?deploy=1` : `${match.path}/stake`
                }
              />
              <Route path={`${match.path}/stake`}>
                {!next && contract && (
                  <InvestContractInfo
                    contract={contract}
                    className={styles.contractInfo}
                  />
                )}
                {!next && contract && (
                  <WalletConnect
                    fallback={<Button color="green">Connect wallet</Button>}
                  >
                    <Button
                      color="green"
                      onClick={
                        contract.network !== currentWallet?.chainId
                          ? handleSwitchNetwork
                          : () => setNext(true)
                      }
                      loading={switchNetworkState.loading}
                    >
                      Invest
                    </Button>
                  </WalletConnect>
                )}
                {contract && next && <InvestStakingSteps contract={contract} />}
              </Route>
              <Route path={`${match.path}/unstake`}>
                <InvestUnstakingSteps contract={contract} />
              </Route>
            </Switch>
          )}
        </div>
      </div>
    </div>
  )
}
