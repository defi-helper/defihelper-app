import { Button } from '~/common/button'
import { Icon } from '~/common/icon'
import { Typography } from '~/common/typography'
import { InvestPoolTokens } from '~/invest/common/invest-pool-tokens'
import { InvestStepsProgress } from '~/invest/common/invest-steps-progress'
import { InvestContract } from '~/invest/common/invest.types'
import { WalletConnect } from '~/wallets/wallet-connect'
import { WalletSwitchNetwork } from '~/wallets/wallet-switch-network'
import * as styles from './invest-unstaking-steps.css'

export type InvestUnstakingStepsUnstakeProps = {
  onSubmit: () => void
  loading: boolean
  contract: InvestContract
}

export const InvestUnstakingStepsUnstake: React.FC<InvestUnstakingStepsUnstakeProps> =
  (props) => {
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
          UNSTAKE TOKENS
        </Typography>
        <div className={styles.successContent}>
          <Icon
            icon="checkboxCircle"
            width={100}
            height={100}
            className={styles.checked}
          />
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
        </div>
        <WalletConnect fallback={<Button color="green">Connect wallet</Button>}>
          <WalletSwitchNetwork network={props.contract.network}>
            <Button
              onClick={() => props.onSubmit()}
              loading={props.loading}
              color="green"
              className={styles.mt}
            >
              UNSTAKE TOKENS
            </Button>
          </WalletSwitchNetwork>
        </WalletConnect>
      </>
    )
  }
