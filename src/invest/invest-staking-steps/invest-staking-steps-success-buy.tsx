import { Button } from '~/common/button'
import { Icon } from '~/common/icon'
import { Typography } from '~/common/typography'
import { InvestPoolTokens } from '~/invest/common/invest-pool-tokens'
import { InvestStepsProgress } from '~/invest/common/invest-steps-progress'
import { InvestContract } from '~/invest/common/invest.types'
import * as styles from './invest-staking-steps.css'

export type InvestStakingStepsSuccessBuyProps = {
  onSubmit: () => void
  contract: InvestContract
}

export const InvestStakingStepsSuccessBuy: React.FC<InvestStakingStepsSuccessBuyProps> =
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
          <Icon
            icon="checkboxCircle"
            width={100}
            height={100}
            className={styles.checked}
          />
          <Typography as="div" align="center">
            You have successfully invested in the pool. To earn rewards you need
            to deploy your
          </Typography>
          <Typography as="div" align="center">
            <div className={styles.pool}>
              <InvestPoolTokens tokens={props.contract.tokens.stake} />
              {props.contract.name}
            </div>{' '}
            contract and stake tokens.
          </Typography>
        </div>
        <Button
          onClick={() => props.onSubmit()}
          color="green"
          className={styles.mt}
        >
          NEXT STEP
        </Button>
      </>
    )
  }
