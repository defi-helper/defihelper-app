import { useAsyncFn } from 'react-use'
import { Button } from '~/common/button'
import { Icon } from '~/common/icon'
import { Typography } from '~/common/typography'
import { InvestPoolTokens } from '~/invest/common/invest-pool-tokens'
import { InvestStepsProgress } from '~/invest/common/invest-steps-progress'
import { InvestContract } from '~/invest/common/invest.types'
import { switchNetwork } from '~/wallets/common'
import { WalletConnect } from '~/wallets/wallet-connect'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import * as styles from './invest-staking-steps.css'

export type InvestStakingStepsMigrateProps = {
  onSubmit: () => void
  loading: boolean
  contract: InvestContract
  unstake: boolean
}

export const InvestStakingStepsMigrate: React.FC<InvestStakingStepsMigrateProps> =
  (props) => {
    const currentWallet = walletNetworkModel.useWalletNetwork()

    const [switchNetworkState, handleSwitchNetwork] = useAsyncFn(async () => {
      if (!props.contract) return

      return switchNetwork(props.contract.network)
    }, [props.contract])

    return (
      <>
        <InvestStepsProgress success={0} />
        <Typography
          family="mono"
          transform="uppercase"
          as="div"
          align="center"
          className={styles.title}
        >
          {props.unstake ? 'UNSTAKE TOKENS' : 'MIGRATE TOKENS'}
        </Typography>
        <div className={styles.successContent}>
          <Icon
            icon="checkboxCircle"
            width={100}
            height={100}
            className={styles.checked}
          />
          {props.unstake ? (
            <>
              <Typography as="div" align="center">
                You have invested in
              </Typography>
              <Typography as="div" align="center" className={styles.pool}>
                <div className={styles.pool}>
                  <InvestPoolTokens tokens={props.contract.tokens.stake} />
                  {props.contract.name}
                </div>{' '}
              </Typography>
              <Typography as="div" align="center">
                We will help you to unstake and then exchange your tokens.
              </Typography>
            </>
          ) : (
            <>
              <Typography as="div" align="center">
                You have invested in
              </Typography>
              <Typography as="div" align="center" className={styles.pool}>
                <div className={styles.pool}>
                  <InvestPoolTokens tokens={props.contract.tokens.stake} />
                  {props.contract.name}
                </div>{' '}
                earlier.
              </Typography>
              <Typography as="div" align="center">
                We can boost your investment with auto-staking and stop-loss
                features. To continue you need unstake your tokens and deploy
                your own contract to control investments.
              </Typography>
            </>
          )}
        </div>
        <WalletConnect fallback={<Button color="green">Connect wallet</Button>}>
          <Button
            onClick={
              props.contract.network !== currentWallet?.chainId
                ? handleSwitchNetwork
                : () => props.onSubmit()
            }
            loading={switchNetworkState.loading || props.loading}
            color="green"
            className={styles.mt}
          >
            UNSTAKE TOKENS
          </Button>
        </WalletConnect>
      </>
    )
  }
