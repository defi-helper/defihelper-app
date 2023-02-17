import { Link } from '~/common/link'
import { Button } from '~/common/button'
import { Typography } from '~/common/typography'
import { InvestPoolTokens } from '~/invest/common/invest-pool-tokens'
import { InvestStepsProgress } from '~/invest/common/invest-steps-progress'
import { InvestContract } from '~/invest/common/invest.types'
import { WalletConnect } from '~/wallets/wallet-connect'
import * as styles from './invest-staking-steps.css'

export type InvestStakingStepsDontHaveInvestProps = {
  contract: InvestContract
}

export const InvestStakingStepsDontHaveInvest: React.FC<InvestStakingStepsDontHaveInvestProps> =
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
          BUY TOKENS
        </Typography>
        <div className={styles.successContent}>
          <Typography as="div" align="center">
            Sorry, you don&apos;t have any
            <br /> investments in
          </Typography>
          <Typography as="div" align="center" className={styles.pool}>
            <div className={styles.pool}>
              <InvestPoolTokens tokens={props.contract.tokens.stake} />
              {props.contract.name}
            </div>{' '}
            earlier.
          </Typography>
          <Typography as="div" align="center">
            Please go to Uniswap and invest some tokens in
            <br /> this pool and return back. After that we can
            <br /> boost your investment with auto-staking
            <br /> and stop-loss features.
          </Typography>
        </div>
        <WalletConnect fallback={<Button color="green">Connect wallet</Button>}>
          <Button
            as={Link}
            color="green"
            href={props.contract.link ?? ''}
            target="_blank"
            className={styles.gotoUni}
          >
            GO TO UNISWAP
          </Button>
        </WalletConnect>
      </>
    )
  }
