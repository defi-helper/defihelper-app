import { Button } from '~/common/button'
import { Icon } from '~/common/icon'
import { Typography } from '~/common/typography'
import { InvestPoolTokens } from '~/invest/common/invest-pool-tokens'
import { InvestStepsProgress } from '~/invest/common/invest-steps-progress'
import { InvestContract } from '~/invest/common/invest.types'
import { WalletConnect } from '~/wallets/wallet-connect'
import { WalletSwitchNetwork } from '~/wallets/wallet-switch-network'
import * as styles from './invest-staking-steps.css'

export type InvestStakingStepsMigrateProps = {
  onSubmit: () => void
  loading: boolean
  contract: InvestContract
  isUniV3: boolean
}

export const InvestStakingStepsMigrate: React.FC<InvestStakingStepsMigrateProps> =
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
          MIGRATE TOKENS
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
            earlier.
          </Typography>
          <Typography as="div" align="center">
            We can boost your investment with auto-staking and stop-loss
            features.
            {!props.isUniV3 &&
              ` To continue you need unstake your tokens and deploy your
            own contract to control investments.`}
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
              {props.isUniV3 ? 'NEXT STEP' : 'UNSTAKE TOKENS'}
            </Button>
          </WalletSwitchNetwork>
        </WalletConnect>
      </>
    )
  }
